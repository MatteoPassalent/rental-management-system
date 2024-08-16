import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";
import PropTypes from "prop-types";

const Maintenance = (props) => {
  return (
    <StatusBox name="Maintenance">
      <CarList
        status="maintenance"
        cars={props.maintenanceList}
        setFlag={props.setFlag}
      />
    </StatusBox>
  );
};

Maintenance.propTypes = {
  maintenanceList: PropTypes.array,
  setFlag: PropTypes.func,
};

export default Maintenance;
