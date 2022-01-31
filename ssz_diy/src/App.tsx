import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.scss";
import Serialize from "./components/Serialize";
import { ssz } from "@chainsafe/lodestar-types";
import AliasModal from "./components/AliasModal";
import FileModal from "./components/FileModal";
import EnterDataManuallyModal from "./components/EnterDataManuallyModal";
import {
  BooleanType,
  byteType,
  NumberUintType,
  Type,
  VectorType,
} from "@chainsafe/ssz";
import { useEffect, useState } from "react";
import { aliasList } from "./components/SelectType";
import { nameString } from "./components/Union";
import EventEmitter from "events";

class Byte extends NumberUintType {
  constructor() {
    super({ byteLength: 1 });
  }
}
const SimpleSerialize = new EventEmitter();

function App() {
  const [typeName, setTypeName] = useState<string>("Boolean");
  const [type, setType] = useState<Type<any>>(new BooleanType());
  const [data, setData] = useState<unknown>();
  const [aliasList, setAliasList] = useState<Record<string, Type<unknown>>>({
    Byte: new Byte(),
    Bytes32: new VectorType({ elementType: new Byte(), length: 32 }),
  });

  function addToList(alias: string, type: Type<unknown>) {
    let list = aliasList;
    list[alias] = type;
    setAliasList(list);
  }

  async function init() {
    //@ts-ignore
    window.ssz = ssz;
    SimpleSerialize.on("AliasAdded", (alias: string, type: Type<unknown>) =>
      addToList(alias, type)
    );
  }

  useEffect(() => {
    init();
  }, []);

  function getType() {
    return type;
  }

  return (
    <>
      <FileModal typeName={typeName} />
      <EnterDataManuallyModal data={data} setData={setData} type={getType()} />

      <AliasModal
        key={Date.now()}
        type={type}
        typeName={nameString(type)}
        addToList={addToList}
        SimpleSerialize={SimpleSerialize}
        setType={setType}
        setTypeName={setTypeName}
      />
      <Router>
        {/* <AliasMenu /> */}
        {/* <Input /> */}
        <Serialize
          userTypes={[]}
          t={type}
          setT={setType}
          TN={typeName}
          setTN={setTypeName}
          data={data}
          aliasList={aliasList}
          SimpleSerialize={SimpleSerialize}
        />{" "}
        {/* <CreateValue aliasList={aliasList} create={setNewAlias}/> */}
      </Router>
    </>
  );
}

export default App;
