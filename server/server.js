const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');

// Khởi tạo app
const app = express();

// Kết nối tới MongoDB
const mongoURI = 'mongodb+srv://dynamic:dynamic@user.ct8fd.mongodb.net/?retryWrites=true&w=majority&appName=User';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Tạo GridFS để lưu file
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  // Khởi tạo gfs stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Tên collection sẽ lưu file

  // Truy xuất các collection từ database "dynamic"
  conn.db.collections()
    .then(collections => {
      collections.forEach((collection) => console.log(collection.collectionName));
    })
    .catch(err => console.error('Error retrieving collections:', err));
});

// Cấu hình GridFS storage với multer
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // Tạo tên file ngẫu nhiên với crypto
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' // Chỉ định collection GridFS để lưu file
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// Schema MongoDB để lưu thông tin ảnh
const PhotoSchema = new mongoose.Schema({
  filename: String, // Tên file trong GridFS
  description: String // Mô tả hoặc message đi kèm
});

const Photo = mongoose.model('Photo', PhotoSchema);

// API upload ảnh và lưu vào MongoDB
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newPhoto = new Photo({
      filename: req.file.filename,
      description: req.body.description || 'No description',
    });

    await newPhoto.save(); // Lưu thông tin ảnh vào MongoDB

    res.status(200).json({
      message: 'File uploaded successfully',
      photo: newPhoto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// API upload video và lưu vào MongoDB
app.post('/upload-video', upload.single('video'), async (req, res) => {
  try {
    const newVideo = new Photo({
      filename: req.file.filename,
      description: req.body.description || 'No description',
    });

    await newVideo.save(); // Lưu thông tin video vào MongoDB

    res.status(200).json({
      message: 'Video uploaded successfully',
      video: newVideo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading video' });
  }
});

// API để lấy ảnh từ MongoDB
app.get('/image/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file || !file.contentType) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (file.contentType.startsWith('image')) {
      const readStream = gfs.createReadStream({ filename: req.params.filename });
      readStream.pipe(res);
    } else {
      res.status(400).json({ error: 'Not an image' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving file' });
  }
});

// API để lấy video từ MongoDB
app.get('/video/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file || !file.contentType) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (file.contentType.startsWith('video')) {
      const readStream = gfs.createReadStream({ filename: req.params.filename });
      res.set('Content-Type', file.contentType);
      readStream.pipe(res);
    } else {
      res.status(400).json({ error: 'Not a video' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving video' });
  }
});

// Khởi chạy server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});

// API để lấy danh sách file đã upload
app.get('/files', async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving files' });
  }
});