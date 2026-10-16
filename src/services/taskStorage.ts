import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@/types/task";

export const loadTasks = async (): Promise<Task[] | null> => {
  try {
    const tasksJson = await AsyncStorage.getItem("tasks");
    if (tasksJson) {
      return JSON.parse(tasksJson) as Task[];
    } else {
      return null;
    }
  } catch (e) {
    console.error("Failed to load tasks from storage", e);
    return null;
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const tasksJson = JSON.stringify(tasks);
    await AsyncStorage.setItem("tasks", tasksJson);
  } catch (e) {
    console.error("Failed to save tasks to storage", e);
  }
};
