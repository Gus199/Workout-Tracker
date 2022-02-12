const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const Workout = require("./models/Workout");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/workout_tracker",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
	},err => {
    if(err) throw err;
    console.log('Connected to MongoDB')
  }

);

// stats page
app.get("/stats", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/stats.html"))
);

// exercise page
app.get("/exercise", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/exercise.html"))
);

// get all workouts
app.get("/api/workouts", (req, res) => {
	Workout.aggregate([
		{
			$addFields: {
				totalDuration: { $sum: "$exercises.duration" },
			},
		},
	])
		.then((workout) => {
			res.json(workout);
		})
		.catch((err) => {
			res.json(err);
		});
});

// update workout with new exercise by id
app.put("/api/workouts/:id", (req, res) => {
	Workout.updateOne(
		{ _id: req.params.id },
		{
			$push: { exercises: req.body },
		}
	)
		.then((workout) => {
			res.json(workout);
		})
		.catch((err) => {
			res.json(err);
		});
});

// create a new workout
app.post("/api/workouts", (req, res) => {
	Workout.create({ ...req.body })
		.then((workout) => {
			res.json(workout);
		})
		.catch((err) => {
			res.json(err);
		});
});

// get workouts from last 7 days and add a total duration field
app.get("/api/workouts/range", (req, res) => {
	Workout.aggregate([
		{
			$addFields: {
				totalDuration: { $sum: "$exercises.duration" },
			},
		},
	])
		.sort({ day: 1 })
		.limit(7)
		.then((workouts) => {
			res.json(workouts);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});