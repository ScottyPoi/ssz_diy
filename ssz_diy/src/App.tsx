import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.scss";
import Input from "./components/Input";
import CreateValue from "./components/CreateValue";
import { useEffect, useState } from "react";
import AliasMenu from "./components/AliasMenu";

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

  useEffect(() => {
    let list = [...aliasList];
    list.push(newAlias);
    setAliasList(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAlias]);

  return (
    <Router>
      {/* <AliasMenu /> */}
      <Input />
      {/* <CreateValue aliasList={aliasList} create={setNewAlias}/> */}
    </Router>
  );
}

export default App;
