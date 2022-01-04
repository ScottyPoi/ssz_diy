import { useState } from "react";

interface setLengthProps {
  setVectorLen: React.Dispatch<React.SetStateAction<number>>;
  currentLen: number;
}

export default function SetLength(props: setLengthProps) {
  const [newVectorLen, setNewVectorLen] = useState<number>(props.currentLen);
  const setVectorLen = props.setVectorLen;
  return (
    <>
      <div className="col-3 p-0">
        <input
          type="number"
          className="form-control"
          id="setLength"
          placeholder={props.currentLen.toString()}
          min={1}
          onChange={(e) => setNewVectorLen(Number(e.target.value))}
        />
      </div>
      <div className="col-3 p-0 justify-content-center">
        <button
          type="button"
          className="btn btn btn-primary"
          onClick={() => setVectorLen(newVectorLen)}
        >
          <span style={{fontSize: '0.7rem'}}>Set Vector Length</span>
        </button>
      </div>
    </>
  );
}
