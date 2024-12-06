require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const airlines = require("./airlines.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://aeroapi.flightaware.com/aeroapi";
const API_KEY = process.env.FLIGHTAWARE_API_KEY;

// Fetch flight details by flight number
app.post("/api/flight", async (req, res) => {
  const { flightNumber, day } = req.body;
  try {
    const response = await axios.get(
      `${BASE_URL}/flights/${flightNumber}?start=${day}`,
      {
        headers: { "x-apikey": API_KEY },
      }
    );

    const codeToName = (code) => {
      const airline = airlines.find((airline) => airline.code === code);
      return airline ? airline.airline_name : "Unknown Airline";
    };

    const flightDetails = response.data?.flights?.map((data) => ({
      departure_airport: data.origin.code_iata,
      departure_city: data.origin.city,
      departure_time: data.scheduled_out || data.estimated_out,
      arrival_airport: data.destination.code_iata,
      arrival_city: data.destination.city,
      arrival_time: data.scheduled_in || data.estimated_in,
      airline: codeToName(data.operator_iata),
      flight_number: data.flight_number,
    }));

    res.json({ flights: flightDetails });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Failed to fetch flight details" });
  }
});

// Fetch all airlines
app.get("/api/airlines", async (req, res) => {
  try {
    const airlineNames = airlines
      .map((airline) => airline.airline_name) // Get the airline_name field
      .filter((name) => name); // Filter out any null or undefined names

    res.json(airlineNames); // Send back only the names
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Failed to fetch airports" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
