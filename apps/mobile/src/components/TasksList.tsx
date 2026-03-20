import { useState, useMemo } from "react";
import { FlatList, Text, TextInput, View, Pressable, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "src/navigation/types";
import { type TodoWithListId, useTodo } from "@kottekliv/shared";
import { getTasksToDisplay, getSortedTasks } from "@kottekliv/shared";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "src/themes/theme";
import { globals } from "src/themes/globals";

export default function TaskList() {
  const { state, editTodo, toggleTodo, deleteTodo } = useTodo()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const route = useRoute<RouteProp<RootStackParamList, "Tasks">>()
  const listId = route.params?.listId ?? "overview"

  const sortedTasks = useMemo(() => {
    const tasksToDisplay = getTasksToDisplay(state, listId)
    return getSortedTasks(tasksToDisplay)
  }, [state, listId])

  const handleSaveEdit = (task: TodoWithListId) => {
    if(editText.trim() === "") return

    editTodo(task.id, task.listId, editText)
    setEditingId(null)
    setEditText("")
  }

  return(
    <FlatList
      data={sortedTasks}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={[globals.row, styles.taskRow]}>
          <View style={styles.leftGroup}>
            <Pressable
              onPress={() => toggleTodo(item.id, item.listId)}
            >
              {item.isCompleted ? (
                <Ionicons name="radio-button-on" size={24} color={theme.colors.primary} />
              ) : (
                <Ionicons name="radio-button-off" size={24} color={theme.colors.primary} />
              )}
            </Pressable>
            {editingId === item.id ? (
              <TextInput
                style={globals.p}
                value={editText}
                onChangeText={setEditText}
                onBlur={() => handleSaveEdit(item)}
              />
            ) : (
              <Pressable
                onPress={() => {setEditingId(item.id); setEditText(item.text)}}
              >
                <Text style={[globals.p, item.isCompleted && styles.completedText]}>{item.text}</Text>
                {!listId && <Text>{state.find(l => l.id === item.listId)?.title}</Text>}
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={() => deleteTodo(item.id, item.listId)}
          >
            <Ionicons name="trash-outline" size={18} color={theme.colors.textMuted} />
          </Pressable>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  taskRow: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.space.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space.md
  },
  completedText: {
    opacity: 0.4,
  }
})