import { useEffect, useState } from "react";
import sokalp from "../sokalp.png";
import userCss from "../user-style.css";

const StartPage = ({ handleOnTestStart }) => {
  const [testData, setTestData] = useState({});

  useEffect(() => {
    fetch("/get-test-details")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((result) => {
        setTestData(result);
      });
  }, []);

  return (
    <>
      <nav>
        <div className="nav-div">
          <img src={sokalp} alt="sokalp-logo" />
        </div>
      </nav>

      <div className="parent">
        <div className="container">
          <h1>{testData["name"]} Test</h1>
        </div>
        <div className="container">
          <div className="instruct">
            <p className="initial-heading">Instructions</p>
            <div
              dangerouslySetInnerHTML={{ __html: testData["instruction"] }}
            ></div>
          </div>
          <div className="buttons">
            <button onClick={() => handleOnTestStart(1)} className="btn btn-start-test">Start Test</button>
            <button onClick={() => window.location.href = '/logout'} className="btn btn-logout">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}


export default StartPage;