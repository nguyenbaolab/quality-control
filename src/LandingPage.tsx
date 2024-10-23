import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển hướng

// Định nghĩa kiểu User
interface User {
  Name: string;
  Username: string;
  Password: string;
}

const LandingPage: React.FC = () => {
  const [data, setData] = useState<User[]>([]); // Sử dụng kiểu User
  const navigate = useNavigate(); // Tạo function navigate

  useEffect(() => {
    // Thực hiện yêu cầu HTTP GET tới endpoint '/users'
    fetch('http://localhost:8081/users')
      .then(res => {
        console.log('Response status:', res.status); // Log trạng thái phản hồi HTTP, ví dụ 200, 404
        return res.json(); // Chuyển đổi phản hồi sang JSON
      })
      .then(data => {
        console.log('Data fetched:', data); // Log dữ liệu JSON đã nhận được từ server
        setData(data); // Cập nhật state 'data' với dữ liệu đã nhận được
      })
      .catch(err => console.error('Fetch error:', err)); // Log lỗi nếu có vấn đề xảy ra trong quá trình fetch
  }, []); // Chỉ chạy 1 lần khi component được render lần đầu tiên

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', // Đặt chiều dọc cho các thành phần con
      alignItems: 'center', // Căn giữa theo chiều ngang
      height: '100vh', 
      marginTop: '50px',
    }}>
      <TableContainer component={Paper} style={{ width: '50%', marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.Name}</TableCell>
                <TableCell>{d.Username}</TableCell>
                <TableCell>{d.Password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Nút Start */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/login')} 
        style={{ marginTop: '20px' }} // Đảm bảo có khoảng cách giữa nút và bảng
      >
        Start
      </Button>
    </div>
  );
};

export default LandingPage;