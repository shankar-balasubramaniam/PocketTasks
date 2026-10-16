import { Pressable, Text, View } from "react-native";

import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onPress }: TaskItemProps) => {
  return (
    <View>
      <Pressable onPress={() => onToggle(task.id)}>
        <Text>{task.completed ? "✓" : "○"}</Text>
      </Pressable>
      <Pressable onPress={() => onPress(task.id)}>
        <Text>{task.title}</Text>
        <Text>{task.priority}</Text>
      </Pressable>
    </View>
  );
};

export default TaskItem;
