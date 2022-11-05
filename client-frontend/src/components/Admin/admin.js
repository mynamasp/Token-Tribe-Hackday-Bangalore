import React, { useState } from "react";

const Admin = () => {
  const [activeSelection, setActiveState] = useState(true);
  const data = [
    { bounty: "20", submission: "5" },
    { bounty: "23", submission: "5" },
    { bounty: "10", submission: "5" },
    { bounty: "25", submission: "5" },
  ];

  return (
    <>
      <div
        style={{
          paddingTop: "5rem",
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            style={{
              width: "30rem",
            }}
            src={require("../../images/round-ball.png")}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              top: 0,
              bottom: 0,
              padding: "8rem 5rem",
              width: "100%",
              textAlign: "center",
              justifyContent: "space-between",
              borderRadius: "100%",
              fontWeight: "bold",
            }}
          >
            <h1
              style={{
                fontSize: "1.7rem",
              }}
            >
              Making Your Community Active is now easier with{" "}
            </h1>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "800",
              }}
            >
              Token Tribe
            </p>
            <span
              style={{
                cursor: "pointer",
                display: "inline",
              }}
            >
              <p
                style={{
                  backgroundColor: "#FF00E5",
                  display: "inline",
                  padding: "1rem 2rem",
                  borderRadius: "10rem",
                }}
              >
                Buy $Tribe Token
              </p>
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "2px solid #FF00E5",
            borderRadius: "8rem",
            display: "flex",
          }}
        >
          <div
            style={
              activeSelection
                ? {
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: "8rem",
                  }
                : {
                    backgroundColor: "#FF00E5",
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: "8rem",
                  }
            }
            onClick={() => setActiveState(!activeSelection)}
          >
            Active Tasks
          </div>
          <div
            style={
              activeSelection
                ? {
                    backgroundColor: "#FF00E5",
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: "8rem",
                  }
                : {
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: "8rem",
                  }
            }
            onClick={() => setActiveState(!activeSelection)}
          >
            Setup
          </div>
        </div>
      </div>
      <div style={{ margin: "2rem auto", width: "50rem" }}>
        {data?.map((item, index) => (
          <Cards key={index} {...item} />
        ))}
      </div>
    </>
  );
};

export default Admin;

const Cards = ({ submission, bounty }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        border: "4px solid #FF00E5",
        padding: "2rem 1rem",
        borderRadius: ".5rem",
        margin: "1rem 0",
      }}
    >
      <p>
        Duis et consectetur non ipsum sint esse pariatur excepteur. Culpa
        officia amet quis aute ea sunt enim elit consectetur officia pariatur
        aliquip. Ad mollit ad pariatur est incididunt Lorem consequat ut
        adipisicing. Incididunt voluptate Lorem ad ipsum aliqua eiusmod mollit
        esse eiusmod. Officia qui ex id voluptate duis Lorem ex minim laborum
        officia. Eiusmod amet commodo esse Lorem et amet irure minim ea officia
        esse.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <div style={{ display: "flex" }}>
          <p style={{ margin: "0 .2rem" }}>
            <span
              style={{
                fontWeight: "800",
              }}
            >
              Bounty:
            </span>{" "}
            {bounty}
          </p>
          <p style={{ margin: "0 .2rem" }}>
            <span
              style={{
                fontWeight: "800",
              }}
            >
              Submissions:
            </span>{" "}
            {submission}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#DF1E1E",
            display: "inline",
            padding: ".4rem .9rem",
            borderRadius: "5rem",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Stop
        </div>
      </div>
    </div>
  );
};
