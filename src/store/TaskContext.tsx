import React from "react";
import { createContext, useContext, useState } from "react";
export type Task = {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    category: string;
};
//defining what context provides
type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;//takes one task and returns nthg
    deleteTask: (id: string) => void;
};
//the global bucket to hold task
const TaskContext = createContext<TaskContextType | undefined>(undefined);
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const addTask = (task: Task) => {
        setTasks(prev => [...prev, task]);
    };
    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };
    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
//one custom hook use to learn
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used inside provider');
    }
    return context;
};
