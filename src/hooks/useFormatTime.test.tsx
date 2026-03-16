import useFormatTime from "./useFormatTime"

test("format time is formatted correctly", () => {
  const formatTime = useFormatTime()
  expect(formatTime(3600000)).toBe("1h 0m")
  expect(formatTime(930000)).toBe("15m 30s")
  expect(formatTime(28000)).toBe("28s")
})