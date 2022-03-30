import { PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

import './styles.css'

const MapsApp = () => {
  return (
    <PlacesProvider>
      <HomeScreen />
    </PlacesProvider>
  );
};

export default MapsApp;
