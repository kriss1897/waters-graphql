const { PubSub } = require('graphql-subscriptions');

// Mongoose Models
const Customer = require('../models').customer;
const Order = require('../models').order;

const ORDER_ADDED = 'ORDER_ADDED';

const pubsub = new PubSub();

const resolvers = {
    Customer: {
        orders: (root) => (Order.findAll({where:{ customerId:root.id }}))
    },
    Order: {
        customer: (root) => (Customer.findById(root.customerId))
    },
    Query: {
        order: (root, args) => (Order.findById(args.id)),
        customer: (root, args) => (Customer.findById(args.id)),
        customers : () => (Customer.findAll()),
        orders: () => (Order.findAll()),
    },
    Subscription: {
        orderAdded: {
            subscribe: () => pubsub.asyncIterator([ORDER_ADDED])
        }
    },
    Mutation: {
        addOrder: async function(root, args, context){
            return await Order.create({
                date: args.date,
                price: args.price,
                customerId: args.customerId,
                status: 0,
                address: args.address
            }).then((order,created)=>{
                pubsub.publish(ORDER_ADDED,{ orderAdded: args });
                return order;
            }).then( order => {
                return order;
            });
        },
        addCustomer: async function(root,args,context){
            const customer = await Customer.create({
                name: args.name,
                address: args.address,
                mobile: args.mobile
            }).then((customer,created)=>{
                return customer;
            });
            return customer;
        }
    }
}

module.exports = resolvers;