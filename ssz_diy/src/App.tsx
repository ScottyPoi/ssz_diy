import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.scss";
import Serialize from "./components/Serialize";
import {ssz} from '@chainsafe/lodestar-types'
import { useEffect } from "react";

function App() {

  async function init() {
    //@ts-ignore
  window.ssz = ssz
  }
  
  useEffect(() => {
    init()
  }, [])

  return (
    <Router>
      {/* <AliasMenu /> */}
      {/* <Input /> */}
      <Serialize userTypes={[]} />
        {/* <CreateValue aliasList={aliasList} create={setNewAlias}/> */}
    </Router>
  );
}

export default App;
