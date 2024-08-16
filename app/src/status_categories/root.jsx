import Inventory from "../status_categories/inventory";
import Maintenance from "../status_categories/maintenance";
import Rented from "../status_categories/rented";
import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const Root = () => {
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
    <>
      <Inventory inventoryList={carLists.inventory} setFlag={setFlag} />
      <Maintenance maintenanceList={carLists.maintenance} setFlag={setFlag} />
      <Rented rentedList={carLists.rented} setFlag={setFlag} />
    </>
  );
};

export default Root;
