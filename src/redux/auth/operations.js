import { createAsyncThunk } from "@reduxjs/toolkit";
const { VITE_SERVER_URL } = import.meta.env;

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await fetch(`${VITE_SERVER_URL}/auth/signup`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'content-type': "application/json",
                },
            });

            const data = response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }
            return data;
        } catch (e) {
            thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(`${VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);