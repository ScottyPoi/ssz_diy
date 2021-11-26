/* eslint-disable @typescript-eslint/no-unused-vars */
import EventEmitter from "events";
import { useEffect, useState } from "react";
import ContainerMenu from "./ContainerMenu";
import ExampleMessage from "./ExampleMessage";
import ListMenu from "./ListMenu";
import Prompt from "./Prompt";
import SelectElementType from "./SelectElementType";
import { UintMenu } from "./UintMenu";
import UnionMenu from "./UnionMenu";
import VectorMenu from "./VectorMenu";

type InputProps = {};

const _types = ["Boolean", "Uint", "Vector", "List", "Union", "Container", "Example_Message"]
let basicTypes = ["Uint", "Boolean"];
let uintTypes = ["Uint8", "Uint16", "Uint32", "Uint64", "Uint128", "Uint256"];

export default function Input (props: InputProps) {
    const [boolean, setBoolean] = useState(false);
    const [uint, setUint] = useState(false);
    const [vector, setVector] = useState(false);
    const [bitVector, setBitVector] = useState(false);
    const [list, setList] = useState(false);
    const [BitList, setBitList] = useState(false);
    const [union, setUnion] = useState(false);
    const [container, setContainer] = useState(false);
    const [example, setExample] = useState(false);
    //
    const [name, setName] = useState("[USER_TYPE]");
    const [types, setTypes] = useState(_types)
    const [basicVector, setBasicVector] = useState(false);
  const [compositeVector, setCompositeVector] = useState(false);
  const [basicList, setBasicList] = useState(false);
  const [compositeList, setCompositeList] = useState(false);
  const [type, setType] = useState("[SSZ_TYPE]");
  const [elementOps, setElementOps] = useState("<OPTIONS>");
  const [elementType, setElementType] = useState("");
  const [elementParams, setElementParams] = useState("");
  const [compositeVectorParams, setCompositeVectorParams] = useState("");
  const [typeArray, setTypeArray] = useState("");
  const [string, setString] = useState("");
  
    const log = new EventEmitter();

    useEffect(() => {
        log.emit("TypeSelected", type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

  useEffect(() => {
    setString("");
    switch (type) {
      case "BooleanType":
        setBoolean(true);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(false);
        setContainer(false);
        setExample(false);
        break;
      case "UintType":
        setBoolean(false);
        setUint(true);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(false);
        setContainer(false);
        setExample(false);
        break;
      case "VectorType":
        setBoolean(false);
        setUint(false);
        setVector(true);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(false);
        setContainer(false);
        setExample(false);
        break;
      case "BitVectorType":
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(true);
        setList(false);
        setBitList(false);
        setUnion(false);
        setContainer(false);
        setExample(false);
        break;
      case "ListType":
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(true);
        setBitList(false);
        setUnion(false);
        setContainer(false);
        setExample(false);
        break;
      case "BitListType":
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(true);
        setUnion(false);
        setContainer(false);
        setExample(false);
        break;
      case "UnionType":
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(true);
        setContainer(false);
        setExample(false);
        break;
      case "ContainerType":
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(false);
        setContainer(true);
        setExample(false);
        break;
      case "Example_MessageType":
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(false);
        setContainer(false);
        setExample(true);
        break;
        default: 
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(false);
        setContainer(false);
        setExample(false);
    }
  }, [type]);

  function createType() {
      let t = [...types]
      t.push("user type")
      setTypes(t)
  }

  return (
    <div className="row">
      <div className="col-4">
        <div className="row align-items-center">
          <div className="col-3">Type Alias: </div>
          <div className="col-9">
            <input
              type="string"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
            ></input>
          </div>
        </div>
        <SelectElementType name="SSZ Type" setType={setType} types={types}/>
        {uint && <UintMenu setString={setString} />}
        {vector && <VectorMenu setString={setString} />}
        {list && <ListMenu setString={setString} />}
        {union && <UnionMenu />}
        {container && <ContainerMenu />}
        {example && <ExampleMessage />}
      </div>
      <div className="col-8">
        <div className="row">
          <h3>
            type {name} = {type}
            {string}
          </h3>
        </div>
        <div className="row">
          <div className="col-4">
            <button className="btn btn-secondary " style={{ border: "solid", borderColor: "black", textAlign: "center" }} onClick={() => createType()}>
              <h3 >
                {" "}
                CREATE TYPE
              </h3>
            </button>
          </div>
        <Prompt log={log} />
        </div>
      </div>
    </div>
  );
}
