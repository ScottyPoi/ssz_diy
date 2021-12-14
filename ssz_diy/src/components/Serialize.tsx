import { useState } from "react";
import InputBox from "./InputBox/InputBox";
import OutputBox from "./OutputBox.tsx/OutputBox";

interface SerializeProps {
  userTypes: string[];
  value: any;
  serialized: string;
  htr: string;
  example: any[];
}

const nativeTypes = {
  Basic: [
    "Boolean",
    "Uint8",
    "Uint16",
    "Uint32",
    "Uint64",
    "Uint128",
    "Uint256",
  ],

  Composite: ["BitVector", "BitList", "Vector", "List", "Container", "Union"],
};

export default function Serialize(props: SerializeProps) {
  const [inputMode, setInputMode] = useState<number>(0);
  // const [userTypes, setUserTypes] = useState<string[]>([])

  // function addUserType(type: string) {
  //     let uT = [...userTypes];
  //     uT.push(type);
  //     setUserTypes(uT)

  // }

  const userTypes: string[] = props.userTypes;

  return (
    <div className="container m-0 p-0 ">
      <div className="row m-0 p-0">
        <div className="col-5 m-0 p-0">
          <div className="row m-0 p-0">
            <div className="col m-0 p-0">
              <ul className="button group">
                <h3> Basic: </h3>
                {nativeTypes.Basic.map((type) => {
                  return (
                    <li>
                      <button className="btn">{type}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col m-1 p-1">
              <ul className="button group">
                <h3> Composite: </h3>
                {nativeTypes.Composite.map((type) => {
                  return (
                    <li>
                      <button className="btn">{type}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col m-1 p-1">
              <ul className="button group">
                <h3> User: </h3>
                {userTypes.map((type) => {
                  return (
                    <li>
                      <button className="btn">{type}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col ">
          <div className="row p-1 m-1 border">
              <div className="btn-group">
                <input
                  type="radio"
                  className="btn-check"
                  id="serialize"
                  checked={inputMode === 0}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="serialize"
                  onClick={() => setInputMode(0)}
                >
                  Serialize
                </label>
                <input
                  type="radio"
                  className="btn-check btn-outline-secondary"
                  id="deserialize"
                  checked={inputMode === 1}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="deserialize"
                  onClick={() => setInputMode(1)}
                >
                  Deserialize
                </label>
                <input
                  type="radio"
                  className="btn-check btn-outline-secondary"
                  id="validate"
                  checked={inputMode === 2}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="validate"
                  onClick={() => setInputMode(2)}
                >
                  Validate
                </label>
              </div>
            <div className="row border">
                <div className="col">

              <h4 className="text-center">input</h4>
                </div>
                <div className="col">
                {<InputBox mode={inputMode} />}</div>

                </div>
          </div>
          <div className="row p-1 m-1 border">
                
            {<OutputBox value={props.example[0]} serialized={props.example[1]} htr={props.example[2]} mode={inputMode} cd={props.example[3]}/>}
          
        </div>
        </div>
      </div>
    </div>
  );
}
