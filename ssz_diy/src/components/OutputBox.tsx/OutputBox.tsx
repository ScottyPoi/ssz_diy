import { CompositeType } from "@chainsafe/ssz";
import { useEffect, useState } from "react";
import DeserializeOutputBox from "./DeserializeOutputBox";
import SerializeOutputBox from "./InfoTable";
import ValidateOutputBox from "./ValidateOutputBox";
import { Type } from '@chainsafe/ssz'

interface OutputBoxProps {
  mode: number;
  data: number | unknown[] | bigint | boolean;
    setProofNode: Function;
  type: Type<unknown>
  }

export default function OutputBox(props: OutputBoxProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_idx, setIdx] = useState(4);

  useEffect(() => {
    props.setProofNode(_idx);
  }, [_idx, props]);

  // const data = props.type.defaultValue()


  let _type = props.type as CompositeType<Type<unknown>>

  const mode: number = props.mode;
  const modes = ["serialize", "deserialize", "validate"];

  const box: Record<string, JSX.Element> = {
    serialize: <SerializeOutputBox data={props.data} type={_type} />,
    deserialize: <DeserializeOutputBox type={_type} />,
    validate: <ValidateOutputBox valid={true} />,
  };
  // let tree = _type.struct_convertToTree(data as Type<unknown>);

  return (
    <div className="container">
      <div className="row">
      {box[modes[mode]]}
      </div>
    </div>
  );
}
