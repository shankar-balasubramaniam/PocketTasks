import { Alert, Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { TaskContext } from "@/contexts/TaskContext";
import { useContext } from "react";

const TaskDetails = () => {
  const { id } = useLocalSearchParams();
  const { tasks, deleteTask } = useContext(TaskContext);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return (
      <View>
        <Text>Task not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${task.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTask(task.id);
            router.back();
          },
        },
      ],
    );
  };

  return (
    <View>
      <Text>ID: {task.id}</Text>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>Priority: {task.priority}</Text>
      <Text>Status: {task.completed ? "Completed" : "Incomplete"}</Text>

      <Pressable onPress={() => router.push(`/task/edit/${task.id}`)}>
        <Text>Edit Task</Text>
      </Pressable>

      <View style={{ height: 50 }} />

      <Pressable onPress={handleDelete}>
        <Text>Delete Task</Text>
      </Pressable>
    </View>
  );
};

export default TaskDetails;
