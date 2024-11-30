import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";

const categories = [
  { name: "Network", color: "linear-gradient(45deg, #2196F3, #21CBF3)" },
  { name: "Security", color: "linear-gradient(45deg, #FFC107, #FF9800)" },
  { name: "DNS", color: "linear-gradient(45deg, #9C27B0, #E040FB)" },
  { name: "Info", color: "linear-gradient(45deg, #4CAF50, #8BC34A)" },
];

function HomePage() {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/category/${name.toLowerCase()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Network Utilities
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
          >
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: category.color,
                color: "#fff",
                borderRadius: 2,
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h5">{category.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
