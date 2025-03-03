const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const allowedOrigins = [
  "http://localhost:3000", // Desarrollo
  "https://ej-react-8-ahorcado.netlify.app", // Producción en Netlify
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Servir palabras.json
app.get("/palabras.json", (req, res) => {
  res.sendFile(path.join(__dirname, "palabras.json"));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
