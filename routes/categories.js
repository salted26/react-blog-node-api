const router = require("express").Router();
const Category = require("../models/Category");
const cors = require("cors");

// CREATE POST
router.post("/", cors(), async(req, res)=>{
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET POST
router.get("/", cors(), async(req, res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router