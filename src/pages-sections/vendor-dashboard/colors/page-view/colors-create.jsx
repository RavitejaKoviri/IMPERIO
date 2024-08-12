"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // CUSTOM DATA MODEL

import ColorsForm from "../colors-form";

const CreateColorsPageView = () => {
  const INITIAL_VALUES = {
    name: "",
    featured: false
  };

  const handleFormSubmit = () => {};

  return <Box py={4}>
      <H3 mb={2}>Create New Color</H3>

      <ColorsForm initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} />
    </Box>;
};

export default CreateColorsPageView;