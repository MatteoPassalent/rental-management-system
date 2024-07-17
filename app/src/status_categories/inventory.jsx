import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";

const Inventory = () => {
  return (
    <StatusBox name="Inventory">
      <CarList status="inventory" />
    </StatusBox>
  );
};

export default Inventory;
