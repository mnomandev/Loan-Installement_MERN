import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { transformLoan } from "../utils/loanUtils"; // ✅ normalize schema

const initialState = {
  loans: [],
  loanStats: {
    totalLoans: 0,
    totalCollected: 0,
    totalOutstanding: 0,
    activeLoans: 0,
  },
  isLoading: false,
  error: null,
};

// ✅ Add Loan
export const addLoan = createAsyncThunk(
  "loan/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://loan-backend-mu.vercel.app/api/loans/add-loan",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { success: false, message: "Failed to add loan" }
      );
    }
  }
);

// ✅ Fetch All Loans
export const fetchLoans = createAsyncThunk(
  "loan/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://loan-backend-mu.vercel.app/api/loans/get-loans",
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { success: false, message: "Failed to fetch loans" }
      );
    }
  }
);

// ✅ Fetch Loan Stats
export const fetchLoanStats = createAsyncThunk(
  "loan/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://loan-backend-mu.vercel.app/api/loans/loan-stats",
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { success: false, message: "Failed to fetch loan stats" }
      );
    }
  }
);

// ✅ Update Loan
export const updateLoan = createAsyncThunk(
  "loan/update",
  async ({ id, formData = {} }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://loan-backend-mu.vercel.app/api/loans/update-loan/${id}`,
        formData,
        { withCredentials: true }
      );
      return response.data.loan; // server returns loan with totalPaid, remaining, status
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { success: false, message: "Failed to update loan" }
      );
    }
  }
);

// ✅ Delete Loan
export const deleteLoan = createAsyncThunk(
  "loan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://loan-backend-mu.vercel.app/api/loans/delete-loan/${id}`,
        { withCredentials: true }
      );
      return { id, ...response.data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { success: false, message: "Failed to delete loan" }
      );
    }
  }
);

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    clearLoans: (state) => {
      state.loans = [];
      state.loanStats = initialState.loanStats;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ➡️ Add Loan
      .addCase(addLoan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          const newLoan = transformLoan(action.payload.loan);
          state.loans.push(newLoan);
        } else {
          state.error = action.payload.message || "Failed to add loan";
        }
      })
      .addCase(addLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to add loan";
      })

      // ➡️ Fetch Loans
      .addCase(fetchLoans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.loans = action.payload.loans.map(transformLoan);
        } else {
          state.error = action.payload.message || "Failed to fetch loans";
        }
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch loans";
      })

      // ➡️ Fetch Loan Stats
      .addCase(fetchLoanStats.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loanStats = action.payload.data; // only dashboard stats
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchLoanStats.rejected, (state, action) => {
        state.error = action.payload?.message;
      })

      // ➡️ Update Loan
      .addCase(updateLoan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const updatedLoan = transformLoan(action.payload);
          state.loans = state.loans.map((loan) =>
            loan._id === updatedLoan._id ? updatedLoan : loan
          );
        } else {
          state.error = "Failed to update loan";
        }
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update loan";
      })

      // ➡️ Delete Loan
      .addCase(deleteLoan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.loans = state.loans.filter(
            (loan) => loan._id !== action.payload.id
          );
        } else {
          state.error = action.payload.message || "Failed to delete loan";
        }
      })
      .addCase(deleteLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to delete loan";
      });
  },
});

export const { clearLoans } = loanSlice.actions;
export default loanSlice.reducer;
