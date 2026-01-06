
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserGoals = (userId) =>
  axios.get(`${BASE_URL}/goals/${userId}`).then(res => res.data);

export const addGoal = (userId, goal) =>
  axios.post(`${BASE_URL}/goals/${userId}`, goal).then(res => res.data);

export const deleteGoal = (userId, payload) =>
  axios.delete(`${BASE_URL}/goals/${userId}`, { data: payload })
    .then(res => res.data);
    


