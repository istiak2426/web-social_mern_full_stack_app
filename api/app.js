const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer= require("multer")
const path= require("path")



dotenv.config();

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
})

const upload = multer({storage});

app.post("/api/upload", upload.single("file"), (req, res) =>{

  try {
    return res.status(200).json("file uploaded successfully")
  } catch (err) {
    console.log(err);
  }
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute)



mongoAtlasUri = process.env.MONGODB_URI;
try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}  




app.listen(8000, () => {
  console.log("Backend server is running!");
});