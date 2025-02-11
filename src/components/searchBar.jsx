import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
    if (onSearch) onSearch(event.target.value); 
  };

  return (
    <TextField
    placeholder="product name "
    variant="standard"
    // fullWidth
    value={query}
    onChange={handleSearch}
    sx={{
      input: { color: "white" }, // Text color inside input
      "& .MuiInput-underline:before": { borderBottomColor: "white" }, // Default underline color
      "& .MuiInput-underline:hover:before": { borderBottomColor: "lightgray" }, // Hover color
      "& .MuiInput-underline:after": { borderBottomColor: "white" }, // Focus color
    }}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "white" }} />
          </InputAdornment>
        ),
      },
    }}
  />

  );
}
