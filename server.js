const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose
    .connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });


// GET PRODUCTS
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error loading products" });
    }
});


// ADD PRODUCT
app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();

        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Product add nahi hua" });
    }
});


// SIMPLE LOGIN
app.post("/login", (req, res) => {

    const { username, password, role } = req.body;

    if (
        username === "admin" &&
        password === "admin123" &&
        role === "admin"
    ) {
        return res.json({
            success: true,
            message: "Admin Login Successful",
            role: "admin"
        });
    }

    if (
        username === "user" &&
        password === "user123" &&
        role === "user"
    ) {
        return res.json({
            success: true,
            message: "User Login Successful",
            role: "user"
        });
    }

    res.json({
        success: false,
        message: "Wrong username or password"
    });
});


// ORDER
app.post("/orders", (req, res) => {

    console.log("New Order:", req.body);

    res.json({
        success: true,
        message: "Order placed successfully"
    });
});


// SERVER
app.listen(5000, () => {
    console.log("E-Commerce Server Started");
    console.log("http://localhost:5000");
});