import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AllProducts from './components/AllProducts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <div>
      {/* <Login /> */}
      <Navbar />
      <ProtectedRoute path="/" component={<AllProducts />} />
    </div>
  );
}

export default App;
