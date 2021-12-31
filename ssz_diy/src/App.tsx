import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.scss";
import Serialize from "./components/Serialize";
import { ByteVectorType } from '@chainsafe/ssz';
import Modal from "./components/CreateType";
import { useState } from "react";
import EventEmitter from "events";

const ByteVector96 = new ByteVectorType({length: 96})
export type bytes96 = typeof ByteVector96
const s: number[] = [];
for (let index = 0; index < 96; index++) {
    s.push(Math.floor(Math.random() * 255));
    
}
const u8a = Uint8Array.from(s)

const exampleType = ByteVector96
const exampleData = u8a

function App() {


  return (
    <Router>
      {/* <AliasMenu /> */}
      {/* <Input /> */}
      <Serialize exampleData={exampleData} exampleType={exampleType} userTypes={["ByteVector", "Bytes2", "Bytes4", "Bytes8", "Bytes16","Bytes20", "Bytes32", "Bytes48", "Bytes96"]}/>
        {/* <CreateValue aliasList={aliasList} create={setNewAlias}/> */}
    </Router>
  );
}

export default App;
