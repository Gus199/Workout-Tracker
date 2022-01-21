const router = require('express').Router();
const db = require('../../models');


//gets the latest workout for display on homepage
router.get("/", (req, res) => {
    db.Workout.find({})
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.json(err);
    });
});


//adds a new workout to the db
router.post("/", async (req, res)=> {
    try{
        const response = await db.Workout.create({})
        res.json(response);
    }
    catch(err){
        console.log("error occurred creating a workout: ", err)
    }
})

//adds new exercise to a workout in the db
router.put("/:id", async ({ body, params }, res) => {
    try {
        await db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })
        .then((updateWorkout) => {
            res.json(updateWorkout);
        })
    }
    catch (err) {
        res.json(err);
    }
    
});

//get 7 days previous workouts for stats render
router.get('/range', async (req, res) => {
    try {
        await db.Workout.find({})
        .sort({ _id: 1 })
        .limit(7)
        .populate("exercises")
        .then(previousWeek => {
            res.json(previousWeek);
        })
    }

    catch (err) {
        res.json(err);
    }
    
});

module.exports = router;