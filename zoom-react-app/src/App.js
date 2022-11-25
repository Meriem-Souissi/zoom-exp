import React, { useEffect, useState } from "react";
import "./App.css";
import ZoomMeeting from "./components/ZoomMeeting";

function App() {
  const [data, setData] = useState(null);
  var signatureEndpoint = "http://localhost:3005/zoomapi/createMeeting";
  const joinClass = () => {
    fetch(signatureEndpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // useEffect(() => {
  //   joinClass();
  // }, []);

  return (
    <>
      {data ? (
        <ZoomMeeting data={data} />
      ) : (
        <div className="zoom-container">
          <main>
            <h1> Welcome to your Zoom Meeting </h1>
            <button onClick={() => joinClass()}>Welcome</button>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
