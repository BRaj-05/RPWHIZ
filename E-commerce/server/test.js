const db = require("./firebase");

async function test() {
  await db.collection("products").add({
    name: "Test Product",
    price: 100
  });

  console.log("✅ Firestore working");
}

test();