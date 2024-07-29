const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

let dataCache = [];

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a la API");
});

// Endpoint para obtener y almacenar datos
app.get("/fetch-and-store", async (req, res) => {
  try {
    const response = await axios.get("URL_DE_TU_API");
    dataCache.push(response.data);
    res.status(200).send("Datos obtenidos y almacenados correctamente");
  } catch (error) {
    res.status(500).send("Error al obtener los datos");
  }
});

// Endpoint para obtener datos almacenados
app.get("/get-data", (req, res) => {
  if (dataCache.length > 0) {
    res.json(dataCache);
  } else {
    res.status(404).send("No hay datos almacenados");
  }
});

// Endpoint para agregar datos manualmente
app.post("/add-data", express.json(), (req, res) => {
  const newData = req.body;
  if (newData) {
    dataCache.push(newData);
    res.status(200).send("Datos agregados correctamente");
  } else {
    res.status(400).send("Datos inválidos");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
