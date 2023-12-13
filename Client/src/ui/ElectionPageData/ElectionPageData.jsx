import styles from "./ElectionPageData.module.css";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";

const ElectionPageData = () => {
  return (
    <div className={styles.dataBlockCover}>
      <div className={styles.votes}>
        <div className={styles.iconCover}>
          <HowToVoteOutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.dataContent}>
          <h1>64%</h1>
          <h2>Votes</h2>
        </div>
      </div>
      <div className={styles.voters}>
        {" "}
        <div className={styles.iconCover}>
          <PeopleAltOutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.dataContent}>
          <h1>50</h1>
          <h2>Voters</h2>
        </div>
      </div>
      <div className={styles.candidates}>
        {" "}
        <div className={styles.iconCover}>
          <Diversity3OutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.dataContent}>
          <h1>10</h1>
          <h2>Candidates</h2>
        </div>
      </div>
    </div>
  );
};

export default ElectionPageData;
