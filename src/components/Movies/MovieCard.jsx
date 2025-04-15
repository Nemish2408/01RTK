import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDeleteMovieMutation } from "../../state/movies/movieApiSlice";
import defaultImg from "../../assets/imagenotfound.jpg";
import FormModal from "../Modal/FormModal";

const MovieCard = ({ movie }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const [selectedMovie, setSelectedMovie] = useState(movie);

  const [deleteMovie] = useDeleteMovieMutation();

  const handleDeleteMovie = async (id) => {
    try {
      if (confirm("are you sure you want to delete movie?")) {
        await deleteMovie({
          endpoint: `/movies/${id}`,
          tags: ["Movie"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedMovie);

  return (
    <Card sx={{ height: "700px", width: "350px" }}>
      <CardMedia>
        <img
          src={movie.thumbnail || defaultImg}
          alt={`${movie.title} poster`}
          style={{
            width: "fit-content",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ({movie.year})
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenEditModal}>
          Edit
        </Button>
        <Button size="small" onClick={() => handleDeleteMovie(movie.id)}>
          Delete me
        </Button>
      </CardActions>
      <FormModal
        isOpen={isEditModalOpen}
        closeModal={handleCloseEditModal}
        isEdit={true}
        movie={movie}
      />
    </Card>
  );
};

export default MovieCard;
