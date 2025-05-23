const express = require('express');  // Import thư viện Express để tạo server
const mysql = require('mysql');      // Import thư viện MySQL để kết nối với cơ sở dữ liệu
const cors = require('cors');        // Import CORS để cho phép chia sẻ tài nguyên giữa các domain khác nhau

const app = express();               // Khởi tạo một ứng dụng Express
app.use(cors());                     // Kích hoạt CORS để tránh lỗi chính sách CORS khi frontend và backend không cùng domain hoặc port

// Middleware để xử lý JSON và form data từ các request
app.use(express.json());             // Middleware để xử lý dữ liệu JSON từ body của POST request
app.use(express.urlencoded({ extended: true }));  // Middleware để xử lý dữ liệu URL-encoded (dữ liệu từ form)

// Tạo kết nối tới cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: "localhost",                // Máy chủ MySQL (ở đây là máy cục bộ - localhost)
  user: 'root',                     // Tài khoản MySQL (ở đây là 'root')
  password: '',                     // Mật khẩu cho tài khoản (ở đây không có mật khẩu)
  database: 'dynamic'               // Tên cơ sở dữ liệu (ở đây là 'dynamic')
});

// Endpoint test đơn giản, trả về chuỗi JSON khi truy cập vào '/'
app.get('/', (req, res) => {        
  return res.json("From Backend Side");  // Trả về chuỗi "From Backend Side"
})

// Endpoint để xác thực thông tin đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;  // Nhận thông tin từ request body

  // Câu lệnh SQL để kiểm tra thông tin đăng nhập
  const sql = "SELECT Name FROM users WHERE Username = ? AND Password = ?";
  
  // Thực hiện truy vấn với username và password nhận được
  db.query(sql, [username, password], (err, result) => { //So sánh để xác thực người dùng
    if (err) return res.status(500).json({ error: err });
    
    if (result.length > 0) {
      // Nếu tìm thấy người dùng, trả về thông tin Name cho frondend
      return res.json(result[0]);  // Gửi thông tin người dùng đầu tiên
    } else {
      // Nếu không tìm thấy người dùng, trả về lỗi 401
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

// Lắng nghe trên cổng 8081
app.listen(8081, () => {
  console.log("listening ...");        // In ra thông báo "listening ..." khi server bắt đầu hoạt động
})


// Endpoint để lấy dữ liệu từ bảng 'users'
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";   // Câu lệnh SQL để lấy toàn bộ dữ liệu từ bảng 'users'
  
  // Thực hiện truy vấn lên cơ sở dữ liệu
  db.query(sql, (err, data) => {
    if (err) return res.json(err);     // Nếu có lỗi, trả về lỗi dưới dạng JSON
    return res.json(data);             // Nếu thành công, trả về dữ liệu lấy được (danh sách users) dưới dạng JSON
  })
})

