import { makeMsReadable } from "./makeMsReadable"

test("format time is formatted correctly", () => {
  expect(makeMsReadable(3600000)).toBe("1h 0m")
  expect(makeMsReadable(930000)).toBe("15m 30s")
  expect(makeMsReadable(28000)).toBe("28s")
})