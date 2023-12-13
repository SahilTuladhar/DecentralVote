import styles from "./UserItemCover.module.css";

const UserItemCover = (props) => {
  return (
    <>
      <div className={styles.itemCover}>
        <div className={styles.dropColor}>
          {" "}
          <div className={styles.imageCover}>
            <img src="\images\add-candidate-image.png" alt="" />
          </div>
          <div className={styles.information}>
            <h3>{props.name}</h3>
            <h4 className={styles.description}>{props.id}</h4>
            <button className={styles.removeBtn}>Remove</button>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default UserItemCover;
