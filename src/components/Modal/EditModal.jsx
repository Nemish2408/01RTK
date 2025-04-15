import React, { useState } from 'react'
import { useUpdateMovieMutation } from '../../state/movies/movieApiSlice'
import { Button, Dialog, DialogTitle, FormGroup, TextField } from '@mui/material'

const EditModal = ({ open, handleClose, selectedMovie }) => {
    
    const [title, setTitle] = useState(selectedMovie.title)
    const [year, setYear] = useState(selectedMovie.year)
    const [description, setDescription] = useState(selectedMovie.description)
    const [thumbnail, setThumbnail] = useState(selectedMovie.thumbnail)
    const [updateMovie] = useUpdateMovieMutation();
    
    const handleUpdateMovie = async (e) => {
        e.preventDefault();
        try {
            await updateMovie({
                endpoint: `movies/${selectedMovie.id}`,
                payload: { title, description, year: Number(year), thumbnail, id: selectedMovie.id },
                tags: ["Movie"],
            });
            handleClose();
        } catch (error) {
            alert(`${error} occured`)
        }
    }

    return (
        <Dialog
            open={open}
        >
            <DialogTitle>Update Movie</DialogTitle>
            <form onSubmit={handleUpdateMovie} style={{ width: "360px", padding: "20px 20px" }}>
                <FormGroup>
                    <TextField
                        type="text"
                        label='Title:'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <br />
                <FormGroup>
                    <TextField
                        type="text"
                        label='Year:'
                        id='year'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </FormGroup>
                <br />
                <FormGroup>
                    <TextField
                        type="text"
                        label='Image URl:'
                        id='thumbnail'
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                    />
                </FormGroup>
                <br />
                <FormGroup>
                    <TextField
                        type="text"
                        label='Description:'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></TextField>
                </FormGroup>
                <br />
                <Button type='submit' variant='contained'>Save</Button>
                <Button className='close-btn' onClick={handleClose} variant='contained' color='error'>Close</Button>
            </form>
        </Dialog>

    );

}

export default EditModal
