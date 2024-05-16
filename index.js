const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const multer = require("multer")

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    }).then(console.log("Connected to MongoDB")).catch((err)=>console.log(err))

    // FILE UPLOAD : filename 설정을 별도로 해야할 듯
    const storage = multer.diskStorage({
        destination:(req, file, cb) =>{
            cb(null, "images")
        }, filename:(req, file, cb) =>{
            cb(null, req.body.name);
        },
    })

// FILE UPLOAD 
const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);

app.listen("5000", ()=>{
    console.log("Backend is running.")
})

