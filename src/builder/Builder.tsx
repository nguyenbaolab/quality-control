// import React from 'react';
// import { Button } from '@mui/material';
// import { useTaskContext } from '../TaskContext';
// import './Builder.css';

// const Builder: React.FC = () => {
//   const { builders, adjustBuilderTasks } = useTaskContext();

//   return (
//     <div>
//       <h3>Builder Details</h3>
//       <p>Name: {builders[0].name}</p>
//       <p>Waiting Tasks: {builders[0].waitingTasks}</p>
//       <p>Completed Tasks: {builders[0].completedTasks}</p>
//       <Button
//         variant="contained"
//         color="primary"
//         disabled={builders[0].waitingTasks === 0}
//         onClick={() => adjustBuilderTasks(0, 1)}
//       >
//         Complete 1 Task
//       </Button>
//     </div>
//   );
// };

// export default Builder;

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

const rainbowAnimation = keyframes`
  0% { background-color: rgba(255, 0, 0, 0.2); } /* Red */
  14% { background-color: rgba(255, 165, 0, 0.2); } /* Orange */
  28% { background-color: rgba(255, 255, 0, 0.2); } /* Yellow */
  42% { background-color: rgba(0, 128, 0, 0.2); } /* Green */
  57% { background-color: rgba(0, 0, 255, 0.2); } /* Blue */
  71% { background-color: rgba(75, 0, 130, 0.2); } /* Indigo */
  85% { background-color: rgba(238, 130, 238, 0.2); } /* Violet */
  100% { background-color: rgba(255, 0, 0, 0.2); } /* Back to Red */
`;

const WebsiteBuilder = () => {
  const [completedTasks, setCompletedTasks] = useState(5);
  const [pendingTasks, setPendingTasks] = useState(6);
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

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const validFiles: string[] = [];
      let newErrorMessage = '';

      files.forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          newErrorMessage += `${file.name} exceeds the 50MB limit.\n`;
        } else {
          validFiles.push(URL.createObjectURL(file));
        }
      });

      setPhotos((prevPhotos) => prevPhotos.concat(validFiles));
      setErrorMessage(newErrorMessage);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const validVideos: string[] = [];
      let newVideoErrorMessage = '';

      files.forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          newVideoErrorMessage += `${file.name} exceeds the 50MB limit.\n`;
        } else {
          validVideos.push(URL.createObjectURL(file));
        }
      });

      setVideos((prevVideos) => prevVideos.concat(validVideos));
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
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,224,1) 50%)',
        position: 'relative',
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        WEBSITE BUILDER
      </Typography>

      <Typography variant="h5" align="center" color="red" gutterBottom>
        Summary tasks
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
        {/* Completed Task Section */}
        <Grid item xs={12} sm={6}>
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
              <Typography variant="h4">{completedTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Task Section with rainbow animation */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ animation: `${rainbowAnimation} 3s infinite` }}>
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
              <Typography variant="h4">{pendingTasks}</Typography>
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
              padding: 2,
            }}
          >
            <Typography variant="h6" align="center" sx={{ color: 'black', fontWeight: 'bold' }}>
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
              padding: 2,
            }}
          >
            <Typography variant="h6" align="center" sx={{ color: 'black', fontWeight: 'bold' }}>
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
            sx={{ marginBottom: 2 }}
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


