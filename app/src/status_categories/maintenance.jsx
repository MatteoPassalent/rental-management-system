import StatusBox from "../layout/statusBox";
import CarList from "../cars/carList";

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

export default Maintenance;
