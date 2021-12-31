/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useState } from "react";
import VectorMenu from "./VectorMenu";
import BitVectorMenu from "./BitVectorMenu";
import { UintMenu } from "./UintMenu";
import UnionMenu from "./UnionMenu";
import SelectBasicType from "./SelectBasicType";
import BitListMenu from "./BitListMenu";

type ListProps = {
  setString: Function;
};

export default function ListMenu(props: ListProps) {
  const [boolean, setBoolean] = useState(false);
  const [uint, setUint] = useState(false);
  const [vector, setVector] = useState(false);
  const [bitVector, setBitVector] = useState(false);
  const [list, setList] = useState(false);
  const [bitList, setBitList] = useState(false);
  const [union, setUnion] = useState(false);
  const [type, setType] = useState("Type");
  const [limit, setLimit] = useState<number | string>("Limit");
  const [byteLength, setByteLength] = useState("");
  const [typeOptions, setTypeOptions] = useState(``);
  const [menu, setMenu] = useState<ReactElement | undefined>();

  useEffect(() => {
    props.setString(`[${type}${typeOptions}, ${limit}]`);
  });

  useEffect(() => {
    switch (type) {
      case "Boolean":
        setMenu(undefined);
        setBoolean(true);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);
        setUnion(false);
        break;
      case "Uint":
        setMenu(<UintMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(true);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(false);;
        setUnion(false);
        break;
      case "Vector":
        setMenu(<VectorMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(false);
        setVector(true);
         setBitVector(false);
        setList(false);
        setBitList(false);;
        setUnion(false);
        break;
      case "BitVector":
        setMenu(<BitVectorMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(false);
        setVector(false);
         setBitVector(true);
        setList(false);
        setBitList(false);;
        setUnion(false);
        break;
      case "List":
        setMenu(<ListMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(false);
        setVector(false);
        setList(true);
        setBitVector(false);
        setBitList(false);
        setUnion(false);
        break;
      case "BitList":
        setMenu(<BitListMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(false);
        setVector(false);
        setBitVector(false);
        setList(false);
        setBitList(true);
                setUnion(false);
        break;
      case "Union":
        setMenu(<UnionMenu />);
        setBoolean(false);
        setUint(false);
        setVector(false);
         setBitVector(false);
        setList(false);
        setBitList(false);;
        setUnion(true);
        break;
    }
  }, [type]);

  return (
    <div className="row ps-2 ms-2">
      <div className="col pt-2 mt-2">
        <div className="row">
          <SelectBasicType name="elementType" setType={setType} />
        </div>
        <div className="row p-2"><h3>
          Set Limit: {limit}  
          <input
            type="range"
            className="form-range"
            min="0"
            max="32"
            id="customRange3"
            onChange={(e) => setLimit(2 ** Number(e.target.value))}
          /></h3>
        </div>
      </div>

      <div className="col">{menu && menu}</div>
    </div>
  );
}
