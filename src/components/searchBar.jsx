import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ searchType = "products",paramsName='productname', queryText, inputColor, borderBottomColor, SearchIconColor }) {
  const [query, setQuery] = useState(queryText);
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      navigate(`/${searchType}?${paramsName}=${query}`); 
    }
  };

  return (
    <TextField
      placeholder={searchType=="products"?"Search products...":"Search categories..."}
      variant="standard"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown} 
      sx={{
        input: { color: inputColor },
        "& .MuiInput-underline:before": { borderBottomColor: borderBottomColor },
      }}
      InputProps ={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: SearchIconColor }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
