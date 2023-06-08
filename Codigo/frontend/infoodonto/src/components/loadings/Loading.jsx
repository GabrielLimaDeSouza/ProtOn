//* CSS
import styles from "./Loading.module.css";

//* Material UI
import { CircularProgress } from "@mui/material";

const Loading = ({ fullscreen }) => {
  return (
    <div className={`${styles.loading} ${fullscreen && styles.fullscreen}`}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
