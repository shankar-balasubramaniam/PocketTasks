import { Host, Picker } from "@expo/ui";
import { PRIORITY_OPTIONS, Priority } from "@/types/task";
import { Pressable, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { TaskContext } from "@/contexts/TaskContext";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const { id } = useLocalSearchParams();

  const { tasks, updateTask } = useContext(TaskContext);

  const taskToEdit = tasks.find((task) => task.id === id);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    }
  }, [taskToEdit]);

  if (!taskToEdit) {
    return (
      <View>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text>Priority:</Text>
      <Host>
        <Picker
          selectedValue={priority}
          onValueChange={(val) => setPriority(val as Priority)}
        >
          {PRIORITY_OPTIONS.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </Host>
      <Pressable
        onPress={() => {
          if (taskToEdit) {
            updateTask(taskToEdit.id, { title, description, priority });
          }
          router.back();
        }}
      >
        <Text>Save</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
};

export default EditTask;
