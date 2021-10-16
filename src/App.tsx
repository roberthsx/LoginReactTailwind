import './App.css';
import Login from './Components/Login/Login';
import useToken from './Components/App/useToken';
import Routes from './Routers/Routers'

function App() {
  const { token, setToken } = useToken();
 
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Routes />
    </div>
  );
}

export default App;