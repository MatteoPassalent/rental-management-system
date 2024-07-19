import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";

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

export default Rented;
