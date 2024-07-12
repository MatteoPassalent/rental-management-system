import { AppBar } from '@mui/material';

const HeaderBar = () => {
    return (
          <AppBar position="static" 
                  sx={{
                      backgroundColor: "#546C78", 
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
          >
            Rental Car Management System
          </AppBar>
    )
}

export default HeaderBar;

// darker blue: 394B55