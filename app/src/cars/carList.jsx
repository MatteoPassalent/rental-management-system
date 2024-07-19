import CarItem from "./carItem";
const CarList = (props) => {
  return (
    <ul style={{ width: "100%", padding: "0", margin: "0", overflowY: "auto" }}>
      {props.cars.map((car) => (
        <carItem car={car} status={props.status} />
      ))}
      {/* <CarItem status={props.status} />
      <CarItem status={props.status} /> */}
    </ul>
  );
};

export default CarList;
