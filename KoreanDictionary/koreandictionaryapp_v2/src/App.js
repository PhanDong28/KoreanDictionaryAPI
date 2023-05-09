import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Body from './layouts/Body';
import Background from '../src/images/background.png'

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'repeat-y',
    backgroundOrigin: 'content-box',
    backgroundAttachment: 'fixed',
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column' ,
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    color: 'white', 
    backgroundColor: '#fff' 
  };

  return (
    <div style={backgroundStyle}>
      <div style={{ color: '#947aae', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', margin: '50px 0',
          fontFamily: 'Sigmar, cursive' }}>
        <h1 style={{ wordSpacing: '10px' }}>TỪ ĐIỂN HÁN HÀN</h1>
        <h4>Dành Cho Người Việt Nam</h4>
      </div>

      <Body />
    </div>
  );
}

export default App;
