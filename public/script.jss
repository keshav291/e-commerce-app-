function loadProducts() {
    fetch("/products")
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("products");

            container.innerHTML = "";

            if (products.length === 0) {
                container.innerHTML = "<p>No products available.</p>";
                return;
            }

            products.forEach(product => {
                container.innerHTML += `
                    <div class="product">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <h4>₹${product.price}</h4>
                        <button>Add to Cart</button>
                    </div>
                `;
            });
        })
        .catch(error => {
            document.getElementById("products").innerHTML =
                "<p>Products load nahi ho rahe.</p>";
            console.log(error);
        });
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

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
    })
    .catch(error => {
        console.log(error);
        alert("Product add nahi hua");
    });
}

loadProducts();