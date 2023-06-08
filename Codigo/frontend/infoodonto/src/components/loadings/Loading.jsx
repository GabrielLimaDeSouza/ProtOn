//* CSS
import styles from "./Loading.module.css";

//* Material UI
import { CircularProgress } from "@mui/material";

const Loading = ({ fullscreen, size, color }) => {
  return (
    <div className={`${styles.loading} ${fullscreen && styles.fullscreen}`}>
      <CircularProgress size={size || null} color={color || null} />
    </div>
  );
};

export default Loading;
