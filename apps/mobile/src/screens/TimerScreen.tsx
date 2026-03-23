import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useTimerContext} from "@kottekliv/shared"

//Style
import { globals } from "../themes/globals";
import { theme } from "../themes/theme";
import { Button } from "src/components/Button";

export default function TimerScreen() {
  const {state, pauseTimer, startTimer, resetTimer, currentTimer} = useTimerContext()

  return(
    <SafeAreaView style={globals.safe}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.timerDisplay}>{currentTimer()}</Text>
        </View>
        <View style={globals.row}>
          <Button 
            title={state.isRunning ? "Pause" : "Start"}
            variant="primary"
            onPress={state.isRunning ? pauseTimer : startTimer}
          />
          <Button 
            title="Reset"
            variant="secondary"
            onPress={resetTimer}
            disabled={state.msDisplay < 1}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.space.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.space.xl
  },
  circle: {
    width: "95%",
    aspectRatio: 1 / 1,
    borderWidth: 6,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    justifyContent: "center",
    alignItems: "center"
  },
  timerDisplay: {
    fontSize: 52,
    fontWeight: 400,
    color: theme.colors.text,
  }
})