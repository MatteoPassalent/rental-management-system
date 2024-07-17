import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";

const Maintenance = () => {
  return (
    <StatusBox name="Maintenance">
      <CarList status="maintenance" />
    </StatusBox>
  );
};

export default Maintenance;
