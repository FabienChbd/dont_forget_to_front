import React, { useEffect, useState } from "react";
import "./postIt.css";

const PostIt = () => {
  // const [postIts, setPostIts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BACKEND_URL}/user/:id/postIt`,
  //       );
  //       const data = await response.json();
  //       setPostIts(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="postit">
      <h1> Bonjour User </h1>
      {/* ici fetch sur l'user en fonction de l'Id pour nom/prénom */}
      <div>
        <h2>Tu veux envoyer un message c'est ici : </h2>
        <form>
          <label>
            <p>Quel est ton message :</p>
            <textarea
              maxLength={500}
              required
              name="message"
              id="message"
              placeholder="Tape ton message ici"
              onChange={() => {}}
            />
          </label>
          <label>
            <p>A qui l'envoyer :</p>
            <select
              name="destinataire"
              id="destinataire"
              required
              onChange={() => {}}
            >
              <option value="">--Choisi un destinataire--</option>
              <option value="member 1">Member 1</option>
              <option value="member 2">member 2</option>
              {/* mettre le fetch des user ici */}
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
          <div className="message">
            <p className="author">
              De la part de : <strong>Auteur</strong>
            </p>
            <p className="msg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint,
              aut. Perferendis molestiae velit mollitia minima, maiores odit
              praesentium quos voluptatem, ipsam doloribus quod? Iste, laborum
              accusamus recusandae debitis ut tempore.
            </p>
          </div>
          {/* {postIts.map((postIt) => (
              <div className="message" key={postIt.id}>
                <p className="author">
                  De la part de : {postIt.author.name} {postIt.author.firstName}
                </p>
                <p className="msg">{postIt.content}</p>
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default PostIt;
