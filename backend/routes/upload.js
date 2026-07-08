const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload file
router.post("/", upload.single("file"), (req, res) => {

  console.log("Content-Type:", req.headers["content-type"]);
  console.log("File:", req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  res.json({
    success: true,
    file: req.file.filename
  });
});

// List uploaded files
router.get("/files", (req, res) => {
  const files = fs.readdirSync("uploads");

  res.json({
    success: true,
    files
  });
});

// Download file
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found"
    });
  }

  res.download(filePath);
});

// Delete file
router.delete("/delete/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found"
    });
  }

  fs.unlinkSync(filePath);

  res.json({
    success: true,
    message: "File deleted successfully"
  });
});

module.exports = router;