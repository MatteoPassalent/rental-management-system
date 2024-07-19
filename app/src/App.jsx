import Layout from "./layout/layout";
function App() {
  fetch("/test");
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
