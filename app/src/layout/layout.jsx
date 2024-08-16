import { Container } from "@mui/material";
import HeaderBar from "./headerBar";
import Root from "../status_categories/root";

const Layout = () => {
  return (
    <div>
      <HeaderBar />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: "calc(100vh - 50px)",
          width: "100vw",
          backgroundColor: "#F6F8FC",
          display: "flex",
          alignItems: "center",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "30px 80px 30px 80px",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Root />
        </div>
      </Container>
    </div>
  );
};

export default Layout;
