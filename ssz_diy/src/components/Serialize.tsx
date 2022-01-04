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
} from "@chainsafe/ssz";
import { randBasic, randList, randVector } from "./randUint";
import SelectType from "./SelectType";
import InfoTable from "./OutputBox.tsx/InfoTable";
import SetLength from "./setLength";
import SetElementType from "./SetElementType";
import { SetLimit } from "./SetLimit";
import RandomData from "../RandomData";

interface SerializeProps {
  userTypes: string[];
}

export default function Serialize(props: SerializeProps) {
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
  const [typeSelect, setTypeSelect] = useState<
    BasicType<any> | CompositeType<any>
  >(new BooleanType());
  const [values, setValues] = useState<number | boolean | bigint | unknown[]>(
    0
  );

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
      setShowInfo(<></>)
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
          : new BooleanType();
      // if (isBasicType(t)) {
      //   setValues(randBasic(t));
      // } else if (isCompositeType(t)) {
      //   if (isVectorType(t)) {
      //     const data = randVector(t);
      //     const vals = isBitVectorType(t)
      //       ? t.tree_iterateValues(t.struct_convertToTree(data as BitVector))
      //       : t.tree_iterateValues(t.struct_convertToTree(data));
      //     setValues(Array.from(vals));
      //   } else if (isListType(t)) {
      //     const data = randList(t);
      //     const vals = isBitListType(t)
      //       ? t.tree_iterateValues(t.struct_convertToTree(data as BitList))
      //       : t.tree_iterateValues(t.struct_convertToTree(data));

      //     setValues(Array.from(vals));
      //   }
      // }
      setTypeSelect(t);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeName, listLimit, vectorLen, elementType]);

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

    Array: [
      "BitVector",
      "BitList",
      "Vector",
      "List",
    ],
    Container: ["Container"],
    Union: ["Union"],
    Custom: [...props.userTypes],
  };


  async function makeInfo() {
    const t = await getTypeSelect()
    RandomData({t, setValues}).then((values) => {
      setValues(values)
      setShowInfo(<InfoTable data={values} type={typeSelect} />);
    })
  }

  return (
    <div className="container m-0 p-0 vw-100 vh-100">
      <div className=" justify-content-center row w-50">
        <div className="col-4">
          {/* <VectorPrompt onOpen={onOpen} onClose={onClose} isOpen={isOpen} vectorLen={vectorLen} setVectorLen={setVectorLen} /> */}
        </div>
      </div>
      <div className="row m-0 p-0 vh-100 vw-100">
        <SelectType
          set_Type={setTypeName}
          _type={typeName}
          nativeTypes={nativeTypes}
        />
        <div className="col w-90 h-100 border">
          <div className="row">
            <div className="col">
              <div className="row">Type</div>
              <div className="row">
                <input
                  readOnly
                  type="text"
                  value={`${typeName}${
                    isVectorType(typeSelect)
                      ? `<length: ${vectorLen}${
                          isVectorType(typeSelect) &&
                          !isBitVectorType(typeSelect)
                            ? `, elementType: Uint${
                                8 *
                                (elementType as UintType<unknown>).byteLength
                              }`
                            : ``
                        }>`
                      : isListType(typeSelect)
                      ? `<limit: ${listLimit}${
                          !isBitListType(typeSelect)
                            ? `, elementType: Uint${
                                (elementType as UintType<unknown>).byteLength *
                                8
                              }`
                            : ``
                        }>`
                      : ``
                  }`}
                />
              </div>
              <div className="row">
                {isVectorType(typeSelect) && (
                  <SetLength
                    setVectorLen={setVectorLen}
                    currentLen={vectorLen}
                  />
                )}
                {/* {isListType(typeSelect) && <>Set Limit: {listLimit}</>} */}
                {isListType(typeSelect) && (
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
                )}
                <div className="col border">
                  {(isVectorType(typeSelect) || isListType(typeSelect)) &&
                    !isBitVectorType(typeSelect) &&
                    !isBitListType(typeSelect) && (
                      <SetElementType setEType={setEType} />
                    )}
                </div>
              </div>
            </div>
            <div className="col">
              {<InputBox makeInfo={makeInfo}/>}
            </div>
          </div>
          <div className="row w-100">
            {showInfo}
          </div>
        </div>
        {/* <div className="col-5 h-100 overflow-auto">
          <VisualColumn type={typeSelect} proofNode={proofNode} data={values} />
        </div> */}
      </div>
    </div>
  );
}
