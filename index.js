const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let dataCache = [];

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a la API");
});

app.get("/fetch-and-store", async (req, res) => {
  try {
    const response = await axios.get(
      "https://projectvercelexpress-4clr7yyw9-anderson-burgos-projects.vercel.app/"
    );
    dataCache = response.data;

    // Almacena los datos en memoria
    dataCache.push(newData);

    res.send("Datos obtenidos y almacenados en memoria");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los datos");
  }
});

// Almacenamiento manual de datos
app.get("/get-data", (req, res) => {
  const newData = req.body;

  newData ? dataCache.push(newData) : res.status(404).send("Datos invalidos");
});

// Obtener datos almacenados
app.get("/get-data", (req, res) => {
  if (dataCache.length > 0) {
    res.json(dataCache);
  } else {
    res.status(404).send("No hay datos almacenados");
  }
});

app.listen(() => {
  console.log(`servidor http://localhost:${port}`);
});
