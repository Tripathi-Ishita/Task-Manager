import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';

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

// Saves tasks on the device so they survive closing the app
// (phone storage on Android/iOS, the browser's own storage on web).
const storage = createAsyncStorage('task-manager');

export const useTaskStore = create<TaskStore>()(
    persist(
        set => ({
            tasks: [],
            addTask: task =>
                set(state => ({ tasks: [...state.tasks, task] })),

            deleteTask: id =>
                set(state => ({
                    tasks: state.tasks.filter(task => task.id !== id),
                })),
        }),
        {
            name: 'tasks',
            storage: createJSONStorage(() => storage),
        },
    ),
);
