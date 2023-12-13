import styles from "./VotersList.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import UserItemCover from "../../ui/UserItemCover/UserItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";

const VotersList = () => {
  bouncy.register();

  const [votersList, setVotersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://decentral-51b5a-default-rtdb.firebaseio.com/voters.json",
        {
          Method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Something is Wrong");
      }

      const data = await response.json();
      console.log(data);

      const votersList = [];

      for (const key in data) {
        votersList.push({
          vName: data[key].voterName,
          vId: data[key].voterId,
        });
      }

      setVotersList(votersList);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content = <p>No Data Found</p>;

  if (votersList.length > 0) {
    content = votersList.map((item) => {
      return <UserItemCover name={item.vName} id={item.vId} />;
    });
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      // Default values shown
      <l-bouncy size="85" speed="1.75" color="#3c3e43"></l-bouncy>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.votersListPageCover}>
        <Sidebar />
        <div
          className={`${styles["pageContent"]} ${
            isLoading ? styles.loading : ""
          }`}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default VotersList;
