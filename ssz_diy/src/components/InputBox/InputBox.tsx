import { BasicType, CompositeType, isBasicType, isCompositeType, toHexString, Type } from "@chainsafe/ssz";
import { randBasic } from "../randUint";
import DeserializeInputBox from "./DeserializeInputBox";
import SerializeInputBox from "./SerializeInputBox";
import ValidateInputBox from "./ValidateInputBox";

interface InputProps {
  mode: number;
  type: BasicType<any> | CompositeType<any>;
  data: number | unknown[] | bigint | boolean
}

export default function InputBox(props: InputProps) {
  const data = props.data
  const ser = props.type.serialize(data);
  const htr = props.type.hashTreeRoot(data);
  const values = props.data

  const m = props.mode;
  const mode =
    m === 0 ? (
      <SerializeInputBox value={values.toString() as string} ser={toHexString(ser)} />
    ) : m === 1 ? (
      <DeserializeInputBox htr={toHexString(htr)} />
    ) : (
      <ValidateInputBox
        value={props.type.toJson(data)?.toString() as string}
        htr={toHexString(htr)}
        serialized={toHexString(ser)}
      />
    );

  return <div className="d-flex flex-box">{mode}</div>;
}
