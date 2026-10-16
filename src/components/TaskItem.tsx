import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onPress }: TaskItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Pressable onPress={() => onToggle(task.id)}>
        <Text>{task.completed ? "✓" : "○"}</Text>
      </Pressable>
      <Pressable onPress={() => onPress(task.id)}>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        <Text style={styles.priority}>{task.priority}</Text>
      </Pressable>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  completedTitle: { textDecorationLine: "line-through" },
  priority: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
