import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    pizzas: [],
    topRestaurants: [],
    error: null,

}

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        getPizzas: (state) => {
            state.loading = true;
        },
        getPizzasSuccess: (state, action) => {
            state.loading = false;
            state.pizzas = action.payload;
        },
        getPizzasFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getTopRestaurant: (state) => {
            state.loading = false
        },
        getTopRestaurantSuccess: (state, action) => {
            state.loading = false
            state.topRestaurants = action.payload
        },
        getTopRestaurantFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }

})

export const { getPizzas, getPizzasFailure, getPizzasSuccess ,getTopRestaurant,getTopRestaurantFailure,getTopRestaurantSuccess} = pizzaSlice.actions
export default pizzaSlice.reducer