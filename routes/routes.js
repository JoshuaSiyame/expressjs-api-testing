// import modules/packages
const express = require("express");

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

// export router instance
module.exports = router;