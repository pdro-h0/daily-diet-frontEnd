import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../pages/diet-details";
import { api } from "../../lib/axios";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

interface mealPyload {
  id?: string;
  data?: Meal;
  token?: string;
}

export const fetchMeals = createAsyncThunk(
  "meal/user",
  async (token: string) => {
    const response = await api.get("/meal/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.meals;
  }
);

export const getMealById = createAsyncThunk(
  "meal/id",
  async ({ id, token }: mealPyload) => {
    const response = await api.get(`/meal/${id}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.meal;
  }
);

export const deleteMeal = createAsyncThunk(
  "meal/delete",
  async ({ token, id }: mealPyload) => {
    await api.delete(`/meal/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return id;
  }
);

export const editMealHandler = createAsyncThunk(
  "meal/edit",
  async ({ id, data, token }: mealPyload) => {
    const response = await api.put(
      `/meal/${id}`,
      {
        date: data.date === "" ? new Date() : data.date,
        description: data.description,
        isOnDiet: data.isOnDiet,
        name: data.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const addMeal = createAsyncThunk(
  "meal/add",
  async ({ data, token }: mealPyload) => {
    const response = await api.post(
      "/meal",
      {
        description: data.description,
        isOnDiet: data.isOnDiet,
        name: data.name,
        date: data.date === "" ? new Date() : data.date,
        userId: data.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

export const initialState: Meal[] = [];

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMeals.fulfilled,
        (_, { payload }: PayloadAction<Meal[]>) => {
          return payload;
        }
      )
      .addCase(fetchMeals.pending, () => {
        toast({
          title: "Carregando dietas...",
          status: "loading",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(fetchMeals.rejected, () => {
        toast({
          title: "Erro.",
          description: "Erro ao carregar dietas.",
          status: "error",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(
        getMealById.fulfilled,
        (state, { payload }: PayloadAction<Meal>) => {
          state = state.filter((item) => item.id === payload.id);
        }
      )
      .addCase(getMealById.rejected, () => {
        toast({
          title: "Erro.",
          description: "Erro ao carregar a dieta.",
          status: "error",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(getMealById.pending, () => {
        toast({
          title: "Carregando a dieta...",
          status: "loading",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(
        deleteMeal.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          toast({
            title: "Sucesso!",
            description: "Dieta deletada com sucesso!",
            status: "success",
            variant: "left-accent",
            duration: 4500,
            isClosable: true,
          });
          state = state.filter((item) => item.id !== +payload);
        }
      )
      .addCase(deleteMeal.pending, () => {
        toast({
          title: "Deletando a dieta...",
          status: "loading",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(deleteMeal.rejected, () => {
        toast({
          title: "Erro.",
          description: "Erro ao deletar a dieta.",
          status: "error",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(
        editMealHandler.fulfilled,
        (state, { payload }: PayloadAction<{ editedMeal: Meal }>) => {
          const index = state.findIndex(
            (item) => item.id === payload.editedMeal.id
          );

          Object.assign(state[index], {
            date:
              payload.editedMeal.date === undefined
                ? new Date()
                : payload.editedMeal.date,
            description: payload.editedMeal.description,
            isOnDiet: payload.editedMeal.isOnDiet,
            name: payload.editedMeal.name,
          });

          toast({
            title: "Sucesso!",
            description: "Dieta editada com sucesso!",
            status: "success",
            variant: "left-accent",
            duration: 4500,
            isClosable: true,
          });
        }
      )
      .addCase(editMealHandler.pending, () => {
        toast({
          title: "Editando dieta...",
          status: "loading",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(editMealHandler.rejected, () => {
        toast({
          title: "Erro.",
          description: "Erro ao editar a dieta.",
          status: "error",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(addMeal.fulfilled, (state, { payload }: PayloadAction<Meal>) => {
        const meal = {
          description: payload.description,
          isOnDiet: payload.isOnDiet,
          name: payload.name,
          date: payload.date,
          userId: payload.userId,
          id: payload.id,
        };

        state.push(meal);

        toast({
          title: "Sucesso!",
          description: "Dieta adicionada com sucesso!",
          status: "success",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(addMeal.pending, () => {
        toast({
          title: "Adicionando a dieta...",
          status: "loading",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      })
      .addCase(addMeal.rejected, () => {
        toast({
          title: "Erro.",
          description: "Erro ao adicionar a dieta.",
          status: "error",
          variant: "left-accent",
          duration: 4500,
          isClosable: true,
        });
      });
  },
});

export const meals = mealsSlice.reducer;
