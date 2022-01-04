import {
  BigIntUintType,
  Number64UintType,
  NumberUintType,
  Type,
} from "@chainsafe/ssz";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface SetElementTypeProps {
  setEType: Dispatch<SetStateAction<Type<any>>>;
}

export default function SetElementType(props: SetElementTypeProps) {
  const [newType, setNewType] = useState<Type<any>>(new Number64UintType());
  const [value, setValue] = useState("Uint64");
  const setEType = props.setEType;
  const types = useMemo<Record<string, Type<any>>>(() => {
    return {
      Uint8: new NumberUintType({ byteLength: 1 }),
      Uint16: new NumberUintType({ byteLength: 2 }),
      Uint32: new NumberUintType({ byteLength: 4 }),
      Uint64: new Number64UintType(),
      Uint128: new BigIntUintType({ byteLength: 16 }),
      Uint256: new BigIntUintType({ byteLength: 32 }),
    };
  }, []);

  useEffect(() => {
    setNewType(types[value]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useEffect(() => {
    setEType(newType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newType]);


  const cmenu = (
    <select defaultValue={"Change Element Type"} onChange={(e) => setValue(e.target.value)} className='form-select' aria-label='set element type'>
      <option disabled>Change Element Type</option>
      {Object.keys(types).map((k, i) => {
          return (
            <option value={k} key={k}>{k}
              {/* <button
                onClick={() => setValue(k.toString())}
                className="dropdown-item"
                type="button"
              >
                {k}
              </button> */}
            </option>
          );
        })}
    </select>
  )

  

  

  return cmenu;
}
