import { useEffect, useState } from "react";
import "./login.css";

const Login = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
    console.log("c'est ok");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Quel est ton login :</p>
        <input
          required
          type="text"
          name="loginform"
          id="loginform"
          placeholder="PrénomNom"
          onChange={() => {}}
        />
      </label>
      <button className="btnLogin" onClick={() => {}} type="submit">
        Go
      </button>
      {/* Prévoir le fetch des user pour voir si le user est inscrit */}
    </form>
  );
};

export default Login;
