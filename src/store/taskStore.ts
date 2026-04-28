import { create } from 'zustand';

export type Task = {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    category: string;
};

type TaskStore = {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>(set => ({
    tasks: [],
    addTask: task =>
        set(state => ({ tasks: [...state.tasks, task] })),

    deleteTask: id =>
        set(state => ({
            tasks: state.tasks.filter(task => task.id !== id),
        })),
}));