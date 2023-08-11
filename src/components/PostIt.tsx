import { useEffect, useState } from "react";
import "./postIt.css";
import { format } from "date-fns";

const PostIt = () => {
  const [postIts, setPostIts] = useState([]);
  const [users, setUsers] = useState([]);
  const [oneUser, setOneUser] = useState([]);
  const userId = window.location.pathname.match(/\/user\/(\d+)/)[1];

  const handleSubmit = async (e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const content = formData.get("content");
    const destId = formData.get("dest");

    const dataToSend = {
      content: content,
      authorId: parseInt(userId),
      destId: parseInt(destId),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/newPostIt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        console.error("Response not ok:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/postIt`
        );
        const data = await response.json();
        setPostIts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/allUsers`
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`
        );
        const data = await response.json();
        setOneUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="postit">
      <h1> Bonjour {oneUser.firstname}</h1>
      <div>
        <h2>Tu veux envoyer un message c'est ici : </h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Quel est ton message :</p>
            <textarea
              maxLength={500}
              required
              name="content"
              id="content"
              placeholder="Tape ton message ici"
              onChange={() => {}}
            />
          </label>
          <label>
            <p>A qui l'envoyer :</p>
            <select name="dest" id="dest" required onChange={() => {}}>
              <option value="">--Choisi un destinataire--</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.firstname}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button onClick={() => {}} type="submit">
            <p>J'envoie</p>
          </button>
        </form>
      </div>
      <div>
        <h2>Tu veux voir tes messages c'est ici : </h2>
        <div className="messagesZone">
          {postIts.map((postIt) => (
            <div className="message" key={postIt.id}>
              <div className="headerMsg">
                <p className="author">
                  De la part de : {postIt.author.name} {postIt.author.firstname}
                </p>

                <p className="author">
                  Créé le :
                  {format(new Date(postIt.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </p>
              </div>
              <p className="msg">{postIt.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostIt;
