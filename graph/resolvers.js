const { PubSub } = require('graphql-subscriptions');

// Mongoose Models
const Customer = require('../models/customer')
const Order = require('../models/order')

const ORDER_ADDED = 'ORDER_ADDED';

const pubsub = new PubSub();

const resolvers = {
    Customer: {
        orders: (root) => (Order.find({customerId:root.id}))
    },
    Order: {
        customer: (root) => (Customer.findById(root.customerId))
    },
    Query: {
        customers : () => (Customer.find({})),
        orders: () => (Order.find({})),
    },
    Subscription: {
        orderAdded: {
            subscribe: () => pubsub.asyncIterator([ORDER_ADDED])
        }
    },
    Mutation: {
        addOrder(root, args, context){
            const order = new Order({
                date: args.date,
                price: args.price,
                customerId: args.customerId,
                status: 'PLACED',
                address: args.address
            });
            pubsub.publish(ORDER_ADDED,{ orderAdded: args });
            return order.save();
        },
        addCustomer(root,args,context){
            const customer = new Customer({
                name: args.name,
                address: args.address,
                mobile: args.mobile
            });
            return customer.save();
        }
    }
}

module.exports = resolvers;