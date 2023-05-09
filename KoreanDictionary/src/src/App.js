import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Body from './layouts/Body';

function App() {
  return (
    <Container style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
      <Body />
    </Container>
  );
}

export default App;
