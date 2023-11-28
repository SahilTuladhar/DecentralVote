import styles from "./Sidebar.module.css";
import SidebarComponent from "../SiderbarComponent/SidebarComponent";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebarCover}>
      <div className={styles.sidebarContents}>
        <Link to="/election-page">
          <SidebarComponent
            optionTitle="Overview"
            iconTitle={<SummarizeIcon />}
          />
        </Link>

        <SidebarComponent
          optionTitle="Results"
          iconTitle={<PollOutlinedIcon />}
        />
        <SidebarComponent
          optionTitle="Voters List"
          iconTitle={<PeopleAltOutlinedIcon />}
        />
        <SidebarComponent
          optionTitle="Candidate List"
          iconTitle={<EmojiPeopleOutlinedIcon />}
        />

        <Link to="/add-voter">
          <SidebarComponent
            optionTitle="Add Voter"
            iconTitle={<GroupAddOutlinedIcon />}
            linkTo="/add-voter"
          />
        </Link>

        <SidebarComponent
          optionTitle="Add Candidate"
          iconTitle={<PersonAddAltOutlinedIcon />}
        />
      </div>
    </div>
  );
};

export default Sidebar;
