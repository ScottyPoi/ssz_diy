import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputBox from "./InputBox/InputBox";
import {
  BasicVectorType,
  BigIntUintType,
  BitVectorType,
  BooleanType,
  isBitVectorType,
  isVectorType,
  Number64UintType,
  NumberUintType,
  Type,
  UintType,
  BasicListType,
  BitListType,
  isListType,
  isBitListType,
  isUintType,
  UnionType,
  isUnionType,
  isContainerType,
  ContainerType,
} from "@chainsafe/ssz";
import { randomDataSet } from "./randUint";
import SelectType, { aliasList } from "./SelectType";
import InfoTable from "./OutputBox.tsx/InfoTable";
import SetLength from "./setLength";
import SetElementType from "./SetElementType";
import { SetLimit } from "./SetLimit";
import { UnionObject } from "../RandomData";
import Union, { nameString } from "./Union";
import Container from "./Container";
import EventEmitter from "events";

interface SerializeProps {
  userTypes: string[];
  TN: string;
  t: Type<unknown>;
  setTN: Dispatch<SetStateAction<string>>;
  setT: Dispatch<SetStateAction<Type<any>>>;
  data: unknown;
  aliasList: Record<string, Type<unknown>>;
  SimpleSerialize: EventEmitter;
}

export type TypeValue = number | bigint | boolean | unknown[] | UnionObject;

