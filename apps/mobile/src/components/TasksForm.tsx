import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "src/navigation/types";
import { useTodo } from "@kottekliv/shared";
import { Button } from "./Button";

//Styles
import { globals } from "src/themes/globals";
import { theme } from "src/themes/theme";

export default function TasksForm() {
  const [ text, setText ] = useState("")
  const [ error, setError ] = useState<string | null>(null)
  const {addTodo} = useTodo()

  const route = useRoute<RouteProp<RootStackParamList, "Tasks">>()
  const listId = route.params?.listId ?? "overview"

  const handleAddTask = () => {
    if(text.trim() === "" || !listId) {
      setError("Task cannot be empty")
      return
    }

    addTodo(text, listId)
    setText("")
    setError(null)
  }

  return(
    <View style={styles.container}>
      <View style={[globals.row, styles.form]}>
        <TextInput
          style={[globals.p, styles.input]}
          value={text}
          onChangeText={setText}
          placeholder="Add a new task..."
          placeholderTextColor={theme.colors.textMuted}
          />
        <Button
          title="+"
          variant="secondary"
          onPress={handleAddTask}
          />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: theme.space.md
  },
  form: {
    width: "100%",
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.pill,
    padding: theme.space.xs,
  },
  input: {
    marginLeft: theme.space.md,
    flex: 1
  },
  error: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,

  }
})