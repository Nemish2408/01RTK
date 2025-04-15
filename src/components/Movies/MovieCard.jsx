import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import EditModal from '../Modal/EditModal';
import { useDeleteMovieMutation } from '../../state/movies/movieApiSlice';
import defaultImg from '../../assets/imagenotfound.jpg';

const MovieCard = ({ movie }) => {

    const [open, setOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(movie);

    const [deleteMovie] = useDeleteMovieMutation();


    const handleClickOpen = () => {
        setSelectedMovie(movie);
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteMovie = async (id) => {
        try {
            if (confirm("are you sure you want to delete movie?")) {
                await deleteMovie({
                    endpoint: `/movies/${id}`,
                    tags: ["Movie"]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(selectedMovie);

    return (
        <Card sx={{ height: "700px", width: "350px" }}>
            <CardMedia>
                <img src={movie.thumbnail ||  } alt={`${movie.title} poster`} style={{ width: "fit-content", height: "500px", display: 'flex', justifyContent: 'center', alignItems: 'center' }} />

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
                <Button size="small" onClick={handleClickOpen}>Edit</Button>
                <Button size="small" onClick={() => handleDeleteMovie(movie.id)}>Delete</Button>
            </CardActions>
            <EditModal handleClickOpen={handleClickOpen} handleClose={handleClose} selectedMovie={selectedMovie} open={open} />
        </Card>
    );
}

export default MovieCard
