require("dotenv").config()  

const express = require("express")
const cors = require("cors")

const weatherRoutes = require("./routes/weather")
const cacheRoutes = require("./routes/cache")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/weather", weatherRoutes)
app.use("/api/cache", cacheRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})