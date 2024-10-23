import React, { useState } from 'react';
import './Admin.css';
import { Container, Typography, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Admin: React.FC = () => { 
  // State for Data
  const [totalTasks, setTotalTasks] = useState(0);
  const [waitingTasks, setWaitingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalBuilderTasks, setTotalBuilderTasks] = useState(0);
  const [totalReviewerTasks, setTotalReviewerTasks] = useState(0);
  const [reviewers, setReviewers] = useState([
    { name: 'John Doe', waitingTasks: 10, completedTasks: 10 },
    { name: 'Jane Smith', waitingTasks: 8, completedTasks: 7 },
    { name: 'Alice Johnson', waitingTasks: 5, completedTasks: 5 },
    { name: 'Bob Brown', waitingTasks: 4, completedTasks: 6 },
  ]);
  const [builders, setBuilders] = useState([
    { name: 'Michael Scott', waitingTasks: 6, completedTasks: 8 },
    { name: 'Pam Beesly', waitingTasks: 2, completedTasks: 5 },
    { name: 'Jim Halpert', waitingTasks: 3, completedTasks: 2 },
    { name: 'Dwight Schrute', waitingTasks: 5, completedTasks: 7 },
  ]);

  // Update data for Builders and Reviewers
  const updateMetrics = () => {
    const totalBuilderTasks = builders.reduce((sum, builder) => sum + builder.waitingTasks + builder.completedTasks, 0);
    const totalReviewerTasks = reviewers.reduce((sum, reviewer) => sum + reviewer.waitingTasks + reviewer.completedTasks, 0);
    const totalTasks = totalBuilderTasks + totalReviewerTasks;
    const totalWaitingTasks = builders.reduce((sum, builder) => sum + builder.waitingTasks, 0) +
                                reviewers.reduce((sum, reviewer) => sum + reviewer.waitingTasks, 0);

    setTotalTasks(totalTasks);
    setWaitingTasks(totalWaitingTasks);
    setCompletedTasks(totalTasks - totalWaitingTasks);
    setTotalBuilderTasks(totalBuilderTasks);
    setTotalReviewerTasks(totalReviewerTasks);
  };

  // Hàm điều chỉnh số lượng waitingTasks và completedTasks cho từng reviewer
  const adjustReviewerTasks = (index: number, amount: number) => {
    setReviewers((prevReviewers) => {
      return prevReviewers.map((reviewer, i) => {
        if (i === index && reviewer.waitingTasks >= amount) 
        {
          return {
            ...reviewer,
            waitingTasks: reviewer.waitingTasks - amount,
            completedTasks: reviewer.completedTasks + amount
          };
        }
        return reviewer;
      });
    });
  };

  // Hàm điều chỉnh số lượng waitingTasks và completedTasks cho từng builder
  const adjustBuilderTasks = (index: number, amount: number) => {
    setBuilders((prevBuilders) => {
      return prevBuilders.map((builder, i) => {
        if (i === index && builder.waitingTasks >= amount) 
        {
          return {
            ...builder,
            waitingTasks: builder.waitingTasks - amount,
            completedTasks: builder.completedTasks + amount
          };
        }
        return builder;
      });
    });
  };

  // Call function for Update
  React.useEffect(() => {
    updateMetrics();
  }, [reviewers, builders]);

  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="admin-card">
              <Typography variant="h6">Total tasks</Typography>
              <Typography variant="h4">{totalTasks}</Typography>
              <Button variant="contained" color="primary">More details</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="admin-card">
              <Typography variant="h6">Waiting tasks</Typography>
              <Typography variant="h4">{waitingTasks}</Typography>
              <Button variant="contained" color="primary">More details</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="admin-card">
              <Typography variant="h6">Completed tasks</Typography>
              <Typography variant="h4">{completedTasks}</Typography>
              <Button variant="contained" color="primary">More details</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="admin-card">
              <Typography variant="h6">Reviewer tasks</Typography>
              <Typography variant="h4">{totalReviewerTasks}</Typography>
              <Button variant="contained" color="primary">More details</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="admin-card">
              <Typography variant="h6">Builder tasks</Typography>
              <Typography variant="h4">{totalBuilderTasks}</Typography>
              <Button variant="contained" color="primary">More details</Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Reviewer Dashboard */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Reviewer Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Waiting Tasks</TableCell>
                <TableCell>Completed Tasks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviewers.map((reviewer, index) => (
                <TableRow key={index}>
                  <TableCell>{reviewer.name}</TableCell>
                  <TableCell>{reviewer.waitingTasks}</TableCell>
                  <TableCell>{reviewer.completedTasks}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      disabled={reviewer.waitingTasks === 0}
                      onClick={() => adjustReviewerTasks(index, 1)}
                    >
                      Complete 1 Task
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Builder Dashboard */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Builder Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Waiting Tasks</TableCell>
                <TableCell>Completed Tasks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {builders.map((builder, index) => (
                <TableRow key={index}>
                  <TableCell>{builder.name}</TableCell>
                  <TableCell>{builder.waitingTasks}</TableCell>
                  <TableCell>{builder.completedTasks}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      disabled={builder.waitingTasks === 0}
                      onClick={() => adjustBuilderTasks(index, 1)}
                    >
                      Complete 1 Task
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Admin;
