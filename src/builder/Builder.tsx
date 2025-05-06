import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import axios from 'axios';

interface Photo {
  filename: string;
  contentType: string;
  uploadTime: string;
}

const WebsiteBuilder = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      const file = event.target.files[0];

      if (file.size > 50 * 1024 * 1024) { // Kiểm tra kích thước tệp (50MB)
        setErrorMessage(`${file.name} exceeds the 50MB limit.`);
        return;
      }

      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Cập nhật danh sách ảnh và thời gian upload
        setPhotos((prevPhotos) => [
          ...prevPhotos,
          {
            filename: response.data.photo.filename,
            contentType: response.data.photo.contentType,
            uploadTime: new Date(response.data.photo.uploadTime).toLocaleString(),
          },
        ]);
        setErrorMessage(''); // Xóa thông báo lỗi nếu upload thành công
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrorMessage('Upload failed. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        WEBSITE BUILDER
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Add Photo
            <input type="file" hidden onChange={handleUpload} />
          </Button>
          {errorMessage && (
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: 2,
            }}
          >
            <Typography variant="h6" align="center">
              Uploaded Photos
            </Typography>
            <List>
              {photos.map((photo, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Photo ${index + 1}`}
                    secondary={`Uploaded at: ${photo.uploadTime}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WebsiteBuilder;
