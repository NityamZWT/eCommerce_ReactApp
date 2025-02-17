import { useState, useEffect } from "react";
import { TextField, InputAdornment, List, ListItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  searchType = "products",
  paramsName = "productname",
  queryText = "",
  inputColor = "black",
  borderBottomColor = "black",
  SearchIconColor = "black",
}) {
  const [query, setQuery] = useState(queryText);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTS_API}?${paramsName}=${query}`
        );
        const jsonData = await response.json();
        if (response.ok) {
          setSuggestions(jsonData.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); 
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/${searchType}?${paramsName}=${query}`);
      setSuggestions([]);
    }
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <TextField
        placeholder={searchType === "products" ? "Search products..." : "Search categories..."}
        variant="standard"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        sx={{
          input: { color: inputColor },
          "& .MuiInput-underline:before": { borderBottomColor: borderBottomColor },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" onClick={handleSearch} style={{ cursor: "pointer" }}>
              <SearchIcon sx={{ color: SearchIconColor }} />
            </InputAdornment>
          ),
        }}
      />

      {suggestions.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "40px",
            left: 0,
            width: "100%",
            zIndex: 10,
            bgcolor: "white",
            boxShadow: 3,
          }}
        >
          <List>
            {suggestions.map((product) => (
              <ListItem
                key={product.id}
                button
                onClick={() => {
                  setQuery(product.name);
                  setSuggestions([]);
                  navigate(`/${searchType}?${paramsName}=${product.name}`);
                }}
              >
                {product.name}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}
