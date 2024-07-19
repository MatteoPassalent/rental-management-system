import CarItem from "./carItem";
const CarList = (props) => {
  return (
    <ul style={{ width: "100%", padding: "0", margin: "0", overflowY: "auto" }}>
      {props.cars?.map((car) => (
        <CarItem
          key={car.id}
          car={car}
          status={props.status}
          setFlag={props.setFlag}
        />
      ))}
    </ul>
  );
};

export default CarList;
