const {
    gql
} = require('apollo-server-express');

const schema = gql`
type Customer {
    id: ID,
    name: String,
    address: String,
    mobile: String,
    orders: [Order]
}

type Order {
    id: ID,
    date: String,
    price: Float,
    address: String,
    customer: Customer
}

type Query {
    customer(id: String): Customer,
    customers: [Customer],
    order(id: String): Order,
    orders: [Order],
}

type Subscription {
    orderAdded: Order
}

type Mutation {
    # Adds an order
    addOrder(
        date: String,
        price: Float,
        address: String,
        customerId: String
    ): Order

    # Adds a customer
    addCustomer(
        name: String,
        mobile: String,
        address: String
    ): Customer
}
`

module.exports = schema;