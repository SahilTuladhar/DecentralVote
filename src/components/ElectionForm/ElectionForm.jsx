import React, { useCallback, useState } from "react";
import useInput from "../../hooks/use-input";
import Navbar from "../../ui/Navbar/Navbar";
import styles from "./ElectionForm.module.css";
import TimezoneSelect from "react-timezone-select";
import { Link, useNavigate } from "react-router-dom";

const ElectionForm = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const history = useNavigate();

  const [error, setError] = useState(null);
  const [elections, setElections] = useState([]);

  const {
    value: enteredTitle,
    valueIsValid: titleIsValid,
    valueIsInvalid: titleIsInvalid,
    valueInputHandler: titleInputHandler,
    valueBlurHandler: titleBlurHandler,
    reset: titleReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredStartDate,
    valueIsValid: startDateIsValid,
    valueIsInvalid: startDateIsInvalid,
    valueInputHandler: startDateInputHandler,
    valueBlurHandler: startDateBlurHandler,
    reset: startDateReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredEndDate,
    valueIsValid: endDateIsValid,
    valueIsInvalid: endDateIsInvalid,
    valueInputHandler: endDateInputHandler,
    valueBlurHandler: endDateBlurHandler,
    reset: endDateReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredOrganizer,
    valueIsValid: organizerIsValid,
    valueIsInvalid: organizerIsInvalid,
    valueInputHandler: organizerInputHandler,
    valueBlurHandler: organizerBlurHandler,
    reset: organizerReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const formSubmitHandler = (event) => {
    const electionData = {
      electionTitle: enteredTitle,
      electionStartDate: enteredStartDate,
      electionEndDate: enteredEndDate,
      electionOrganizer: enteredOrganizer,
    };

    event.preventDefault();

    onCreateElection(electionData);

    titleReset();
    startDateReset();
    endDateReset();
    organizerReset();
  };

  const onCreateElection = async (electionData) => {
    setError(null);

    try {
      const response = await fetch(
        "https://decentral-51b5a-default-rtdb.firebaseio.com/elections.json",
        {
          method: "POST",
          body: JSON.stringify(electionData),
          headers: {
            "content-type": "application.json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something is Wrong");
      }

      const data = await response.json();
      console.log(data);

      history("/election-list");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.cover}>
      <Navbar style="color: black;" />
      <div className={styles.formContent}>
        <img
          className={styles.logo}
          src="\images\logo.png"
          alt="decentral vote logo"
        />
        <div className={styles.electionList}>
          <p>Create an Election</p>
          <button className={styles.listButton}>
            <Link to="/election-list">Election List</Link>
          </button>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={formSubmitHandler}>
            <div
              className={` ${styles["formInputs"]} ${
                titleIsInvalid ||
                startDateIsInvalid ||
                endDateIsInvalid ||
                organizerIsInvalid
                  ? styles.invalid
                  : ""
              }`}
            >
              <label htmlFor="election-title">Election Title</label>
              <input
                type="text"
                id="election-title"
                onChange={titleInputHandler}
                onBlur={titleBlurHandler}
                value={enteredTitle}
              />

              {titleIsInvalid && <p>Please enter a valid Title</p>}

              <div className={styles.formDates}>
                <div className={styles.formDate}>
                  <label htmlFor="start-date">Start Date</label>
                  <input
                    className={styles.dateInput}
                    type="date"
                    id="start-date"
                    onChange={startDateInputHandler}
                    onBlur={startDateBlurHandler}
                    value={enteredStartDate}
                  />
                </div>

                <div className={styles.formDate}>
                  <label htmlFor="start-date">Start Date</label>
                  <input
                    className={styles.dateInput}
                    type="date"
                    id="start-date"
                    onChange={endDateInputHandler}
                    onBlur={endDateBlurHandler}
                    value={enteredEndDate}
                  />
                </div>
              </div>

              {(startDateIsInvalid || endDateIsInvalid) && (
                <p>Please Select a Date</p>
              )}

              <label htmlFor="administrator">
                Organization / Administrator
              </label>
              <input
                type="text"
                id="administrator"
                onChange={organizerInputHandler}
                onBlur={organizerBlurHandler}
                value={enteredOrganizer}
              />

              {organizerIsInvalid && <p>Please enter a valid organization</p>}

              <label htmlFor="time-zone">Time-zone</label>
              <TimezoneSelect
                className={styles.timezoneInput}
                id="time-zone"
                value={selectedTimezone}
                onChange={setSelectedTimezone}
              />
            </div>

            <div className={styles.formActions}>
              <button className={styles.createButton}>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ElectionForm;
