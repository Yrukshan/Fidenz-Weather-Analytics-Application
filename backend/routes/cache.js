const express = require("express")
const router = express.Router()
const cache = require("../cache/cache")

router.get("/", (req, res) => {
  const keys = cache.keys()
  res.json({
    cachedKeys: keys,
    size: keys.length
  })
})

module.exports = router