export function calculateComfortIndex(temp, humidity) {
  return Math.round(temp * (1 - humidity / 100));
}