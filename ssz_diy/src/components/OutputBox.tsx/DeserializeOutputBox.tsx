import {
  CompositeType,
  toHexString,
  Type,
} from "@chainsafe/ssz";
import { useState } from "react";

interface DeserializeOutputBoxProps {
  type: Type<unknown>;
}

export default function DeserializeOutputBox(props: DeserializeOutputBoxProps) {
  const [CF, setCF] = useState("");
  const functions = ["Deserialized", "HashTreeRoot"];
  let data = props.type.defaultValue() as Type<unknown>;
  let _type = props.type as CompositeType<Type<unknown>>;
  let tree = _type.struct_convertToTree(data)
  let vals = _type.tree_iterateValues(tree)
  let des = Array.from(vals)
  const display: Record<string, any> = {
    Deserialized: des.toString(),
    HashTreeRoot: toHexString(_type.hashTreeRoot(data)),
  };

  return (
    <div className="row">
      <div className="col">
        <h4 className="text-center">output</h4>

        <div className="btn-group-vertical">
          {functions.map((f) => {
            return (
              <>
                <input
                  id={f}
                  type="radio"
                  className="btn-check"
                  checked={CF === f}
                />
                <label
                  className="btn btn-outline-secondary"
                  htmlFor={f}
                  onClick={() => setCF(f)}
                >
                  {f}
                </label>
              </>
            );
          })}
        </div>
      </div>
      <div className="col">
        <textarea value={display[CF]} />
        {display[CF]}
      </div>
    </div>
  );
}
