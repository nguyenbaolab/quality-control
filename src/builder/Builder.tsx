import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { keyframes } from '@mui/system';
import './Builder.css'; // Import CSS file
import axios from 'axios';

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const WebsiteBuilder = () => {
  const [completedTasks, setCompletedTasks] = useState(5);
  const [pendingTasks, setPendingTasks] = useState(6);
  const [failTasks, setFailTasks] = useState(2);
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [videoErrorMessage, setVideoErrorMessage] = useState('');

  const completedTaskDetails = [
    'Completed task 1',
    'Completed task 2',
    'Completed task 3',
    'Completed task 4',
    'Completed task 5',
  ];

  const pendingTaskDetails = [
    'Pending task 1',
    'Pending task 2',
    'Pending task 3',
    'Pending task 4',
    'Pending task 5',
    'Pending task 6',
  ];
  
  const failTaskDetails = [
    'Fail task 1',
    'Fail task 2',
  ];

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const formData = new FormData();
      let newErrorMessage = '';
  
      files.forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          newErrorMessage += `${file.name} exceeds the 50MB limit.\n`;
        } else {
          formData.append('image', file); // 'image' là key mà backend sẽ nhận
        }
      });
  
      try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        setPhotos((prevPhotos) => prevPhotos.concat(response.data.photo.filename));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
  
      setErrorMessage(newErrorMessage);
    }
  };

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const formData = new FormData();
      let newVideoErrorMessage = '';
  
      files.forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          newVideoErrorMessage += `${file.name} exceeds the 50MB limit.\n`;
        } else {
          formData.append('video', file); // 'video' là key mà backend sẽ nhận
        }
      });
  
      try {
        const response = await axios.post('http://localhost:3001/upload-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        setVideos((prevVideos) => prevVideos.concat(response.data.video.filename));
      } catch (error) {
        console.error('Error uploading video:', error);
      }
  
      setVideoErrorMessage(newVideoErrorMessage);
    }
  };
  

  const handleSubmit = () => {
    console.log('Uploaded message:', message);
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        WEBSITE BUILDER
      </Typography>

      <Typography variant="h5" align="center" gutterBottom>
        Summary tasks
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
        {/* Completed Task Section */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed task</Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>More detail</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {completedTaskDetails.map((task, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={task} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Typography variant="h4">{completedTasks} 😊</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Task Section with rainbow animation */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending task</Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>More detail</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {pendingTaskDetails.map((task, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={task} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Typography variant="h4" sx={{ animation: `${blinkAnimation} 1s infinite` }}>
                {pendingTasks} 😟
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Fail Task Section */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Fail task</Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>More detail</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {failTaskDetails.map((task, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={task} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Typography variant="h4">{failTasks} 😞</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Add Photo and Uploaded Photos in the same row */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Add Photo
            <input type="file" hidden multiple onChange={handleUpload} />
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
            }}
          >
            <Typography variant="h6" align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
              Uploaded Photos
            </Typography>
            <List>
              {photos.map((photo, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Photo ${index + 1}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Add Video and Uploaded Videos in the same row */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Add Video
            <input type="file" hidden multiple accept="video/*" onChange={handleVideoUpload} />
          </Button>
          {videoErrorMessage && (
            <Typography variant="body2" color="error" align="center">
              {videoErrorMessage}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
              Uploaded Videos
            </Typography>
            <List>
              {videos.map((video, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Video ${index + 1}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>

      {/* Message Input */}
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default WebsiteBuilder;