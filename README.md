# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


import { useUpdateMovieMutation } from "../../state/movies/moviesApiSlice";
import "./modal.css";
import { useState } from "react";

function EditModal({ dialogRef, selectedMovie, closeDialog }) {
  const [title, setTitle] = useState(selectedMovie.title);
  const [year, setYear] = useState(selectedMovie.year);
  const [description, setDescription] = useState(selectedMovie.description);
  const [thumbnail, setThumbnail] = useState(selectedMovie.thumbnail);

  const [updateMovie] = useUpdateMovieMutation();

  async function handleUpdateMovie(e) {
    e.preventDefault();
    try {
      await updateMovie({title, description, year: Number(year), thumbnail, id: selectedMovie.id});
      closeDialog();
    } catch (error) {
      alert(`${error} occurred`);
    }
  }

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <form onSubmit={handleUpdateMovie}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year of release:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Image URL:</label>
          <input
            type="text"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
      <button className="close-btn" onClick={closeDialog}>
        Close
      </button>
    </dialog>
  );
}

export default EditModal;

   providesTags: (_, __, { tags: [] }) => tags,




  const handleGetData = async () => {
    try {
      // get Data
      getData({
        enpoint: "",
        query: {
          user_id: 1,
          person_id: 1,
        },
        payload: payload,
        tags: [],
        toastify: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (id) {
      handleGetData();
    }
  }, [id]);




  const [getData, { data, isLoading, isError }] = useGetUserQuery();