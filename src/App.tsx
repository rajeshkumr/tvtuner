import "./App.css";
import  { Player } from "./components/Player";
import  { Header } from "./components/Header";
import config from "./constants/initial";
import { RecoilRoot, RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
function App() {
  return (
    <RecoilRoot>
      <Header config={config} />
      <Player />
    </RecoilRoot>
  )
}

export default App
