import mongoose from "mongoose";

const weatherHistorySchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            required: true,
        },

        temperature: {
            type: Number,
            required: true,
        },

        humidity: {
            type: Number,
            required: true,
        },

        windSpeed: {
            type: Number,
            required: true,
        },

        condition: {
            type: String,
            required: true,
        },

        favorite: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const WeatherHistory = mongoose.model(
    "WeatherHistory",
    weatherHistorySchema
);

export default WeatherHistory;