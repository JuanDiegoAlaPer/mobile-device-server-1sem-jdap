const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/UserRoutes");
const breweryRoutes = require("./src/routes/BreweryRoutes");
const beerRoutes = require("./src/routes/BeerRoutes");
const reviewRoutes = require("./src/routes/ReviewRoutes");
const ratingRoutes = require("./src/routes/RatingRoutes");
const eventRoutes = require("./src/routes/EventRoutes");

const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//RUTAS
app.use("/users", userRoutes);
app.use("/breweries", breweryRoutes);
app.use("/beers", beerRoutes);
app.use("/reviews", reviewRoutes);
app.use("/ratings", ratingRoutes);
app.use("/events", eventRoutes);

// poder acceder a leer el archivo .env
require("dotenv").config();

// conexión con la dase de datos
const CONNECTION_PORT = process.env.PORT || 3002;
app.listen(CONNECTION_PORT, () => {
  console.log(`Server running on port ${CONNECTION_PORT}`);
});
