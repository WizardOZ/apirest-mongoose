// Imports :
import express from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3";


import getPerson from "./resolvers/getPerson.ts";
import addPerson from "./resolvers/addPerson.ts";
import updatePerson from "./resolvers/updatePerson.ts";
import deletePerson from "./resolvers/deletePerson.ts";


// Importamos la funcion load de las bibliotecas de Deno
// y cargamos las variables de entorno.
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env : Record<string,string> = await load();

// Buscamos las variables de entorno en nuestro .env o en el S.O.
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

// Verificamos que las variables de entorno exiten.
if(!MONGO_URL){
  console.log("You need to define MONGO_URL in '.env' file.");
  throw new Error("MONGO_URL environment variable is required but not provided.");
}

// Nos conectamos con la base de datos usando mongoose.
try{
await mongoose.connect(MONGO_URL);
console.info("Connected with Mongo.");
} catch(e){
  console.log(e);
}

const app = express();
app.use(express.json());
app
  .get("/getPerson/:dni", getPerson)
  .post("/addPerson", addPerson)
  .put("/updatePerson/:dni", updatePerson)
  .delete("/deletePerson/:dni", deletePerson);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
