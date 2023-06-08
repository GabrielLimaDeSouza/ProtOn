//* Material UI
import { useMediaQuery } from "react-responsive";

//* Components
import MobileHomePage from "./MobileHomePage";
import DesktopHomePage from "./DesktopHomePage";

const HomePage = () => {
  const isDesktop = useMediaQuery({ minWidth: 840 });

  return isDesktop ? <DesktopHomePage /> : <MobileHomePage />;
};

export default HomePage;
