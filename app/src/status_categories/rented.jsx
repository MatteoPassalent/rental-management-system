import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";
import PropTypes from "prop-types";

const Rented = (props) => {
  return (
    <StatusBox name="Rented">
      <CarList
        status="rented"
        cars={props.rentedList}
        setFlag={props.setFlag}
      />
    </StatusBox>
  );
};

Rented.propTypes = {
  rentedList: PropTypes.array,
  setFlag: PropTypes.func,
};

export default Rented;
