import styles from "./CandidateList.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import UserItemCover from "../../ui/UserItemCover/UserItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";

const CandidateList = () => {
  bouncy.register();

  const [candidateList, setCandidateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://decentral-51b5a-default-rtdb.firebaseio.com/candidate.json",
        {
          Method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Something is Wrong");
      }

      const data = await response.json();
      console.log(data);

      const cList = [];

      for (const key in data) {
        cList.push({
          cName: data[key].candidateName,
          cId: data[key].candidateId,
        });
      }

      setCandidateList(cList);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content = <p>No Data Found</p>;

  if (candidateList.length > 0) {
    content = candidateList.map((item) => {
      return <UserItemCover name={item.cName} id={item.cId} />;
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
            isLoading || candidateList.length === 0 ? styles.loading : ""
          }`}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default CandidateList;
