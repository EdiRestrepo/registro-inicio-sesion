import { createAsyncThunk } from "@reduxjs/toolkit";
const { VITE_SERVER_URL } = import.meta.env;

export const fetchTransactions = createAsyncThunk(
    "transactions/fechtTransactions",
    async (token, thunkAPI) => {
        try {
            const response = await fetch(`${VITE_SERVER_URL}/transactions`, {
                headers: {
                    "Content-Type": "application/json",
                    Autorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const createTransactions = createAsyncThunk(
  "transactions/createTransactions",
  async ({token, transaction}, thunkAPI) => {
    try {
        const response = await fetch(`${VITE_SERVER_URL}/transactions`, {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${token}`,
            },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);