import { ByteVectorType, toHexString } from "@chainsafe/ssz";
import DeserializeInputBox from "./DeserializeInputBox";
import SerializeInputBox from "./SerializeInputBox";
import ValidateInputBox from "./ValidateInputBox";

interface InputProps {
  mode: number;
}

export default function InputBox(props: InputProps) {

    const ByteVector96 = new ByteVectorType({length: 96})
    const s = [];
    for (let index = 0; index < 96; index++) {
        s.push(Math.floor(Math.random() * 255));
        
    }
    const ser = ByteVector96.serialize(s)
    const htr = ByteVector96.hashTreeRoot(s)
  const m = props.mode;
  const mode =
    m === 0 ? (
      <SerializeInputBox value={s.toString()} />
    ) : m === 1 ? (
      <DeserializeInputBox htr={toHexString(htr)} />
    ) : 
      <ValidateInputBox value={s.toString()} htr={toHexString(htr)} serialized={toHexString(ser)} />
    
  return (
    <div className="d-flex flex-box">
      {mode}
    </div>
  );
}
