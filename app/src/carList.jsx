import CarItem from "./carItem";
const CarList = () => {
  return (
    <ul style={{ width: "100%", padding: "0", margin: "0", overflowY: "auto" }}>
      <CarItem />
      <CarItem />
    </ul>
  );
};

export default CarList;
