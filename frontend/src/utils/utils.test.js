import { calculateComfortIndex } from "./utils";

test("calculate comfort index correctly", () => {
  expect(calculateComfortIndex(30, 50)).toBe(15);
  expect(calculateComfortIndex(25, 20)).toBe(20);
  expect(calculateComfortIndex(0, 50)).toBe(0);
});