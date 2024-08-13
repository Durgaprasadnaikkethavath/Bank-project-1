import "./App.css";
import Registration from "./form/Registration";
import Home from "./Home";
import Login from "./form/Login";
import AccountDetails from "./form/AccountDetails";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
function App() {
  const [customer, setCustomer] = useState();
  const updateCustomer = (userData) => {
    setCustomer(userData);
    console.log(userData);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                Registration
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/account-details">
                AccountDetails
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login updateCustomer={updateCustomer} />}
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/account-details" element={<AccountDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
