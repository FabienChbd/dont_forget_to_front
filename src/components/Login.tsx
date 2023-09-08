import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const navigate = useNavigate();

  const processResponse = async (data: {
    exists: boolean;
    userId: SetStateAction<number | null>;
  }) => {
    if (data.exists) {
      console.log(`URL to navigate: /user/${data.userId}/postIt`);
      navigate(`/user/${data.userId}/postIt`);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
