// import modules/packages
const express = require("express");
const zod = require("zod");
const Bird = require("../models/birds");

// router instance
const router = express();

// endpoints
router.get("/test", (req, res)=>{
    try {
        // response
        res.status(200).send("Working");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});

router.get("/birds", async (req, res)=>{
    try {
        // retrieve birds from the database
        const birds = await Bird.find({});
        if(birds.length === 0){
            return res.status(200).send("No birds yet");
        };

        res.status(200).json(birds);        
    } catch (err) {
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});

router.get("/bird/:birdId", async (req, res)=>{
    try {
        // get bird id
        const birdId = req.params.birdId;

        // retrieve bird from the database
        const bird = await Bird.findById(birdId);
        if(!bird){
            return res.status(200).send("No bird found");
        };

        res.status(200).json(bird);        
    } catch (err) {
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});


router.post("/new-bird", async (req, res)=>{
    try {
        // validation schema
        const birdSchema = zod.object({
            name: zod.string(),
            family: zod.string(),
            lifeSpan: zod.number()
        });

        // parse the incoming data
        const validData = birdSchema.parse(req.body);

        // object destructure
        const { name, family, lifeSpan } = validData;

        // preview the data
        // console.log(name, family, lifeSpan);

        // save the data to the database
        const newBird = await Bird({
            name, family, lifeSpan
        });

        await newBird.save();

        res.status(201).send("New bird saved to the database");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});

router.put("/bird/:birdId", async (req, res)=>{
    try {
        // get the requested id
        const birdId = req.params.birdId;
        
        // retrieve the bird from the database
        const bird = await Bird.findById(birdId);

        if(!bird){
            return res.status(404).send("Bird not found");
        };
        
        // validation schema
        const birdSchema = zod.object({
            name: zod.string().optional(),
            family: zod.string().optional(),
            lifeSpan: zod.number().optional()
        });

        // parse incoming data
        const validData = birdSchema.parse(req.body);

        // object destructure
        const { name, family, lifeSpan } = validData;
        
        // console.table([name, family, lifeSpan]);

        // update the bird
        await Bird.findByIdAndUpdate(birdId, { name, family, lifeSpan });

        res.status(200).send("Bird updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});

router.delete("/bird/:birdId", async (req, res)=>{
    try {
        // get the requested id
        const birdId = req.params.birdId;
        
        // retrieve the bird from the database
        const bird = await Bird.findById(birdId);

        if(!bird){
            return res.status(404).send("Bird not found");
        };

        await Bird.findByIdAndDelete(birdId);

        res.status(200).send("Bird removed");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});


// export router instance
module.exports = router;