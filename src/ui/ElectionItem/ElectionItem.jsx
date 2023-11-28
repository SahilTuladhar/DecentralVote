import styles from "./ElectionItem.module.css";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const ElectionItem = (props) => {
  return (
    <div className={styles.itemCover}>
      <div className={styles.infoCover}>
        <div className={styles.upComponent}>
          <h4>{props.title}</h4>
          <h5>
            Start Date <CalendarTodayOutlinedIcon className={styles.icon} />
          </h5>
          <h5>
            End Date <CalendarTodayOutlinedIcon className={styles.icon} />
          </h5>
        </div>
        <div className={styles.downComponent}>
          <h4>{props.organizer}</h4>
          <h5 className={styles.startDate}>{props.sDate}</h5>
          <h5 className={styles.endDate}>{props.eDate}</h5>
        </div>
      </div>

      <div className={styles.itemActions}>
        <EditOutlinedIcon />
        <DeleteOutlineOutlinedIcon />
      </div>
    </div>
  );
};

export default ElectionItem;
