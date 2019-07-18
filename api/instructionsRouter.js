const express = require("express");

const instructionsDB = require("./instructionsModel.js");

const middleware = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const instructions = await instructionsDB.getAll(req.query);
		res.status(200).json(instructions);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The listing of instructions could not be retrieved."
		});
	}
});

router.get("/:id", middleware.checkInstructionId, async (req, res) => {
	try {
		res.status(200).json(req.instruction);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error:
				"The information for the instruction specified could not be retrieved."
		});
	}
});

router.post("/", middleware.checkInstruction, async (req, res) => {
	try {
		const instruction = await instructionsDB.insert(req.body);
		res.status(201).json(instruction);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "There was an error while adding the instruction to the database"
		});
	}
});

router.delete("/:id", middleware.checkInstructionId, async (req, res) => {
	try {
		const count = await instructionsDB.remove(req.params.id);
		if (count > 0) {
			res.status(200).json(req.instruction);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The instruction could not be removed from the database"
		});
	}
});

router.put(
	"/:id",
	middleware.checkInstructionId,
	middleware.checkInstruction,
	async (req, res) => {
		try {
			const newinstruction = await instructionsDB.update(
				req.params.id,
				req.body
			);
			res.status(200).json(newinstruction);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "something went wrong" });
		}
	}
);

module.exports = router;
