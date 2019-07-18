const express = require("express");

const recipeRouter = require("./api/recipeRouter");
const ingredientRouter = require("./api/ingredientRouter");
const instructionsRouter = require("./api/instructionsRouter");

const server = express();

server.get("/", (req, res) => {
	res.send(`<h2>NodeDB IV Challenge</h2>`);
});

server.use(express.json());

server.use("/api/recipes", recipeRouter);
server.use("/api/ingredients", ingredientRouter);
server.use("/api/instructions", instructionsRouter);

server.use(errorHandler);

function errorHandler(error, req, res, next) {
	console.log(error);
	res.status(500).json({ error: "Data could not be retrieved" });
}

module.exports = server;
