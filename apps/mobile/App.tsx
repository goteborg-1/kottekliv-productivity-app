import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { type RootStackParamList } from "./src/navigation/types";
import { StatusBar } from "expo-status-bar";
import { TimerProvider } from "@kottekliv/shared";
import { TodoProvider } from "@kottekliv/shared";

//Screens
import TimerScreen from "./src/screens/TimerScreen";
import TasksScreen from "./src/screens/TasksScreen";

//Style and icons
import { Ionicons } from '@expo/vector-icons';
import { theme } from "./src/themes/theme";

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function App() {
  return (
    <TimerProvider>
      <TodoProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Tab.Navigator initialRouteName="Timer" screenOptions={tabBarOptions}>
            <Tab.Screen name="Timer" component={TimerScreen} options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? "time" : "time-outline"} size={size} color={color} />
              )
            }}/>
            <Tab.Screen name="Tasks" component={TasksScreen} options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color} />
              )
            }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </TimerProvider>
  );
}

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: theme.colors.bg,
    borderTopColor: theme.colors.border,
  },
  tabBarActiveTintColor: theme.colors.text,
  tabBarInactiveTintColor: theme.colors.textMuted,
  headerShown: false,
}