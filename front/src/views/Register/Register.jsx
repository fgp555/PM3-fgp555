import { useState, useEffect } from "react";
import axios from "axios";
import validateRegister from "../../helpers/validateRegister";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apiService"; // Import the registerUser function

const Register = () => {
  const navigate = useNavigate();

  const [userDataState, setUserDataState] = useState({
    name: "",
    username: "",
    email: "",
    birthdate: "",
    nDni: "",
    password: "",
  });

  const [stateErrors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    birthdate: "",
    nDni: "",
    password: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDataState({ ...userDataState, [name]: value });
  };

  useEffect(() => {
    const errors = validateRegister(userDataState);
    setErrors(errors);

    const isValid = Object.values(errors).every((error) => error === "");
    const allFieldsFilled = Object.values(userDataState).every((value) => value.trim() !== "");

    setFormValid(isValid && allFieldsFilled);
  }, [userDataState]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const errors = validateRegister(userDataState);
    setErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        // Call the registerUser function from apiService.js
        const response = await registerUser(userDataState);
        console.log(response);
        setSubmitMessage("Registration successful");
        // navigate("/login");
      } catch (error) {
        console.error("Error:", error);
        setSubmitMessage("Registration failed");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} id="registerUserForm" className="registerUserForm">
        <h2>Register</h2>
        <hr />
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={userDataState.name} onChange={handleInputChange} />
          {stateErrors.name && <p className="error">{stateErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={userDataState.username} onChange={handleInputChange} />
          {stateErrors.username && <p className="error">{stateErrors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={userDataState.email} onChange={handleInputChange} />
          {stateErrors.email && <p className="error">{stateErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" name="birthdate" value={userDataState.birthdate} onChange={handleInputChange} />
          {stateErrors.birthdate && <p className="error">{stateErrors.birthdate}</p>}
        </div>
        <div>
          <label htmlFor="nDni">nDni:</label>
          <input type="number" id="nDni" name="nDni" value={userDataState.nDni} onChange={handleInputChange} />
          {stateErrors.nDni && <p className="error">{stateErrors.nDni}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={userDataState.password} onChange={handleInputChange} />
          {stateErrors.password && <p className="error">{stateErrors.password}</p>}
        </div>
        <button type="submit" disabled={!formValid}>
          Register
        </button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
};

export default Register;
