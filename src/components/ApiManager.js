export const getAllCustomers = () => {
    return fetch('http://localhost:8088/users?isStaff=false')
    .then(response => response.json())
}

export const getCustomerById = (id) => {
    return fetch(`http://localhost:8088/customers?userId=${id}`)
    .then(response => response.json())
}

export const getExpandedCustomerById = (id) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${id}`)
    .then(response => response.json())
}

export const editCustomer = (customerObject) => {
    return fetch(`http://localhost:8088/customers/${customerObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerObject)

    })
    .then(response => response.json())
}

export const getEmployees = () => {
    return fetch('http://localhost:8088/employees?_expand=user&_expand=location')
    .then(response => response.json())
}

export const getCustomers = () => {
    return fetch('http://localhost:8088/customers')
    .then(response => response.json())
}

export const getLocations = () => {
    return fetch('http://localhost:8088/locations')
    .then(response => response.json())
}

export const getUsers = () => {
    return fetch('http://localhost:8088/users')
    .then(response => response.json())
}

export const getProductTypes = () => {
    return fetch('http://localhost:8088/productTypes')
    .then(response => response.json())
}

export const getPurchases = (id) => {
    return fetch(`http://localhost:8088/purchases?customerId=${id}&_expand=product`)
    .then(response => response.json())
}

export const getProducts = () => {
    return fetch('http://localhost:8088/products?_expand=productType&?_sort=name&_order=asc')
            .then(response => response.json())
}

export const getProductLocations = (id) => {
    return fetch(`http://localhost:8088/productLocations?_expand=product&_expand=location&productId=${id}`)
    .then(response => response.json())
}



export const createProduct = (productObject) => {
    return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productObject)
    })
    .then(response => response.json())
}

export const createPurchase = (customerId, productId) => {
    return fetch(`http://localhost:8088/purchases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            customerId: customerId,
            productId: productId,
            quantity: 1
        })

    })
    .then(response => response.json())
}


export const createUser = (userObject) => {
    return fetch('http://localhost:8088/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)
    })
    .then(response => response.json())
}

export const createEmployee = (employeeObject) => {
    return fetch('http://localhost:8088/employees', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeObject)
    })
    .then(response => response.json())
}

export const deleteEmployee = (id) => {
    return fetch(`http://localhost:8088/employees/${id}`, {
        method: "DELETE"
    })
}