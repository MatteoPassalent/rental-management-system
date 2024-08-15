import { Container } from "@mui/material";
import Inventory from "../status_categories/inventory";
import HeaderBar from "./headerBar";
import Maintenance from "../status_categories/maintenance";
import Rented from "../status_categories/rented";
import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const Layout = () => {
  const [carLists, setCarLists] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const getCars = async () => {
      const response = await fetch(`${apiUrl}/get-cars`);
      const data = await response.json();
      setCarLists(data);
    };
    getCars();
  }, [flag]);
  return (
    <div>
      <HeaderBar />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: "calc(100vh - 50px)",
          width: "100vw",
          backgroundColor: "#F6F8FC",
          display: "flex",
          alignItems: "center",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "30px 80px 30px 80px",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Inventory inventoryList={carLists.inventory} setFlag={setFlag} />
          <Maintenance
            maintenanceList={carLists.maintenance}
            setFlag={setFlag}
          />
          <Rented rentedList={carLists.rented} setFlag={setFlag} />
        </div>
      </Container>
    </div>
  );
};

export default Layout;
