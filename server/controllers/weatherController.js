import { fetchWeather } from "../services/weatherService.js";
import WeatherHistory from "../models/WeatherHistory.js";

export const getWeather = async (req, res) => {
    try {
        const { city } = req.params;

        const weatherData = await fetchWeather(city);

        const history = await WeatherHistory.create({
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            condition: weatherData.weather[0].main,
        });

        res.status(200).json({
            success: true,
            data: {
                city: weatherData.name,
                country: weatherData.sys.country,
                temperature: weatherData.main.temp,
                feelsLike: weatherData.main.feels_like,
                humidity: weatherData.main.humidity,
                pressure: weatherData.main.pressure,
                windSpeed: weatherData.wind.speed,
                condition: weatherData.weather[0].main,
                description: weatherData.weather[0].description,
                icon: weatherData.weather[0].icon,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getHistory = async (req, res) => {
    try {

        const history = await WeatherHistory.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const toggleFavorite = async (req, res) => {
    try {

        const weather = await WeatherHistory.findById(req.params.id);

        if (!weather) {
            return res.status(404).json({
                success: false,
                message: "History not found"
            });
        }

        weather.favorite = !weather.favorite;

        await weather.save();

        res.status(200).json({
            success: true,
            data: weather
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const deleteHistory = async (req, res) => {
    try {

        const history = await WeatherHistory.findById(req.params.id);

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "History not found"
            });
        }

        await WeatherHistory.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "History deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};