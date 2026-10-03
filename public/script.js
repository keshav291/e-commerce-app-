let cart = [];


// LOGIN

function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const role =
        document.getElementById("role").value;


    fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password,
            role
        })

    })

    .then(response => response.json())

    .then(data => {

        document.getElementById("loginMessage")
            .innerText = data.message;

    });

}



// LOAD PRODUCTS

function loadProducts() {

    fetch("/products")

        .then(response => response.json())

        .then(products => {

            const container =
                document.getElementById("products");

            container.innerHTML = "";

            products.forEach(product => {

                container.innerHTML += `

                    <div class="product">

                        <h3>${product.name}</h3>

                        <p>
                            ${product.description}
                        </p>

                        <h4>
                            ₹${product.price}
                        </h4>

                        <button
                            onclick="addToCart(
                                '${product._id}',
                                '${product.name}',
                                ${product.price}
                            )">

                            Add to Cart

                        </button>

                    </div>

                `;

            });

        });

}



// ADD TO CART

function addToCart(id, name, price) {

    cart.push({
        id,
        name,
        price
    });

    showCart();

}



// SHOW CART

function showCart() {

    const cartBox =
        document.getElementById("cart");

    if (cart.length === 0) {

        cartBox.innerHTML =
            "Cart is empty.";

        document.getElementById("total")
            .innerText = "Total: ₹0";

        return;
    }


    cartBox.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;

        cartBox.innerHTML += `

            <div class="cart-item">

                ${item.name}
                - ₹${item.price}

                <button
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    document.getElementById("total")
        .innerText = "Total: ₹" + total;

}



// REMOVE

function removeFromCart(index) {

    cart.splice(index, 1);

    showCart();

}



// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Cart is empty!");

        return;
    }


    fetch("/orders", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            products: cart
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        document.getElementById("orderStatus")
            .innerText =
            "Order Status: Order Placed ✅";

        cart = [];

        showCart();

    });

}



// ADD PRODUCT

function addProduct() {

    const name =
        document.getElementById("name").value;

    const price =
        document.getElementById("price").value;

    const description =
        document.getElementById("description").value;


    if (!name || !price || !description) {

        alert("Please fill all fields");

        return;
    }


    fetch("/products", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,

            price: Number(price),

            description: description

        })

    })

    .then(response => response.json())

    .then(() => {

        alert("Product Added Successfully!");

        document.getElementById("name").value = "";

        document.getElementById("price").value = "";

        document.getElementById("description").value = "";

        loadProducts();

    });

}


loadProducts();

showCart();