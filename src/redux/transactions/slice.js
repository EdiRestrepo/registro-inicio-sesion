import { createSlice } from "@reduxjs/toolkit";
import { createTransactions, fetchTransactions } from "./operations";

const inicialState = {
  items: [],
  meta: null,
  isLoading: false,
  error: null,
  formError: null,
  message: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const transactionsSlice = createSlice({
  name: "trnsactions",
  inicialState,
  reducers: {
    setFormError(state, { payload }) {
      state.formError = payload;
    },
    clearFormError(state) {
      state.formError = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: {
    [fetchTransactions.pending]: handlePending,
    [createTransactions.pending]: handlePending,
    [fetchTransactions.rejected]: handleRejected,
    [createTransactions.rejected]: handleRejected,
    [fetchTransactions.fulfilled](state, { payload }) {
      state.items = payload.data;
      state.meta = payload.meta;
      state.isLoading = false;
      state.error = null;
      state.formError = undefined;
    },
    [createTransactions.fulfilled](state, { payload }) {
        state.isLoading = false;
        state.error = null;
        state.formError = undefined;
        state.message = `A transaction of category ${payload.category} was created successfully`;
    //   state.items = payload.data;
    //   state.meta = payload.meta;
    },
  },
});

export const {setFormError, clearFormError, clearError, clearMessage} = transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;