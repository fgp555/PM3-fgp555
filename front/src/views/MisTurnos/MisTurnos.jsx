import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/store";
import { fetchUserData, cancelTurn, createTurn } from "../../services/apiService";
import TurnCard from "../TurnCard/TurnCard"; // Make sure to adjust the path according to your project structure
import "./MisTurnos.css";

const Turns = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const getState = useSelector((state) => state.turns.turnsIds) ?? []; // Provide a default empty array if getState is undefined
  const userID = user?.user?.id;

  const [turnData, setTurnData] = useState({
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    if (userID) {
      fetchUserData(userID).then((data) => {
        dispatch(fetchData(data));
      });
    }
  }, [dispatch, userID]);

  const handleGetData = () => {
    if (userID) {
      fetchUserData(userID).then((data) => {
        dispatch(fetchData(data));
      });
    }
  };

  const handleCancel = (turnId) => {
    cancelTurn(turnId)
      .then((res) => {
        console.log(res);
        handleGetData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (userID) {
      createTurn({ ...turnData, userId: userID })
        .then((res) => {
          console.log(res);
          handleGetData();
          setTurnData({ date: "", time: "", description: "" }); // Clear the form
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTurnData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Total Turns: {getState.length}</h2>
      <form onSubmit={handleCreate}>
        <input type="date" name="date" value={turnData.date} onChange={handleChange} required />
        <input type="time" name="time" value={turnData.time} onChange={handleChange} required />
        <input type="text" name="description" value={turnData.description} onChange={handleChange} placeholder="Description" required />
        <button type="submit">Create Turn</button>
      </form>
      <br />
      <br />
      {getState && getState.map((turn) => <TurnCard key={turn.id} turn={turn} onCancel={handleCancel} />)}
    </div>
  );
};

export default Turns;
