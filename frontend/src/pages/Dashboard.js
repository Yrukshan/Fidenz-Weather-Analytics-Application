// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sortKey, setSortKey] = useState("rank"); // default sort by rank
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/weather")
      .then((res) => {
        setCities(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  }, []);

  // Sort cities based on selected key
  const sortedCities = [...cities].sort((a, b) => {
    if (sortKey === "temperature" || sortKey === "comfortScore" || sortKey === "rank") {
      return b[sortKey] - a[sortKey]; // descending numeric
    }
    return a[sortKey].localeCompare(b[sortKey]); // alphabetical for strings
  });

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Weather Comfort Dashboard</h1>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Sorting/Filtering */}
      <div className="flex gap-4 items-center p-5">
        <span>Sort by:</span>
        <select
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="rank">Rank</option>
          <option value="temperature">Temperature</option>
          <option value="comfortScore">Comfort Score</option>
          <option value="city">City</option>
        </select>
      </div>

      {/* Chart */}
      <div className="p-5">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedCities}>
            <XAxis dataKey="city" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#333" : "#fff",
                color: darkMode ? "#fff" : "#000",
              }}
            />
            <Legend />
            <Bar dataKey="temperature" fill="#8884d8" name="Temperature (°C)" />
            <Bar dataKey="comfortScore" fill="#82ca9d" name="Comfort Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* City Cards */}
      <div className="grid md:grid-cols-3 gap-4 p-5">
        {sortedCities.map((city) => (
          <div
            key={city.city}
            className="p-4 border rounded bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{city.rank}. {city.city}</h2>
            <p className="capitalize">{city.description}</p>
            <p>Temp: {city.temperature}°C</p>
            <p>Comfort: {city.comfortScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}