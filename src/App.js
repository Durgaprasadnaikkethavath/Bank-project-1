import "./App.css";
import Registration from "./form/Registration";
// import Home from "./Home";
function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>Home</li>

          <li>Login</li>

          <li>Resister</li>
        </ul>
      </nav>
      <Registration />
    </div>
  );
}

export default App;
