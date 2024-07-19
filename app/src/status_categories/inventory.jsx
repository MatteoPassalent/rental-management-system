import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";

const Inventory = (props) => {
  return (
    <StatusBox name="Inventory">
      <CarList
        status="inventory"
        cars={props.inventoryList}
        setFlag={props.setFlag}
      />
    </StatusBox>
  );
};

export default Inventory;
