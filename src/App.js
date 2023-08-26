import logo from './logo.svg';
import './App.css';
import PdfView from './Screens/PdfView';
import HomeScreen from './Screens/HomeScreen';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import WelcomeScreen from './Screens/WelcomeScreen';

function App() {
  return (
    <div style={styles.rootContaner}>
      <Routes>
        <Route path="/Home" element={<HomeScreen />} />
        <Route path="/" element={<WelcomeScreen />} />
        {/* <Route path="/" element={<HomeScreen />} /> */}
        
      </Routes>
    </div>
  );
}

const styles = {
  rootContaner: {
    display: 'flex',
    flex: 1
  }
}

export default App;
