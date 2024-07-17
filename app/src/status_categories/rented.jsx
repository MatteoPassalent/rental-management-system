import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";

const Maintenance = () => {
  return (
    <StatusBox name="Rented">
      <CarList status="rented" />
    </StatusBox>
  );
};

export default Maintenance;
