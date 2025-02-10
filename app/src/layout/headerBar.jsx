import { AppBar } from "@mui/material";
import Example from "./example";
import { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const HeaderBar = () => {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = async (value) => {
    setKeyword(value);
    if (value === "Andrew") {
      await fetch(`${apiUrl}/add-house`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: 1000000,
          bedrooms: 5,
          streetName: "Andrew Street",
          owner: "Andrew",
        }),
      });

      const response = await fetch(`${apiUrl}/get-houses`);
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: "50px",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
        }}
      >
        Rental Car Management System {keyword}
      </AppBar>
      <Example keyword={keyword} handleKeywordChange={handleKeywordChange} />
    </>
  );
};

export default HeaderBar;