export const nativeTypes: Record<string, string[]> = {
  Basic: [
    "Boolean",
    "Uint8",
    "Uint16",
    "Uint32",
    "Uint64",
    "Uint128",
    "Uint256",
  ],

  Array: ["BitVector", "BitList", "Vector", "List"],
  Container: ["Container"],
  Union: ["Union"],
};
export default function Serialize(props: SerializeProps) {
  const typeName = props.TN;
  const setTypeName = props.setTN;
  const typeSelect = props.t;
  const setTypeSelect = props.setT;
  const typeDescription = nameString(typeSelect);
  const aliasList = props.aliasList
  const [alias, setAlias] = useState<boolean>(false);

  const [unionTypes, setUnionTypes] = useState<Type<any>[]>([
    new BigIntUintType({ byteLength: 32 }),
  ]);
  const [containerTypes, setContainerTypes] = useState<
    Record<string, Type<any>>
  >({ exampleKey: new BigIntUintType({ byteLength: 32 }) });
  const [unionTypeNames, setUnionTypeNames] = useState<string[]>(["Uint256"]);
  const [elementType, setEType] = useState<Type<any>>(
    new NumberUintType({ byteLength: 8 })
  );
  const [vectorLen, setVectorLen] = useState(100);
  const [listLimit, setListLimit] = useState(512);
  const [showInfo, setShowInfo] = useState(<></>);

  function update(_type: string) {
    const t =
      _type === "Boolean"
        ? new BooleanType()
        : _type.substring(0, 4) === "Uint" &&
          parseInt(_type.substring(4)) / 8 < 64
        ? new NumberUintType({ byteLength: parseInt(_type.substring(4)) / 8 })
        : _type.substring(0, 4) === "Uint" &&
          parseInt(_type.substring(4)) / 8 > 64
        ? new BigIntUintType({ byteLength: parseInt(_type.substring(4)) / 8 })
        : _type.substring(0, 4) === "Uint" &&
          parseInt(_type.substring(4)) / 8 === 64
        ? new Number64UintType()
        : _type === "BitVector"
        ? new BitVectorType({ length: vectorLen })
        : _type === "Vector"
        ? new BasicVectorType({ length: vectorLen, elementType: elementType })
        : _type === "BitList"
        ? new BitListType({ limit: listLimit })
        : _type === "List"
        ? new BasicListType({ limit: listLimit, elementType: elementType })
        : _type === "Union"
        ? new UnionType({ types: unionTypes })
        : _type === "Container"
        ? new ContainerType({ fields: containerTypes })
        : typeSelect;
        return t
  }


  useEffect(() => {
    setShowInfo(<></>);
    const t = update(typeName)
    alias || setTypeSelect(t);
    props.setT(t);
    props.setTN(typeName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeName, listLimit, vectorLen, elementType, unionTypes, containerTypes]);

  async function makeInfo() {
    const t = typeSelect;
    const dataSet = randomDataSet(t);
    setShowInfo(<InfoTable data={dataSet} type={t} />);
  }

  async function setInfo(dataSet: unknown) {
    const t = typeSelect;
    setShowInfo(<InfoTable data={dataSet} type={t} />);
  }

  useEffect(() => {
    typeof props.data !== "undefined" &&
      setInfo(props.data).then(() => {
        return;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container m-0 p-0 vw-100 vh-100">
      <div className="row m-0 p-0 vh-100 vw-100">
        <SelectType
          setTypeName={setTypeName}
          typeName={typeName}
          type={typeSelect}
          setType={setTypeSelect}
          nativeTypes={nativeTypes}
          setAlias={setAlias}
          aliasList={aliasList}
        />
        <div className="col">
          <div className="row">
            <div className="col-8">
              <textarea
                className="form-control m-2"
                style={{ fontSize: "1rem" }}
                readOnly
                rows={2}
                value={
                  alias
                    ? `${typeName}  \n(${typeDescription})`
                    : `${typeName}${
                        isVectorType(typeSelect)
                          ? `<length: ${vectorLen}${
                              isVectorType(typeSelect) &&
                              !isBitVectorType(typeSelect)
                                ? `, elementType: Uint${
                                    8 *
                                    (elementType as UintType<unknown>)
                                      .byteLength
                                  }`
                                : ``
                            }>`
                          : isListType(typeSelect)
                          ? `<limit: ${listLimit}${
                              !isBitListType(typeSelect)
                                ? `, elementType: Uint${
                                    (elementType as UintType<unknown>)
                                      .byteLength * 8
                                  }`
                                : ``
                            }>`
                          : isUnionType(typeSelect)
                          ? `<types: [${unionTypeNames}]>`
                          : isContainerType(typeSelect)
                          ? `<${Object.entries(containerTypes).map(
                              ([key, type]) => {
                                return `${key}: ${nameString(type)}`;
                              }
                            )} >`
                          : ``
                      }`
                }
              />
            </div>
            <div className="col">
              {<InputBox type={typeSelect} makeInfo={makeInfo} />}
            </div>
          </div>
          {alias || (
            <>
              {isContainerType(typeSelect) && (
                <Container setContainerTypes={setContainerTypes} />
              )}
              <div className="row">
                {" "}
                {isVectorType(typeSelect) && (
                  <div className="col align-items-end">
                    <SetLength
                      setVectorLen={setVectorLen}
                      currentLen={vectorLen}
                    />
                  </div>
                )}
                {/* {isListType(typeSelect) && <>Set Limit: {listLimit}</>} */}
                {isListType(typeSelect) && (
                  <div className="col align-items-end">
                    <SetLimit
                      perChunk={
                        isUintType(typeSelect.elementType)
                          ? 32 /
                            (typeSelect.elementType as UintType<unknown>)
                              .byteLength
                          : 256
                      }
                      setLimit={setListLimit}
                      curLimit={listLimit}
                    />
                  </div>
                )}{" "}
                {isUnionType(typeSelect) && (
                  <div className="col">
                    <Union
                      setUnion={setTypeSelect}
                      setUnionTypes={setUnionTypes}
                      setTypeNames={setUnionTypeNames}
                    />
                  </div>
                )}
                {(isVectorType(typeSelect) || isListType(typeSelect)) &&
                  !isBitVectorType(typeSelect) &&
                  !isBitListType(typeSelect) && (
                    <div className="col">
                      <SetElementType setEType={setEType} />
                    </div>
                  )}
              </div>
            </>
          )}
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="row">
                  <div className="col"></div>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="row w-100">{showInfo}</div>
        </div>
      </div>
    </div>
  );
}
