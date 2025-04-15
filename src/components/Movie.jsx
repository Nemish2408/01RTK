import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  useLazyGetMoviesQuery,
  useAddMovieMutation,
} from "../state/movies/movieApiSlice";
import MovieCard from "./Movies/MovieCard";
import {
  Box,
  Button,
  Container,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Movies = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  const [getData, { data: movies = [], isError, isLoading }] = useLazyGetMoviesQuery();

  const handleTitleChange = useCallback((e) => setTitle(e.target.value), []);
  const handleYearChange = useCallback((e) => setYear(e.target.value), []);
  const handleThumbnailChange = useCallback(
    (e) => setThumbnail(e.target.value),
    []
  );
  const handleDescriptionChange = useCallback(
    (e) => setDescription(e.target.value),
    []
  );

  const [addMovie] = useAddMovieMutation();
  // const [deleteMovie] = useDeleteMovieMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addMovie({
        endpoint: "movies",
        payload: {
          title: title,
          description: description,
          year: Number(year),
          thumbnail: thumbnail,
          id: String(Number(movies[movies.length - 1].id) + 1),
        },
        tags: ["Movie"],
      });
    } catch (err) {
      console.log(err);
    }

    console.log(movies.id);

    setTitle("");
    setThumbnail("");
    setDescription("");
    setYear("");
  };

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

  // console.log(data.length);

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

      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: "480px" }}
        >
          <FormGroup sx={{ mb: 2 }}>
            <TextField
              type="text"
              label="Title"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              fullWidth
            />
          </FormGroup>

          <FormGroup sx={{ mb: 2 }}>
            <TextField
              type="text"
              label="Year"
              id="year"
              value={year}
              onChange={handleYearChange}
              fullWidth
            />
          </FormGroup>

          <FormGroup sx={{ mb: 2 }}>
            <TextField
              type="text"
              label="Image URL"
              id="thumbnail"
              value={thumbnail}
              onChange={handleThumbnailChange}
              fullWidth
            />
          </FormGroup>

          <FormGroup sx={{ mb: 2 }}>
            <TextField
              type="text"
              label="Description"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              rows={3}
              fullWidth
            />
          </FormGroup>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add New Movie
          </Button>
        </Box>
      </Box>

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
