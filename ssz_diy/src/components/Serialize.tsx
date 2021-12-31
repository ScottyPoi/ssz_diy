import { useEffect, useState } from "react";
import { bytes96 } from "../App";
import InputBox from "./InputBox/InputBox";
import OutputBox from "./OutputBox.tsx/OutputBox";
import Tree from "./VisualTree/Tree";
import { ssz } from "@chainsafe/lodestar-types";
import {
  BasicType,
  BasicVectorType,
  BigIntUintType,
  BooleanType,
  CompositeType,
  isBasicType,
  isCompositeType,
  Number64UintType,
  NumberUintType,
  Type,
  UintType,
  VectorType,
} from "@chainsafe/ssz";
import { Bytes96 } from "@chainsafe/lodestar-types/lib/sszTypes";
import { randBasic, randVector } from "./randUint";
import SelectType from "./SelectType";
import UploadFile from "./UploadFile";

const { phase0, altair, merge } = ssz;

export const forks = { ...phase0, ...altair, ...merge } as Record<
  string,
  Type<unknown>
>;

export type ForkName = keyof typeof forks;

export function typeNames<T>(types: Record<string, Type<T>>): string[] {
  return Object.keys(types).sort();
}

interface SerializeProps {
  userTypes: string[];
  exampleData: number[] | Uint8Array;
  exampleType: bytes96;
}
// function getType(typeName: string): Type<unknown> {
//   return forks[typeName]
// }

export default function Serialize(props: SerializeProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputMode, setInputMode] = useState<number>(0);
  const [proofNode, setProofNode] = useState<number>(7);
  const [_type, set_Type] = useState("Boolean");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typeSelect, setTypeSelect] = useState<BasicType<any> | CompositeType<any>>(new BooleanType());

  useEffect(() => {

    const t = _type === "Boolean"
    ? new BooleanType()
    : _type.substring(0,4) === "Uint" && parseInt(_type.substring(4)) / 8 < 64
    ? new NumberUintType({byteLength: parseInt(_type.substring(4)) / 8})
    : _type.substring(0,4) === "Uint" && parseInt(_type.substring(4)) / 8 > 64
    ? new BigIntUintType({byteLength: parseInt(_type.substring(4)) / 8})
    : new Number64UintType()
    setTypeSelect(t)

  }, [_type])

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
      //  "Container", "Union"
    ],
    Container: ["Container"],
    Union: ["Union"],
    Custom: [...props.userTypes],
  };
  const typeNames = [
    ...nativeTypes.Basic,
    ...nativeTypes.Array,
    ...props.userTypes,
  ];

  let values: number  | boolean | bigint | unknown[] = 0
  if (isBasicType(typeSelect)) {
 const _type = typeSelect as BasicType<any>
 values = randBasic(_type)
  } else if (isCompositeType(typeSelect)) {
    const data = [0]
    const _type =  typeSelect as CompositeType<any>
    values = Array.from(_type.tree_iterateValues(_type.struct_convertToTree(data)))
  }

  return (
    <div className="container m-0 p-0 vw-100 vh-100">
      {randBasic(new Number64UintType())}
      {randVector(
        new BasicVectorType({ elementType: new Number64UintType(), length: 55 })
      )}
      <div className="row m-0 p-0 vh-100 vw-100">
        <SelectType
          set_Type={set_Type}
          _type={_type}
          typeNames={typeNames}
          nativeTypes={nativeTypes}
        />
        <div className="col-5 h-100 border">
          <div className="row">
            <div className="col">
              <div className="row">Type</div>
              <div className="row">
                <input readOnly type="text" value={_type} />
              </div>
              <div className="row">
                <div className="col border">
                  <text>options</text>
                </div>
                <div className="col border">
                  <text>options</text>
                </div>
              </div>
            </div>
            <div className="col">
              {<InputBox type={typeSelect} mode={inputMode} data={values} />}
            </div>
          </div>
          <div className="row w-100">
            {
              <OutputBox
                data={values}
                type={typeSelect}
                mode={inputMode}
                setProofNode={setProofNode}
              />
            }
          </div>
        </div>
        <div className="col-5 h-100 overflow-auto">
          {isCompositeType(typeSelect) && <Tree type={typeSelect} p={proofNode} />}
        </div>
      </div>
    </div>
  );
}
