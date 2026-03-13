const express = require("express")
const router = express.Router()
const cache = require("../cache/cache")

const citiesData = require("../data/cities.json")
const cities = citiesData.List

const { getWeather } = require("../services/weatherService")
const { calculateComfort } = require("../services/comfortService")

router.get("/", async (req, res) => {
  try {
    const cached = cache.get("weather")
    if (cached) {
      return res.json({ cache: "HIT", data: cached })
    }

    const results = []

    for (const city of cities) {
      const weather = await getWeather(city.CityCode)
      const score = calculateComfort(weather)
      results.push({
        city: weather.name,
        description: weather.weather[0].description,
        temperature: weather.main.temp,
        comfortScore: score
      })
    }

    // sort by comfortScore descending
    results.sort((a, b) => b.comfortScore - a.comfortScore)
    results.forEach((city, index) => {
      city.rank = index + 1
    })

    // cache results
    cache.set("weather", results)

    res.json({ cache: "MISS", data: results })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Failed to fetch weather data" })
  }
})

module.exports = router