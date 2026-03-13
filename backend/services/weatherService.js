require("dotenv").config() // ensure .env is loaded
const axios = require("axios")

const API_KEY = process.env.OPENWEATHER_KEY

if (!API_KEY) {
  console.error("ERROR: OPENWEATHER_KEY is missing! Check your .env file.")
}

async function getWeather(cityId) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    console.error("Error fetching weather for cityId", cityId, error.response?.data || error.message)
    throw error
  }
}

module.exports = { getWeather }