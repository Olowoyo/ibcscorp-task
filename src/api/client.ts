import axios from "axios";
import { User } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
  },

  updateUser: async (user: User): Promise<User> => {
    const { data } = await axios.put(`${BASE_URL}/users/${user.id}`, user);
    return data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/users/${id}`);
  },

  createUser: async (user: Omit<User, "id">): Promise<User> => {
    const { data } = await axios.post(`${BASE_URL}/users`, user);
    // JSONPlaceholder returns a generic ID, we'll generate a unique one
    return {
      ...user,
      id: Date.now(),
      ...data,
    };
  },
};
