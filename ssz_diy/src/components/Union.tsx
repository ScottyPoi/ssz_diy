import {
  BasicType,
  BigIntUintType,
  CompositeType,
  isBitListType,
  isBitVectorType,
  isBooleanType,
  isCompositeType,
  isListType,
  isUintType,
  isVectorType,
  NumberUintType,
  Type,
  UnionType,
} from "@chainsafe/ssz";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SetElementType from "./SetElementType";
import SetLength from "./setLength";
import { SetLimit } from "./SetLimit";
import SetUnionType from "./setUnionType";

interface UnionProps {
  setUnion: Dispatch<SetStateAction<Type<unknown>>>;
  setUnionTypes: Dispatch<SetStateAction<Type<any>[]>>;
  setTypeNames: Dispatch<SetStateAction<string[]>>;
}

export function nameString(type: Type<any>): string {
  if (isBooleanType(type)) {
    return "boolean";
  } else if (isUintType(type)) {
    return `Uint${type.byteLength * 8}`;
  } else if (isBitVectorType(type)) {
    return `BitVector<length: ${type.length}>`;
  } else if (isBitListType(type)) {
    return `BitList<limit: ${type.limit}>`;
  } else if (isVectorType(type)) {
    return `Vector<elementType: ${nameString(type.elementType)}, length: ${
      type.length
    }>`;
  } else if (isListType(type)) {
    return `List<elementType: ${nameString(type.elementType)}, limit: ${
      type.limit
    }>`;
  } else return "null";
}
export default function Union(props: UnionProps) {
  const [length, setLength] = useState(1);
  const [limit, setLimit] = useState(256);
  const [elementType, setElementType] = useState<Type<unknown>>(
    new NumberUintType({ byteLength: 1 })
  );
  const [types, setTypes] = useState<Type<any>[]>([
    new BigIntUintType({ byteLength: 32 }),
  ]);
  const [selected, setSelected] = useState<Type<any>>(
    new BigIntUintType({ byteLength: 32 })
  );
  const [idx, setIdx] = useState(0);
  const [idxRemove, setIdxRemove] = useState(0);

  async function getTypes() {
    return types;
  }

  useEffect(() => {
    getTypes().then((t) => {
      props.setUnionTypes(t);
      props.setTypeNames(
        types.map((type) => {
          return nameString(type);
        })
      );
      props.setUnion(new UnionType({ types: t }));
    });
  }, [types]);

  function addType(type: Type<unknown>, idx?: number) {
    let t = [...types];
    if (idx) {
      setTypes(Array.from([...t.slice(0, idx), type, ...t.slice(idx)]));
    } else {
      t.push(type);
      setTypes(t);
    }
  }


  function removeType(idx: number) {
    let beg = types.slice(0, idx);
    let end = types.slice(idx + 1);
    setTypes(Array.from([...beg, ...end]));
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
                <p className="my-2 text-end">ADD TYPE AT INDEX</p>
                <p className="mt-4 text-end">REMOVE TYPE AT INDEX</p>
              </div>
            </div>{" "}
            <div className="col-3 my-2">
              <div className="d-grid  gap-2">
                <input
                  className="form-control "
                  type="number"
                  value={idxRemove}
                  onChange={(e) => setIdxRemove(parseInt(e.target.value))}
                />{" "}
                <input
                  className="form-control "
                  type="number"
                  value={types.length}
                  onChange={(e) => setIdx(parseInt(e.target.value))}
                />{" "}
              </div>
            </div>
            <div className="col-2 mt-2">
              <div className="d-grid  gap-2"></div>
              <div className="d-grid  gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-dark m-1"
                  onClick={() => addType(selected, idx)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-sm m-1"
                  onClick={() => removeType(idx)}
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
            <p className="text-center" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Union Types</p>
          </div>
          {types.map((typ, idx) => {
            return (
              <div className="row mt-1">
                <p>
                  {idx}: {nameString(typ)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
