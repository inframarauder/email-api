require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const sendEmail = require("./mail");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => res.sendStatus(200));

app.post("/", upload.any(), (req, res) => {
  const { email, query } = req.body;
  const attachments = [
    {
      filename: `${req.files[0].originalname}`,
      content: fs.createReadStream(req.files[0].path),
    },
  ];
  sendEmail({ email, query, attachments });
  res.sendStatus(200);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port", port));
