import React, { createContext, useContext, useState } from 'react';

interface Reviewer {
  name: string;
  waitingTasks: number;
  completedTasks: number;
}

interface Builder {
  name: string;
  waitingTasks: number;
  completedTasks: number;
}

interface TaskContextType {
  reviewers: Reviewer[];
  builders: Builder[];
  adjustReviewerTasks: (index: number, amount: number) => void;
  adjustBuilderTasks: (index: number, amount: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [reviewers, setReviewers] = useState<Reviewer[]>([
    { name: 'John Doe', waitingTasks: 10, completedTasks: 10 },
  ]);

  const [builders, setBuilders] = useState<Builder[]>([
    { name: 'Michael Scott', waitingTasks: 6, completedTasks: 8 },
  ]);

  // Hàm điều chỉnh nhiệm vụ của reviewer
  const adjustReviewerTasks = (index: number, amount: number) => {
    setReviewers((prevReviewers) =>
      prevReviewers.map((reviewer, i) => {
        if (i === index && reviewer.waitingTasks >= amount) {
          return {
            ...reviewer,
            waitingTasks: reviewer.waitingTasks - amount,
            completedTasks: reviewer.completedTasks + amount,
          };
        }
        return reviewer;
      })
    );
  };

  // Hàm điều chỉnh nhiệm vụ của builder
  const adjustBuilderTasks = (index: number, amount: number) => {
    setBuilders((prevBuilders) =>
      prevBuilders.map((builder, i) => {
        if (i === index && builder.waitingTasks >= amount) {
          return {
            ...builder,
            waitingTasks: builder.waitingTasks - amount,
            completedTasks: builder.completedTasks + amount,
          };
        }
        return builder;
      })
    );
  };

  return (
    <TaskContext.Provider
      value={{ reviewers, builders, adjustReviewerTasks, adjustBuilderTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
