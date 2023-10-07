import "./App.css";
import  { Player } from "./components/Player";
import  { FramePlayer } from "./components/FramePlayer";
import  { Header } from "./components/Header";
import config from "./constants/initial";
import { RecoilRoot, RecoilEnv } from "recoil";
import { Routes, Route } from 'react-router-dom'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
function App() {

  return (
    <RecoilRoot>
      <Header config={config} />
       <Routes>
          <Route path="/" element={<FramePlayer />} />
          <Route path="/tv" element={<Player />} />
       </Routes>
    </RecoilRoot>
  )
}

export default App
