import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//I created a movieApiSlice using the createApi function from RTK Query, which takes in an object as a parameter.
export const moviesApiSlice = createApi({  
    reducerPath: "movies",              //The reducerPath property specifies the path of the API slice.
    baseQuery: fetchBaseQuery({         // The baseQuery uses the fetchBaseQuery.    // The fetchBaseQuery function takes in an object as a parameter, which has a baseURL property. The baseURL property specifies the root URL of our API.
        baseUrl: "http://localhost:3000", //I am using http://localhost:3000, which is the URL of the JSON server.
    }),
    tagTypes: ['Movie'],

    //The endpoints property is what your API interacts with. It's a function that takes in a builder parameter and returns an object with methods (getMovies, addMovie, updateMovie, and deleteMovie) for interacting with your API.
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: ({endpoint}) => endpoint,
            providesTags: (_,__, {tags =[]}) => tags,
        }),
        
        addMovie: builder.mutation({
            query: ({endpoint, payload}) => ({
                url: endpoint,
                method: "POST",  //methods POST this is a specify this POST request.
                body: payload,  // body contains the data to be sent to the server
            }),
      
            invalidatesTags: (_,__,{ tags = [] }) => tags
        }),
        
        updateMovie: builder.mutation({
            query: ({endpoint, payload}) => (
                // const { id, ...body } = payLoad; 
                // Destructure to separate ID from update data
                 {
                    url: endpoint,   //// Need ID in URL
                    method: "PUT",
                    body:payload             //// The update data
                }),
                invalidatesTags: (_,__,{ tags = [] }) => tags
        }),

        deleteMovie: builder.mutation({
            query: ({ endpoint}) => ({
                url: endpoint,
                method: "DELETE",
                     //some APIs want ID in body too
            }),
            invalidatesTags: (_,__,{ tags = [] }) => tags
        }),
    }),
});

//I am exporting custom hooks generated automatically by RTK Query. The custom hook starts with "use" and ends with "query" and is named based on the methods defined in the endpoints property.
export const {
    useLazyGetMoviesQuery,
    useAddMovieMutation,
    useDeleteMovieMutation,
    useUpdateMovieMutation,
} = moviesApiSlice;