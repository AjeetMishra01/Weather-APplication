import axios from "axios";

const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(CURRENT_WEATHER_URL, {
            params: {
                q: city,
                appid: process.env.WEATHER_API_KEY,
                units: "metric",
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Unable to connect to weather service.");
    }
};