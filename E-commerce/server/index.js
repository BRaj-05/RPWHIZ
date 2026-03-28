require("dotenv").config();

const express = require("express");
const db = require("./firebase");

const app = express();
app.use(express.json());

/* ✅ TEST ROUTE */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* ✅ ADD PRODUCT */
app.post("/products", async (req, res) => {
  try {
    const product = req.body;

    const docRef = await db.collection("products").add(product);

    res.send({
      success: true,
      id: docRef.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* ✅ GET ALL PRODUCTS */
app.get("/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});