const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exrcises: [{
        type: {
            type: String,
            time: true,
            require: "Workout type is required"
        },
        name: {
            type: String,
            trim: true,
            require: "Write name of Workout"
        },
        duration: {
            type: Number,
            required: "Enter duration in minutes"
        },
        wieght: {
            type: Number,
        },
        reps: {
            type: Number,

        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,

        }
    }]
})

const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout