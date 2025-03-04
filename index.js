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
// Ruta para contar las posiciones de la letra en la palabra
app.get("/letras/:palabra/:letra", (req, res) => {
  const { palabra, letra } = req.params;

  // Validamos que la letra sea un solo carácter
  if (!letra || letra.length !== 1) {
    return res
      .status(400)
      .json({ error: true, message: "La letra debe ser un solo carácter" });
  }

  // Encontramos las posiciones de la letra en la palabra
  const posiciones = [];
  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i].toUpperCase() === letra.toUpperCase()) {
      posiciones.push(i); // Agregamos la posición
    }
  }

  // Si no se encuentra ninguna posición, devolvemos error
  if (posiciones.length === 0) {
    return res.json({ error: true, message: "No se encontró la letra" });
  }

  // Si se encuentran posiciones, devolvemos el resultado
  return res.json({ error: false, posiciones });
});
// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
