import { Task } from "@/types/task";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Read 10 pages of a book",
    description: "Read 10 pages of a book to improve knowledge and focus.",
    completed: false,
    priority: "medium",
  },
  {
    id: "2",
    title: "Learn React Native",
    description:
      "Learn React Native to build cross-platform mobile applications.",
    completed: true,
    priority: "high",
  },
  {
    id: "3",
    title: "Learn DSA",
    description:
      "Learn Data Structures and Algorithms to improve problem-solving skills.",
    completed: false,
    priority: "low",
  },
];
