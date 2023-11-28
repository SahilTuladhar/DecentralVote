import { React, useState, useEffect } from "react";
import useInput from "../../../hooks/use-input";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredUsername,
    valueIsInvalid: usernameIsInvalid,
    valueIsValid: usernameIsValid,
    valueInputHandler: usernameInputHandler,
    valueBlurHandler: usernameBlurHandler,
    reset: usernameReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredPassword,
    valueIsValid: passwordIsValid,
    valueIsInvalid: passwordIsInvalid,
    valueInputHandler: passwordInputHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => {
    return value && value.length >= 8;
  });

  const {
    value: enteredVoterId,
    valueIsValid: voterIdIsValid,
    valueIsInvalid: voterIdIsInvalid,
    valueInputHandler: voterIdInputHandler,
    valueBlurHandler: voterIdBlurHandler,
    reset: voterIdReset,
  } = useInput((value) => {
    return value && value.length >= 8;
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const userData = {
      username: enteredUsername,
      voterID: enteredVoterId,
      password: enteredPassword,
    };

    console.log(userData);

    usernameReset();
    passwordReset();
    voterIdReset();
  };

  useEffect(() => {
    if (usernameIsValid && passwordIsValid && voterIdIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [usernameIsValid, passwordIsValid, voterIdIsValid]);

  return (
    <div
      className={`${styles["signInContainer"]} ${
        props.value === "signUp" ? styles.rightPanelActive : ""
      }`}
    >
      <h3>Decentral Vote</h3>
      <p>Vote responsibly</p>
      <h4>Welcome To Decentral Vote!!</h4>
      <h5>Please Sign-In to your account</h5>

      <form onSubmit={onSubmitHandler}>
        <div
          className={`${styles["formInputs"]} ${
            usernameIsInvalid || passwordIsInvalid || voterIdIsInvalid
              ? styles.invalid
              : ""
          }`}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={usernameInputHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />

          {usernameIsInvalid && <p>Username is Incorrect</p>}

          <label htmlFor="VoterId">Voter ID</label>
          <input
            type="text"
            id="VoterId"
            onChange={voterIdInputHandler}
            onBlur={voterIdBlurHandler}
            value={enteredVoterId}
          />

          {voterIdIsInvalid && <p>Please enter correct Voter ID</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordInputHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />

          {passwordIsInvalid && <p>Password is Incorrect</p>}
        </div>
        <div className={styles.formActions}>
          <button className={styles.signInButton} disabled={!formIsValid}>
            <Link to="/landing-page">sign in</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
