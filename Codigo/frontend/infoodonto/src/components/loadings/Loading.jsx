//* CSS
import styles from "./Loading.module.css";

//* Material UI
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
