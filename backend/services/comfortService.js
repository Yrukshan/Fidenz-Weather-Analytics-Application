function calculateComfort(weather) {
  const temp = weather.main.temp
  const humidity = weather.main.humidity
  const wind = weather.wind.speed
  const cloud = weather.clouds.all

  let score =
    100
    - Math.abs(temp - 22) * 2       // ideal temp ~22°C
    - Math.abs(humidity - 50) * 0.5 // ideal humidity ~50%
    - Math.abs(wind - 3) * 5        // ideal wind ~3 m/s
    - cloud * 0.1                    // more clouds reduce comfort

  score = Math.max(0, Math.min(100, score)) // clamp 0-100

  return Math.round(score)
}

module.exports = { calculateComfort }