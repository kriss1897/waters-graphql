const graphql = require('graphql');

// Mongoose Models
const Customer = require('./models/customer')
const Order = require('./models/order')

// GraphQL Classes
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull
} = graphql;

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        mobile: { type: GraphQLString },
        address: { type: GraphQLString },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                return Order.find({customerId : parent.id});
        }
            }
    })
});

const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        price: { type: GraphQLFloat },
        status: { type: GraphQLString },
        address: { type: GraphQLString },
        customer: {
            type: CustomerType,
            resolve(parent,args){
                return Customer.findById(parent.customerId)
            }
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parent,args){
                return Customer.findById(args.id);
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve(parent,args){
                return Order.findById(args.id);
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                return Order.find({});
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args){
                return Customer.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: GraphQLString },
                mobile: { type: GraphQLString },
                address: { type: GraphQLString },
            },
            resolve(parent, args){
                let customer = new Customer({
                    name: args.name,
                    mobile: args.mobile,
                    address: args.address
                });
                return customer.save();
            }
        },
        addOrder: {
            type: OrderType,
            args: {
                date: { type: GraphQLString },
                customer: { type: GraphQLString },
                price: { type: GraphQLFloat },
                address: { type: GraphQLString }
            },
            resolve(parent, args){
                let order = new Order({
                    date: args.date,
                    customerId: args.customer,
                    price: args.price,
                    address: args.address
                });
                return order.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});