import React from 'react';
import { Button } from '@mui/material';
import { useTaskContext } from '../TaskContext';

const Builder: React.FC = () => {
  const { builders, adjustBuilderTasks } = useTaskContext();

  return (
    <div>
      <h3>Builder Details</h3>
      <p>Name: {builders[0].name}</p>
      <p>Waiting Tasks: {builders[0].waitingTasks}</p>
      <p>Completed Tasks: {builders[0].completedTasks}</p>
      <Button
        variant="contained"
        color="primary"
        disabled={builders[0].waitingTasks === 0}
        onClick={() => adjustBuilderTasks(0, 1)}
      >
        Complete 1 Task
      </Button>
    </div>
  );
};

export default Builder;
