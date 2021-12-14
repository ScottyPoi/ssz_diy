import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.scss";
import Input from "./components/Input";
import CreateValue from "./components/CreateValue";
import { useEffect, useState } from "react";
import AliasMenu from "./components/AliasMenu";
import Serialize from "./components/Serialize";
import { ByteVectorType, toHexString } from "@chainsafe/ssz";

const ByteVector96 = new ByteVectorType({length: 96})
const s: any = [];
for (let index = 0; index < 96; index++) {
    s.push(Math.floor(Math.random() * 255));
    
}
const ser = toHexString(ByteVector96.serialize(s))
const htr = toHexString(ByteVector96.hashTreeRoot(s))
const cd = ByteVector96.getFixedSerializedLength()

const example: any[] = [s, ser, htr, cd]
function App() {
  const [types, setTypes] = [
    "Boolean",
    "Uint",
    "Vector",
    "List",
    "Union",
    "Container",
    "Example_Message",
  ];
  const [aliasList, setAliasList] = useState([
    "Bit",
    "Byte",
    "ByteVector",
    "Bytes32",
    "ByteList",
    "ExampleMessage",
    "ExamplePayload",
  ]);
  const [newAlias, setNewAlias] = useState("");
  const [value, setValue] = useState<any>(s)
  const [serialized, setSerialized] = useState<string>(ser)
  const [hashTreeRoot, setHashTreeRoot] = useState<string>(htr)
  useEffect(() => {
    let list = [...aliasList];
    list.push(newAlias);
    setAliasList(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAlias]);



  return (
    <Router>
      {/* <AliasMenu /> */}
      {/* <Input /> */}
      <Serialize example={example} value={s} serialized={serialized} htr={hashTreeRoot} userTypes={["Byte", "ByteVector", "Bytes32", "Bytes48", "Bytes96"]}/>
      {/* <CreateValue aliasList={aliasList} create={setNewAlias}/> */}
    </Router>
  );
}

export default App;
