import { Pressable, StyleSheet, Text, TextBase } from "react-native";
import { theme } from "src/themes/theme";

type ButtonProps = {
  title: string,
  onPress: () => void,
  variant?: "primary" | "secondary",
  disabled?: boolean
}

export function Button({title, onPress, variant = "primary", disabled}: ButtonProps) {
  return(
    <Pressable 
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.base, 
        styles[variant], 
        pressed && styles.pressed
      ]}
    >
      <Text 
        style={[
          styles.textBase, 
          styles[variant]
        ]}
      >
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: theme.space.xl,
    paddingVertical: theme.space.sm,
    borderRadius: theme.radius.pill,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5
  },
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.onPrimary
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.onSecondary,
  },
  textBase: {
    fontSize: theme.fontSize.base,
    fontWeight: 600
  },
})