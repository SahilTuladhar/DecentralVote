import styles from "./VotersList.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import UserItemCover from "../../ui/UserItemCover/UserItemCover";
import { bouncy } from "ldrs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const VotersList = (props) => {
  bouncy.register();

  const [votersList, setVotersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log('id', id);
  
      const response = await axios.get(`http://localhost:4000/voter/getvoter/${id}`, {
        withCredentials: true,
      });
  
      console.log('Response:', response.data);
      setVotersList(response.data);
    } catch (error) {
      console.error('Error fetching voter data:', error);
      setError(error.message);  // or setError('Error fetching voter data');
    }
    setIsLoading(false);
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  let content = <p>No Data Found</p>;

  if (votersList.length > 0) {
    content = votersList.map((item) => {
      return <UserItemCover name={item.name} id={item.voterID} />;
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
