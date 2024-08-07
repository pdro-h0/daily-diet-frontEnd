import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export interface MealStatistics {
  mealsCount: number;
  mealsInDiet: number;
  mealsOutOfDiet: number;
  maxStreak: number;
}

export const fetchMealsStatistics = createAsyncThunk(
  "me/statistics",
  async (token: string) => {
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

const initialState: MealStatistics = {
  mealsCount: 0,
  mealsInDiet: 0,
  mealsOutOfDiet: 0,
  maxStreak: 0,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsStatistics.fulfilled, (_, { payload }) => {
        return payload;
      })
      .addCase(fetchMealsStatistics.pending, () => {
        toast({
          title: "Carregando estatísticas...",
          status: "loading",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(fetchMealsStatistics.rejected, () => {
        toast({
          title: "Erro.",
          description: "Erro ao carregar estatísticas.",
          status: "error",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      });
  },
});

export const statistics = statisticsSlice.reducer;
