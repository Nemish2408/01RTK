import React, { useState } from "react";
import FormModal from "../Modal/FormModal";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movies Adda
            </Typography>
            <Button color="inherit" onClick={handleOpenModal}>
              Add New Movie
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <FormModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        isEdit={false}
      />
    </>
  );
};

export default Header;
