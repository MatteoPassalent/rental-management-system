import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";
import PropTypes from "prop-types";

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

Inventory.propTypes = {
  inventoryList: PropTypes.array,
  setFlag: PropTypes.func,
};

export default Inventory;
