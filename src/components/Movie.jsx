import React, { useEffect } from "react";
import { useLazyGetMoviesQuery } from "../state/movies/movieApiSlice";
import MovieCard from "./Movies/MovieCard";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const Movies = () => {
  const [getData, { data: movies = [], isError, isLoading }] = useLazyGetMoviesQuery();

  const handleGetData = async () => {
    try {
      await getData({
        endpoint: `/movies`,
        tags: ["Movie"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Movies to Watch
      </Typography>

      <Box sx={{ flexGrow: 1, px: 2 }}>
        <Grid container spacing={3}>
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                No movies available. Add your first movie!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Movies;