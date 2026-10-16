export const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
] as const;

export type Priority = (typeof PRIORITY_OPTIONS)[number]["value"];

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
}

export interface UpdateTaskInput {
  title: string;
  description: string;
  priority: Priority;
}
