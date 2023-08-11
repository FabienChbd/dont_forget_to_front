import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const navigate = useNavigate();

  const processResponse = async (data) => {
    if (data.exists) {
      setLoggedIn(true);
      setUserId(data.userId);
      console.log(`URL to navigate: /user/${data.userId}/postIt`);
      navigate(`/user/${data.userId}/postIt`);
    } else {
      setError("Username not found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/${login}`
      );
      const data = await response.json();
      await processResponse(data);
    } catch (error) {
      console.error(error);
    }
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
          value={login}
          placeholder="PrénomNom"
          onChange={(e) => setLogin(e.target.value)}
        />
      </label>
      <button className="btnLogin" type="submit">
        Go
      </button>
    </form>
  );
};

export default Login;
