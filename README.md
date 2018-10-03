# Order Management GraphQL Server

## Queries
### Create customer
```
mutation {
  addCustomer(name: "Siddharth", address: "Mhow", mobile: "9X9X9X9X9X") {
    # return fields
    id
    name
    address
    mobile
  }
}
```

### Query customers
```
{
  customers {
    id
    name
    mobile
    address
  }
}

```

### Create order
```
mutation {
  addOrder(
    date: "XX-XX-XXXX"
    address: "Mhow"
    price: 250
    customerId: "5bb5257f5a64793be85ab3d0"
  ) {
    id
    date
    address
    price
  }
}

```

### Query orders
```
{
  orders {
    id
    date
    price
    address
  }
}
```

## Relational Queries
### All orders and their customer
```
{
  orders{
    date,
    price,
    address,
    customer {
      name,
      mobile
    }
  }
}
```

### All the customers and their orders
```
{
  customers{
    id
    name,
    mobile,
    orders {
      date,
      price
    }
  }
}
```