import { configureStore } from '@reduxjs/toolkit'
import { moviesApiSlice } from './movies/movieApiSlice'
// import moviesReducer from './movies/movieSlice'

// I am setting up a Redux store using the configureStore function from Redux Toolkit.
const store = configureStore({
    //The reducer property specifies a reducer for updating the state in the Redux store. 
    reducer: {
        // movies: moviesReducer,
        [moviesApiSlice.reducerPath]: moviesApiSlice.reducer, //The moviesApiSlice.reducer is the reducer for updating the state of my API.
    },
//I am creating a middleware for handling asynchronous state updates.  This is required for all the caching functionality and all the other benefits that RTK Query provides.
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(moviesApiSlice.middleware)
    }
})
export default store

