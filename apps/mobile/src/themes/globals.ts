import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const globals = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.bg
  },
  container: {
    flex: 1,
    padding: theme.space.lg,
    gap: theme.space.xl
  },
  row: {
    flexDirection: "row",
    gap: theme.space.md
  },
  heading: {
    fontSize: theme.fontSize.headings,
    color: theme.colors.text,
  },
  p: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text
  },
})