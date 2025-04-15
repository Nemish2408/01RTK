import {
  Button,
  Dialog,
  DialogTitle,
  FormGroup,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import {
  useAddMovieMutation,
  useLazyGetMoviesQuery,
  useUpdateMovieMutation,
} from "../../state/movies/movieApiSlice";

const FormModal = ({
  movie = null,
  isEdit = false,
  isOpen = false,
  closeModal,
}) => {
  const [movieData, setMovieData] = useState({
    id: null,
    title: "",
    thumbnail: "",
    year: "",
    description: "",
  });

  // Initialize form data when movie or isEdit prop changes
  useEffect(() => {
    if (isEdit && movie) {
      setMovieData({
        id: movie.id || null,
        title: movie.title || "",
        thumbnail: movie.thumbnail || "",
        year: movie.year || "",
        description: movie.description || "",
      });
    } else {
      setMovieData({
        id: null,
        title: "",
        thumbnail: "",
        year: "",
        description: "",
      });
    }
  }, [isEdit, movie]);

  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();
  const [getData, { data: movies = [] }] = useLazyGetMoviesQuery();

  // Handle input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setMovieData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Fetch movies data when component mounts
  useEffect(() => {
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

    handleGetData();
  }, [getData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateMovie({
          endpoint: `movies/${movieData.id}`,
          payload: {
            title: movieData.title,
            description: movieData.description,
            year: Number(movieData.year),
            thumbnail: movieData.thumbnail,
            id: movieData.id,
          },
          tags: ["Movie"],
        });
      } else {
        // For adding new movie, generate a new ID
        const newId =
          movies.length > 0
            ? String(Number(movies[movies.length - 1].id) + 1)
            : "1";

        await addMovie({
          endpoint: "movies",
          payload: {
            title: movieData.title,
            description: movieData.description,
            year: Number(movieData.year),
            thumbnail: movieData.thumbnail,
            id: newId,
          },
          tags: ["Movie"],
        });
      }

      // Reset form and close modal
      setMovieData({
        id: null,
        title: "",
        thumbnail: "",
        year: "",
        description: "",
      });

      closeModal();
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Dialog open={isOpen}>
      {/* Custom Dialog Title with Close Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px 8px 24px",
        }}
      >
        <Typography variant="h6">
          {isEdit ? "Update Movie" : "Add New Movie"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <form
        onSubmit={handleSubmit}
        style={{ width: "480px", padding: "20px 20px" }}
      >
        <FormGroup>
          <TextField
            type="text"
            label="Title:"
            id="title"
            value={movieData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            type="text"
            label="Year:"
            id="year"
            value={movieData.year}
            onChange={handleChange}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            type="text"
            label="Image URL:"
            id="thumbnail"
            value={movieData.thumbnail}
            onChange={handleChange}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            type="text"
            label="Description:"
            id="description"
            value={movieData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </FormGroup>
        <br />
        <Button type="submit" variant="contained" fullWidth>
          {isEdit ? "Update" : "Add"} Movie
        </Button>
      </form>
    </Dialog>
  );
};

export default FormModal;
