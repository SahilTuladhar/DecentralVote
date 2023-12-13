import styles from "./ElectionList.module.css";
import { react, useState, useCallback, useEffect } from "react";
import ElectionItem from "../../ui/ElectionItem/ElectionItem";
import Navbar from "../../ui/Navbar/Navbar";
import { bouncy } from "ldrs";
import { Link } from "react-router-dom";

const ElectionList = () => {
  bouncy.register();

  const [elections, setElections] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    setIsloading(true);

    try {
      const response = await fetch(
        " https://decentral-51b5a-default-rtdb.firebaseio.com/elections.json",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Something is Wrong");
      }

      const data = await response.json();
      console.log(data);

      const addedElections = [];

      for (const key in data) {
        addedElections.push({
          electionTitle: data[key].electionTitle,
          electionOrganizer: data[key].electionOrganizer,
          startDate: data[key].electionStartDate,
          endDate: data[key].electionEndDate,
        });
      }

      setElections(addedElections);
    } catch (error) {
      setError(error.meesage);
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content = <p> No Data Found</p>;

  if (elections.length > 0) {
    content = elections.map((item) => {
      return (
        <ElectionItem
          title={item.electionTitle}
          organizer={item.electionOrganizer}
          sDate={item.startDate}
          eDate={item.endDate}
        />
      );
    });
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      // Default values shown
      <l-bouncy size="85" speed="1.75" color="#c6c2f8"></l-bouncy>
    );
  }

  return (
    <div className={styles.cover}>
      <Navbar />
      <div className={styles.formContent}>
        <img
          className={styles.logo}
          src="\images\logo.png"
          alt="decentral vote logo"
        />

        <div
          className={`${styles["formContainer"]} ${
            isLoading ? styles.loading : ""
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default ElectionList;
