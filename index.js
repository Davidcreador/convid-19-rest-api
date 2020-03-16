"use strict";
require("@babel/core");
const fs = require("fs");
const path = require("path");
const Cors = require("cors");
const logger = require("morgan");
const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");

const app = express();
// const swaggerTools = require("swagger-tools");
// const jsyaml = require("js-yaml");
const serverPort = process.env.API_PORT || 5000;

const swaggerDefinition = {
  info: {
    title: "Covid-19 Swagger API",
    version: "1.0.0"
  },
  host: "localhost:3003",
  basePath: "/"
};

// swaggerRouter configuration
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerDoc(options);

app.get("/swagger.json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
// const spec = fs.readFileSync(path.join(__dirname, "api/swagger.yaml"), "utf8");
// const swaggerDoc = jsyaml.safeLoad(spec);
const routes = require("./routes/index");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Cors());
app.use(logger("dev"));

// APP ROUTES
app.use("/", routes);

// Start the server
app.listen(serverPort, function() {
  console.log(
    "Your server is listening on port %d (http://localhost:%d)",
    serverPort,
    serverPort
  );
  console.log(
    "Swagger-ui is available on http://localhost:%d/docs",
    serverPort
  );
});
