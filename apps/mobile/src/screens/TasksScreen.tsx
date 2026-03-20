import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, KeyboardAvoidingView, Platform } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamList } from "src/navigation/types";
import { getTasksToDisplay, TodoList, useTodo } from "@kottekliv/shared";
import TasksForm from "src/components/TasksForm";
import TaskList from "src/components/TasksList";
import { globals } from "../themes/globals";
import { theme } from "src/themes/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function TasksScreen() {
  const {state, createList, deleteList, getProgress} = useTodo()
  const navigation = useNavigation<NavigationProp>()
  const [isAdding, setIsAdding] = useState(false)
  const [newListTitle, setNewListTitle] = useState("")

  const route = useRoute<RouteProp<RootStackParamList, "Tasks">>()
  const listId = route.params?.listId ?? "overview"

  const relevantTodos = getTasksToDisplay(state, listId)
  const { totalTodos, finishedTodos } = getProgress(relevantTodos)

  const confirmDelete = (list: TodoList) => {
    Alert.alert(
      "Delete List",
      `Are you sure you want to delete ${list.title}?`,
      [
        {text: "Cancel", style: "cancel"},
        {text: "Delete", style: "destructive", 
          onPress: () => {
            deleteList(list.id)
            if(listId === list.id) navigation.navigate("Tasks", {listId: "overview"})
          }
        }
      ]
    )
  }

  const handleCreateList = () => {
    if(newListTitle.trim() === "") {
      setIsAdding(false)
      return
    }

    const newId = `l-${Date.now()}`
    createList(newListTitle, newId)
    setNewListTitle("")
    setIsAdding(false)

    navigation.navigate("Tasks", {listId: newId})
  }

  return(
    <SafeAreaView style={globals.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globals.container}>
            <View>
              <ScrollView
                contentContainerStyle={styles.navContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <Pressable 
                  style={[styles.navItem, listId === "overview" && styles.activeNav]}
                  onPress={() => navigation.navigate("Tasks", {listId: "overview"})}
                >
                  <Text style={[styles.navText, listId === "overview" && styles.activeNavText]}>Overview</Text>
                </Pressable>

                {state.map((list) => (
                  <Pressable
                    style={[styles.navItem, listId === list.id && styles.activeNav]}
                    key={list.id}
                    onPress={() => navigation.navigate("Tasks", {listId: list.id})}
                    onLongPress={() => confirmDelete(list)}
                  >
                    <Text style={[styles.navText, listId === list.id && styles.activeNavText]}>{list.title}</Text>
                  </Pressable>
                ))}

                {isAdding ? (
                  <TextInput
                    autoFocus
                    style={styles.addListInput} 
                    value={newListTitle}
                    onChangeText={setNewListTitle}
                    onBlur={handleCreateList}
                    placeholder="New list..."
                    placeholderTextColor={theme.colors.textMuted}
                  />
                ) : (
                  <Pressable
                    style={styles.addListBtn}
                    onPress={() => setIsAdding(true)}
                  >
                    <Text style={globals.p}>+</Text>
                  </Pressable>
                )}
              </ScrollView>
            </View>

            <View style={styles.headingContainer}>
              <Text style={globals.heading}>{state.find(l => l.id === listId)?.title || "Overview"}</Text>
              <Text style={styles.stats}>
                {totalTodos > 0 
                  ? `${finishedTodos}/${totalTodos} finished` 
                  : listId === "overview" 
                  ? "Start by adding a list!" 
                  : "Start by adding a task!"}
              </Text>
            </View>

              <View style={styles.tasksContainer}>
                <TaskList />
              </View>

              {listId !== "overview" && <TasksForm />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  navContainer: {
    gap: theme.space.md,
  },
  navItem: {
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.md,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "transparent",
  },
  navText: {
    color: theme.colors.textMuted,
  },
  activeNav: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
  },
  activeNavText: {
    color: theme.colors.onSecondary,
    fontWeight: 500,
  },
  addListBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    aspectRatio: 1 / 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.colors.textMuted,
    borderRadius: theme.radius.pill,
    color: theme.colors.textMuted,
  },
  addListInput: {
    height: 40,
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.md,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    color: theme.colors.textMuted,
  },
  headingContainer: {
    gap: theme.space.sm,
  },
  stats: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.base
  },
  tasksContainer: {
    flex: 1,
  }
})