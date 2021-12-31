import { useEffect, useState } from "react";
import UploadFile from "../UploadFile";

interface SerializeInputBoxProps {
  value: string;
  ser: string;
}

export default function SerializeInputBox(props: SerializeInputBoxProps) {
  const [mode, setMode] = useState<string>("deserialize");
  const [data, setData] = useState(props.value);

  useEffect(() => {
    mode === "deserialize" ? setData(props.value) : setData(props.ser);
  }, [mode, props.ser, props.value]);

  return (
    <div className="col">
      <div className="row">
        {/* <div className="text-center col p-0 m-0">DATA:</div> */}
        <UploadFile />
      </div>
      <div className="row">
        <input readOnly type="text" value={data} />
      </div>
      <div className="row">
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            defaultChecked={mode === "deserialized"}
          />
          <label
            onClick={() => setMode("deserialize")}
            className="btn btn-sm btn-outline-primary"
            htmlFor="btnradio1"
          >
            Deserialized
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            defaultChecked={mode === "serialized"}
          />
          <label
            onClick={() => setMode("serialize")}
            className="btn btn-sm btn-outline-primary"
            htmlFor="btnradio2"
          >
            Serialized
          </label>
        </div>
      </div>
    </div>
  );
}
