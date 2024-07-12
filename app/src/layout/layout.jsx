import { Container } from '@mui/material';
import StatusBox  from './statusBox';
import HeaderBar from './headerBar';

const Layout = () => {
    return (
        <div>
            <HeaderBar />
            <Container 
              maxWidth="xl" 
              sx={{
                  height: 'calc(100vh - 50px)', 
                  width: '100vw', 
                  backgroundColor: '#F4F4F4',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 5,
              }} 
          >
              <div style={{display: "flex", 
                          justifyContent: "space-between",
                          padding: "60px", 
                          width: "100%", 
                          height: "100%", 
                          }}
              >
                  <StatusBox />
                  <StatusBox />
                  <StatusBox />
              </div>
          </Container>
        </div>
    )
}



export default Layout;
