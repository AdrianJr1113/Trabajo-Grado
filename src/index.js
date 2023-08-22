import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";

async function main() {
  await createAdminUser();
  app.listen(app.get("port"));

  console.log("Servidor en puerto", app.get("port"));
  console.log("En el entorno:", process.env.NODE_ENV);
}

main();
