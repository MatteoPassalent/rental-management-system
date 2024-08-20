import { Container, useMediaQuery } from "@mui/material";
import HeaderBar from "./headerBar";
import Root from "../status_categories/root";

const Layout = () => {
  const isReduced = useMediaQuery("(max-width:1270px)");
  const isMobile = useMediaQuery("(max-width:600px)");

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
            justifyContent: !isReduced && "space-between",
            alignItems: isReduced && "center",
            padding: isMobile ? "30px 10px 30px 10px" : "30px 80px 30px 80px",
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
