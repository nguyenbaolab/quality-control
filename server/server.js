const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/photoUploader')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Schema và Model
const photoSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBase64: String,
  uploadTime: { type: Date, default: Date.now },
});
const Photo = mongoose.model('Photo', photoSchema);

// Cấu hình Multer
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint tải ảnh lên
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const img = fs.readFileSync(req.file.path);
    const encodedImg = img.toString('base64');

    const photo = new Photo({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: encodedImg,
    });
    await photo.save();

    fs.unlinkSync(req.file.path); // Xoá file tạm

    res.status(200).json({ message: 'Upload successful', photo });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Khởi động server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
