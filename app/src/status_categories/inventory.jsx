import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";
import { useEffect, useState } from "react";

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  useEffect(() => {
    const getCars = async () => {
      console.log("test");
      const response = await fetch("/test");
      // const data = await response.json();
      // setInventoryList(data);
    };
    // getCars();
  }, []);
  return (
    <StatusBox name="Inventory">
      <CarList status="inventory" cars={inventoryList} />
    </StatusBox>
  );
};

export default Inventory;
