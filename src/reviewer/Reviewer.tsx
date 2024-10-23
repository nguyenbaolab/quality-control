import React from 'react';
import { Button } from '@mui/material';
import { useTaskContext } from '../TaskContext';
import './Reviewer.css'

const Reviewer: React.FC = () => {
  const { reviewers, adjustReviewerTasks } = useTaskContext();

  return (
    <div>
      <h3>Reviewer Details</h3>
      <p>Name: {reviewers[0].name}</p>
      <p>Waiting Tasks: {reviewers[0].waitingTasks}</p>
      <p>Completed Tasks: {reviewers[0].completedTasks}</p>
      <Button
        variant="contained"
        color="primary"
        disabled={reviewers[0].waitingTasks === 0}
        onClick={() => adjustReviewerTasks(0, 1)}
      >
        Complete 1 Task
      </Button>
    </div>
  );
};

export default Reviewer;
