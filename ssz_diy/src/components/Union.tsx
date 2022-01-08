import { BasicType, BigIntUintType, CompositeType, isBooleanType, isUintType, Type, UnionType } from "@chainsafe/ssz";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SetElementType from "./SetElementType";

interface UnionProps {
    setUnion: Dispatch<SetStateAction<BasicType<any> | CompositeType<any>>>
    setUnionTypes: Dispatch<SetStateAction<Type<any>[]>>
    setTypeNames: Dispatch<SetStateAction<string[]>>

}

export default function Union(props: UnionProps) {
  const [types, setTypes] = useState<Type<any>[]>([
    new BigIntUintType({ byteLength: 32 }),
  ]);
  const [selected, setSelected] = useState<Type<any>>(
    new BigIntUintType({ byteLength: 32 })
  );
  const [idx, setIdx] = useState(0);
  const [idxRemove, setIdxRemove] = useState(0);
  const [union, setUnion] = useState(new UnionType({ types: [] }));

  useEffect(() => {
    setUnion(new UnionType({ types: types }));
    props.setUnionTypes(types)
    props.setTypeNames(types.map((type) => {return nameString(type)}))
    props.setUnion(union)

}, [types]);

  function addType(type: Type<unknown>, idx?: number) {
    let t = [...types];
    if (idx) {
      setTypes(Array.from([...t.slice(0, idx), type, ...t.slice(idx)]));
    } else {
      t.push(type);
      return setTypes(t);
    }
  }

  function nameString(type: Type<any>): string {
      if (isBooleanType(type)) {
          return "boolean"
      } else if (isUintType(type)) {
          return `Uint${type.byteLength * 8}`
      } else return "null"
  }

  function removeType(idx: number) {
    let beg = types.slice(0, idx);
    let end = types.slice(idx + 1);
    setTypes(Array.from([...beg, ...end]));
  }

  return (
    <div className="container">
      <div className="row">
        <SetElementType setEType={setSelected} />
      </div>
      <div className="row">
        <button onClick={() => addType(selected, idx)}>
          add Type at index:{" "}
          <input
            type="number"
            value={types.length}
            onChange={(e) => setIdx(parseInt(e.target.value))}
          />{" "}
        </button>
      </div>
      <div className="row">
        <button onClick={() => removeType(idx)}>
          remove Type at index:{" "}
          <input
            type="number"
            value={idxRemove}
            onChange={(e) => setIdxRemove(parseInt(e.target.value))}
          />{" "}
        </button>
      </div>
    </div>
  );
}
