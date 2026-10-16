import { Pressable, Text } from "react-native";

import TaskItem from "@/components/TaskItem";
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
    <SafeAreaView>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onPress={handleTaskPress}
          />
        ))
      ) : (
        <>
          <Text>You're all caught up!</Text>
          <Text>Tap the Create Task button to add a new task.</Text>
        </>
      )}

      <Pressable onPress={() => router.push("/task/create")}>
        <Text>Create Task</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
