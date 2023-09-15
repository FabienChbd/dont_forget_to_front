import { useEffect, useState } from "react";
import "./postIt.css";
import { format } from "date-fns";

type User = { firstname: string; id: number; name: string };

const PostIt = () => {
  const [postIts, setPostIts] = useState<
    {
      id: number;
      content: string;
      author: User;
      createdAt: Date;
    }[]
  >([]);
  const [users, setUsers] = useState<User[]>([]);
  const [oneUser, setOneUser] = useState<User>();
  const userId = window.location.pathname.match(/\/user\/(\d+)/)?.[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/postIt`
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
          `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`
        );

        const data = await response.json();
        setOneUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  if (!userId) return <p>Un problème est survenu</p>;
  if (!oneUser) return <p> </p>;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content");
    const destId = formData.get("dest")?.toString() || "";

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
        alert("Un problème à eu lieu lors de l'envoi");
      } else {
        alert("C'est envoyé !!!");
      }
    } catch (error) {
      alert("Un problème à eu lieu lors de l'envoi");
    }
  };

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
                  {user.firstname} {user.name}
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
                  De la part de : {postIt.author.firstname} {postIt.author.name}
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
