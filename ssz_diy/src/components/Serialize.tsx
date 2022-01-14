import { useEffect, useState } from "react";
import InputBox from "./InputBox/InputBox";
import {
  BasicType,
  BasicVectorType,
  BigIntUintType,
  BitVectorType,
  BooleanType,
  CompositeType,
  isBasicType,
  isCompositeType,
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
  isBooleanType,
  BitVector,
  BitList,
  UnionType,
  isUnionType,
  isContainerType,
  ContainerType,
} from "@chainsafe/ssz";
import { randBasic, randList, randomDataSet, randVector } from "./randUint";
import SelectType from "./SelectType";
import InfoTable from "./OutputBox.tsx/InfoTable";
import SetLength from "./setLength";
import SetElementType from "./SetElementType";
import { SetLimit } from "./SetLimit";
import RandomData, { UnionObject } from "../RandomData";
import { types } from "util";
import Union from "./Union";
import Container from "./Container";

interface SerializeProps {
  userTypes: string[];
}

export default function Serialize(props: SerializeProps) {
  const [unionTypes, setUnionTypes] = useState<Type<any>[]>([
    new BigIntUintType({ byteLength: 32 }),
  ]);
  const [containerTypes, setContainerTypes] = useState<
    Record<string, Type<any>>
  >({ "exampleKey": new BigIntUintType({ byteLength: 32 }) });
  const [unionTypeNames, setUnionTypeNames] = useState<string[]>(["Uint256"]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputMode, setInputMode] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [proofNode, setProofNode] = useState<number>(7);
  const [typeName, setTypeName] = useState("Boolean");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [elementType, setEType] = useState<Type<any>>(
    new NumberUintType({ byteLength: 8 })
  );
  const [vectorLen, setVectorLen] = useState(100);
  const [listLimit, setListLimit] = useState(512);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showInfo, setShowInfo] = useState(<></>);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typeSelect, setTypeSelect] = useState<Type<unknown>>(
    new BooleanType()
  );

  const [values, setValues] = useState<
    number | bigint | boolean | unknown[] | UnionObject
  >(0);

  async function getTypeSelect() {
    return typeSelect;
  }
  async function getValues() {
    return values;
  }
  async function getTypeName() {
    return typeName;
  }
  async function getEType() {
    return elementType;
  }
  useEffect(() => {
    setShowInfo(<></>);
    getTypeSelect().then((_type) => {
      if (isBitListType(_type)) {
        setListLimit(512);
      } else if (isListType(_type)) {
        getEType().then((eType) => {
          let limit = isBooleanType(eType)
            ? 512
            : isUintType(eType)
            ? 64 / eType.byteLength
            : 256;
          setListLimit(limit);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSelect]);
  useEffect(() => {
    getTypeName().then((_type) => {
      setShowInfo(<></>);
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
          : new BooleanType();
      setTypeSelect(t);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeName, listLimit, vectorLen, elementType, unionTypes, containerTypes]);

  //     useEffect(() => {
  //       function lenPrompt() {
  //     onOpen();
  //   }
  //   _type === "BitVector" && lenPrompt();
  // }, [typeSelect, _type, onOpen]);

  const nativeTypes: Record<string, string[]> = {
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
    Custom: [...props.userTypes],
  };

  async function makeInfo() {
    const t = await getTypeSelect();
    const dataSet = randomDataSet(t)
    setValues(dataSet)
    setShowInfo(<InfoTable data={dataSet} type={t} />);

    // RandomData({ t, setValues }).then((values) => {
    //   setValues(values);
    //   setShowInfo(<InfoTable data={values} type={typeSelect} />);
    // });
  }

  return (
    <div className="container m-0 p-0 vw-100 vh-100">
      <div className="row m-0 p-0 vh-100 vw-100">
        <SelectType
          set_Type={setTypeName}
          _type={typeName}
          nativeTypes={nativeTypes}
        />
        <div className="col">
          <div className="row">
            {/* <div className="col-1">
            <h4>Type</h4>
            </div> */}
            <div className="col-9">
              <textarea
                className="form-control m-2"
                style={{ fontSize: "1rem" }}
                readOnly
                rows={2}
                value={`${typeName}${
                  isVectorType(typeSelect)
                    ? `<length: ${vectorLen}${
                        isVectorType(typeSelect) && !isBitVectorType(typeSelect)
                          ? `, elementType: Uint${
                              8 * (elementType as UintType<unknown>).byteLength
                            }`
                          : ``
                      }>`
                    : isListType(typeSelect)
                    ? `<limit: ${listLimit}${
                        !isBitListType(typeSelect)
                          ? `, elementType: Uint${
                              (elementType as UintType<unknown>).byteLength * 8
                            }`
                          : ``
                      }>`
                    : isUnionType(typeSelect)
                    ? `<types: [${unionTypeNames}]>`
                    : ``
                }`}
              />
            </div>
            <div className="col-3">{<InputBox makeInfo={makeInfo} />}</div>
          </div>
          {isContainerType(typeSelect) && (
            <Container setContainerTypes={setContainerTypes} />
          )}
          <div className="row">
            {" "}
            {isVectorType(typeSelect) && (
              <div className="col align-items-end">
                <SetLength setVectorLen={setVectorLen} currentLen={vectorLen} />
              </div>
            )}
            {/* {isListType(typeSelect) && <>Set Limit: {listLimit}</>} */}
            {isListType(typeSelect) && (
              <div className="col align-items-end">
                <SetLimit
                  perChunk={
                    isUintType(typeSelect.elementType)
                      ? 32 /
                        (typeSelect.elementType as UintType<unknown>).byteLength
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
