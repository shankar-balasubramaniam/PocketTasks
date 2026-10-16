import { Host, Picker, Row } from "@expo/ui";
import { PRIORITY_OPTIONS, Priority } from "@/types/task";
import { Pressable, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";

import { TaskContext } from "@/contexts/TaskContext";
import { router } from "expo-router";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const { addTask } = useContext(TaskContext);

  return (
    <View>
      <TextInput
        placeholder="Task title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Task description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Text>Priority:</Text>
      <Host matchContents={{ vertical: true }}>
        <Row alignment="center" spacing={12} style={{ padding: 16 }}>
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
        </Row>
      </Host>
      <Pressable
        onPress={() => {
          addTask({ title, description, priority });
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

export default CreateTask;
