import dotenv from "dotenv";
import app from "./app.js";
import { db } from "./config/firebase.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  // simple startup check
  await db.collection("_health").doc("ping").set({
    ok: true,
    at: new Date().toISOString(),
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});