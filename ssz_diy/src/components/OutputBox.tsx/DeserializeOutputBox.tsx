import { useState } from "react";

interface DeserializeOutputBoxProps {
  value: any;
  htr: string;
}

export default function DeserializeOutputBox(props: DeserializeOutputBoxProps) {
  const [CF, setCF] = useState("");
  const functions = ["Deserialized", "HashTreeRoot"];
  const display: Record<string, any> = {
    Deserialized: props.value,
    HashTreeRoot: props.htr,
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
      </div>
    </div>
  );
}
