import { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { loadTasks, saveTasks } from "@/services/taskStorage";

import { generateId } from "@/utils/id";
import { tasks } from "@/data/tasks";

interface TaskContextValue {
  isLoaded: boolean;
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (input: CreateTaskInput) => void;
  updateTask: (id: string, input: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextValue>({
  isLoaded: false,
  tasks: [],
  toggleTask: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const loadedTasks = await loadTasks();

      setTasksList(loadedTasks || tasks);
      setIsLoaded(true);
    };

    hydrate();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    saveTasks(tasksList);
  }, [tasksList, isLoaded]);

  const toggleTask = (id: string) => {
    setTasksList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const addTask = (input: CreateTaskInput) => {
    const newTask: Task = {
      id: generateId(),
      title: input.title,
      description: input.description,
      priority: input.priority,
      completed: false,
    };
    setTasksList((currentTasks) => [...currentTasks, newTask]);
  };

  const updateTask = (id: string, input: UpdateTaskInput) => {
    setTasksList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, ...input } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasksList((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: tasksList,
        toggleTask,
        addTask,
        isLoaded,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
