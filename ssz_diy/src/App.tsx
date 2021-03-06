import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.scss";
import Serialize from "./components/Serialize";
import { ssz } from "@chainsafe/lodestar-types";
import AliasModal from "./components/AliasModal";
import FileModal from "./components/FileModal";
import EnterDataManuallyModal from "./components/DataEntry/EnterDataManuallyModal";
import {
  BooleanType,
  NumberUintType,
  Type,
  VectorType,
} from "@chainsafe/ssz";
import { useEffect, useState } from "react";
import { nameString } from "./components/TypeMenus/Union";
import EventEmitter from "events";
import InfoTable from "./components/OutputBox/InfoTable";

class Byte extends NumberUintType {
  constructor() {
    super({ byteLength: 1 });
  }
}
const SimpleSerialize = new EventEmitter();

function App() {
  const [typeName, setTypeName] = useState<string>("Boolean");
  const [type, setType] = useState<Type<unknown>>(new BooleanType());
  const [data, setData] = useState<unknown>();
  const [aliasList, setAliasList] = useState<Record<string, Type<unknown>>>({
    Byte: new Byte(),
    Bytes32: new VectorType({ elementType: new Byte(), length: 32 }),
  });
  const [showInfo, setShowInfo] = useState(<></>)

  async function setInfo(dataSet: unknown) {
    const t = type;
    setShowInfo(<InfoTable top sszTypeName={typeName} data={dataSet} type={t} />);
  }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getType() {
    return type;
  }

  return (
    <>
      <FileModal type={type} setInfo={setInfo} typeName={typeName} />
      <EnterDataManuallyModal alias={Object.keys(aliasList).includes(typeName) ? typeName : undefined} data={data} setData={setData} type={getType()} setInfo={setInfo} />

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
        <Serialize
          userTypes={[]}
          t={type}
          setT={setType}
          TN={typeName}
          setTN={setTypeName}
          data={data}
          aliasList={aliasList}
          SimpleSerialize={SimpleSerialize}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
        />{" "}
      </Router>
    </>
  );
}

export default App;
