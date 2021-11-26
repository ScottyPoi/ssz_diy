/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useState } from "react";
import BooleanMenu from "./BooleanMenu";
import ListMenu from "./ListMenu";
import SelectBasicType from "./SelectBasicType";
import SelectElementType from "./SelectElementType";
import { UintMenu } from "./UintMenu";
import UnionMenu from "./UnionMenu";

type VectorProps = {
  setString: Function;
};

export default function VectorMenu(props: VectorProps) {
  const [boolean, setBoolean] = useState(false);
  const [uint, setUint] = useState(false);
  const [vector, setVector] = useState(false);
  const [list, setList] = useState(false);
  const [union, setUnion] = useState(false);
  const [type, setType] = useState("");
  const [length, setLength] = useState(1);
  const [byteLength, setByteLength] = useState("");
  const [typeOptions, setTypeOptions] = useState(``);
  const [menu, setMenu] = useState<ReactElement | undefined>();

  useEffect(() => {
    props.setString(`<elementType: ${type}${typeOptions}, length: ${length}>`);
  });

  useEffect(() => {
    switch (type) {
      case "BooleanType":
        setMenu(undefined);
        setBoolean(true);
        setUint(false);
        setVector(false);
        setList(false);
        setUnion(false);
        break;
      case "UintType":
        setMenu(<UintMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(true);
        setVector(false);
        setList(false);
        setUnion(false);
        break;
      case "VectorType":
        setMenu(<VectorMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(false);
        setVector(true);
        setList(false);
        setUnion(false);
        break;
      case "ListType":
        setMenu(<ListMenu setString={setTypeOptions} />);
        setBoolean(false);
        setUint(false);
        setVector(false);
        setList(true);
        setUnion(false);
        break;
      case "UnionType":
        setMenu(<UnionMenu />);
        setBoolean(false);
        setUint(false);
        setVector(false);
        setList(false);
        setUnion(true);
        break;
    }
  }, [type]);

  return (
    <div className="row ps-2 ms-2">
      <div className="col">
        <div className="row p-2"></div>
        <div className="row">
          <SelectBasicType name="elementType" setType={setType} />
        </div>
      </div>

      <div className="col">
        <div className="row justify-content-start py-2">
          Set Vector Length: 
            <input
              type="number"
              value={length}
              min={1}
              onChange={(e) => setLength(Number(e.target.value))}
            />
        </div>
        <div className="row">{menu && menu}</div>
      </div>
    </div>
  );
}
