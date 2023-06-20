//* Material UI
import { useMediaQuery } from "react-responsive";

//* React
import { useState, useEffect } from "react";

//* Components
import MobileHomePage from "./MobileHomePage";
import DesktopHomePage from "./DesktopHomePage";

//* Route
import { getAllPacientes, getAllInstituicoes, getAllDentistas } from "../../services/api";

const HomePage = () => {
  const isDesktop = useMediaQuery({ minWidth: 840 });

  const [pacientes, setPacientes] = useState()
  const [instituicoes, setInstituicoes] = useState()
  const [dentistas, setDentistas] = useState()

  useEffect(() => {
    (async () => {
      const pacientes = await getAllPacientes();
      const instituicoes = await getAllInstituicoes();
      const dentistas = await getAllDentistas();

      setPacientes(pacientes.data);
      setInstituicoes(instituicoes.data);
      setDentistas(dentistas.data);

    })()
  }, [])
  

  return isDesktop ?
    <DesktopHomePage
      quantInsituicoes={instituicoes?.length}
      quantPacientes={pacientes?.length}
      quantDentistas={dentistas?.length}/>
    :
    <MobileHomePage
      quantInsituicoes={instituicoes?.length}
      quantPacientes={pacientes?.length}
      quantDentistas={dentistas?.length} />;
};

export default HomePage;
