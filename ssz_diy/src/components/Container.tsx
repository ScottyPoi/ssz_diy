import {
  BigIntUintType,
  BooleanType,
  ContainerType,
  isBitListType,
  isBitVectorType,
  isListType,
  isVectorType,
  NumberUintType,
  Type,
} from "@chainsafe/ssz";
import types from "@emotion/styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SetElementType from "./SetElementType";
import SetLength from "./setLength";
import { SetLimit } from "./SetLimit";
import SetUnionType from "./setUnionType";
import { nameString } from "./Union";

interface ContainerProps {
  setContainerTypes: Dispatch<SetStateAction<Record<string, Type<any>>>>;
}

export default function Container(props: ContainerProps) {
  const [container, setContainer] = useState(
    new ContainerType({
      fields: { "0": new BigIntUintType({ byteLength: 32 }) },
    })
  );
  const [fields, setFields] = useState<Record<string, Type<any>>>({
    exampleKey: new BigIntUintType({ byteLength: 32 }),
  });
  const [fieldsMap, setFieldsMap] = useState<Map<string, Type<any>>>(
    new Map<string, Type<any>>().set(
      "exampleKey",
      new BigIntUintType({ byteLength: 32 })
    )
  );
  const [idx, setIdx] = useState<number>(1);
  const [idxRemove, setIdxRemove] = useState<number>(0);
  const [selected, setSelected] = useState<Type<any>>(new BooleanType());
  const [curKey, setCurKey] = useState<string>("new");
  const [length, setLength] = useState<number>(1);
  const [limit, setLimit] = useState<number>(256);
  const [elementType, setElementType] = useState<Type<any>>(
    new NumberUintType({ byteLength: 1 })
  );

  function addFieldAtIdx(key: string, type: Type<unknown>, idx: number) {
    let f = Object.entries(fields);
    let a = idx > 0 ? Array.from(f).slice(0, idx + 1) : [];
    let b = idx < f.length - 1 ? Array.from(f).slice(idx) : [];
    let c = [...a, [key, type], ...b];
    setFields(Object.fromEntries(c));
  }
  function removeFieldAtIdx(idx: number) {
    let f = Object.entries(fields);
    let a = idx > 0 ? Array.from(f).slice(0, idx) : [];
    let b = idx < f.length - 1 ? Array.from(f).slice(idx) : [];
    let c = [...a, ...b];
    setFields(Object.fromEntries(c));
  }

  function addField(key: string, type: Type<unknown>) {
    const f = Object.entries(fields);
    f.push([key, type]);
    const fo = Object.fromEntries(f);
    setFields(fo);
  }

  useEffect(() => {
    const con = new ContainerType({ fields: fields });
    setContainer(con);
    props.setContainerTypes(fields);
  }, [fields]);

  async function getFields() {
    return fields;
  }

  return (
    <div className="container">
      <div className="row m-1">
        <div id="Set Type" className="col-4 m-3">
          <SetUnionType
            selected={selected}
            setSelected={setSelected}
            length={length}
            limit={limit}
            elementType={elementType}
            setLength={setLength}
            setLimit={setLimit}
            setElementType={setElementType}
          />
        </div>
        <div id="Type Functions" className="col-5 m-1">
          {/* <div role='group' className="btn-group-vertical fluid"> */}
          <div className="container m-2 border">
            <div className="row m-1">
              <p className="text-center">{nameString(selected)}</p>
            </div>
            {isVectorType(selected) ? (
              <div className="row my-2">
                {!isBitVectorType(selected) && (
                  <div className="col">
                    <SetElementType setEType={setElementType} />
                  </div>
                )}
                <div className="col">
                  <SetLength currentLen={length} setVectorLen={setLength} />
                </div>
              </div>
            ) : isListType(selected) ? (
              <div className="row">
                <div className="col">
                  <SetElementType setEType={setElementType} />
                </div>

                <div className="col">
                  <SetLimit
                    curLimit={limit}
                    perChunk={256}
                    setLimit={setLimit}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="row m-2">
            <div className="col-7 my-2">
              <div className="grid gap-2">
                <p className="my-2 text-end">ADD FIELD</p>
                <p className="mt-4 text-end">REMOVE FIELD INDEX</p>
              </div>
            </div>{" "}
            <div className="col-3 my-2">
              <div className="d-grid  gap-2">
                <input
                  min={0}
                  max={Object.keys(fields).length}
                  className="form-control "
                  type="string"
                  value={curKey}
                  onChange={(e) => setCurKey(e.target.value)}
                />
                <input
                  className="form-control "
                  type="number"
                  value={idxRemove}
                  min={0}
                  max={Object.keys(fields).length - 1}
                  onChange={(e) => setIdxRemove(parseInt(e.target.value))}
                />{" "}
              </div>
            </div>
            <div className="col-2 mt-2">
              <div className="d-grid  gap-2"></div>
              <div className="d-grid  gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-dark m-1"
                  onClick={() => addField(curKey, selected)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-sm m-1"
                  onClick={() => removeFieldAtIdx(idxRemove)}
                >
                  -
                </button>
              </div>
            </div>
            <div className="row p-2">
              {isBitListType(selected) ? (
                <p className="text-center">BitList{`<limit: ${limit}>`}</p>
              ) : isBitVectorType(selected) ? (
                <p className="text-center">{`BitVector<length: ${length}>`}</p>
              ) : isVectorType(selected) ? (
                <>
                  {/* <div className="col">
                    <SetElementType setEType={setElementType} />
                  </div> */}
                </>
              ) : isListType(selected) ? (
                <>
                  <div className="col">
                    <SetLimit
                      curLimit={limit}
                      perChunk={256}
                      setLimit={setLimit}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="col border m-2">
          <div className="row border p-0">
            <p
              className="text-center"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              Container Fields
            </p>
          </div>
          {Object.entries(fields).map((typ, idx) => {
            return (
              <div key={idx} className="row mt-1">
                <p>
                  {typ[0]}: {nameString(typ[1])}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="container border">
  //       Container Options
  //       {Object.entries(fields).map((entry, idx) => {
  //         return (
  //           <div className="row">
  //             {idx}: {entry[0]} {nameString(entry[1])}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
}
