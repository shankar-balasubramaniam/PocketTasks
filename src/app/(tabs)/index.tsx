import { Pressable, StyleSheet, Text, View } from "react-native";

import TaskItem from "@/components/TaskItem";
import { colors } from "@/constants/colors";
import { TaskContext } from "@/contexts/TaskContext";
import { router } from "expo-router";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { tasks, toggleTask } = useContext(TaskContext);

  const handleTaskPress = (id: string) => {
    router.push(`/task/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>My Tasks</Text>
      {tasks.length > 0 ? (
        <View style={styles.tasksContainer}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onPress={handleTaskPress}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>You're all caught up!</Text>
          <Text>Tap the Create Task button to add a new task.</Text>
        </View>
      )}

      <Pressable
        onPress={() => router.push("/task/create")}
        style={styles.createTaskButton}
      >
        <Text style={styles.createTaskButtonText}>Create Task</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 16,
  },
  tasksContainer: {
    flex: 1,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createTaskButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  createTaskButtonText: {
    color: colors.onPrimary,
    fontWeight: "600",
    fontSize: 16,
  },
});
