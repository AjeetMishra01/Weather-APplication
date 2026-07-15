import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/weather",
});

export const getWeather = (city) =>
  API.get(`/${city}`);

export const getHistory = () =>
  API.get("/history");

export const toggleFavorite = (id) =>
  API.patch(`/history/${id}/favorite`);

export const deleteHistory = (id) =>
  API.delete(`/history/${id}`);