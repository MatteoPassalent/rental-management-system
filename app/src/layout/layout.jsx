import { Container } from "@mui/material";
import HeaderBar from "./headerBar";
import Root from "../status_categories/root";
import { useMediaQuery } from "@mui/material";

const Layout = () => {
  const isReduced = useMediaQuery("(max-width:1270px)");
  return (
    <div>
      <HeaderBar />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: "calc(100vh - 50px)",
          backgroundColor: "#F6F8FC",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isReduced ? "column" : "row",
            justifyContent: isReduced ? "right" : "space-between",
            padding: "30px 80px 30px 80px",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            overflowY: "scroll",
          }}
        >
          <Root />
        </div>
      </Container>
    </div>
  );
};

export default Layout;
