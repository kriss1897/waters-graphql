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
    customers: [Customer],
    orders: [Order],
}

type Subscription {
    orderAdded: Order
}

type Mutation {
    addOrder(
        date: String,
        price: Float,
        address: String,
        customerId: String
    ): Order
}
`

module.exports = schema;