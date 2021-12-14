import { useEffect, useState } from "react";
import { ByteVector, ByteVectorType, toHexString } from "@chainsafe/ssz";

interface SerializeOutputBoxProps {
  serialized: string;
  htr: string;
  cd: number;
}

export default function SerializeOutputBox(props: SerializeOutputBoxProps) {
  const [CF, setCF] = useState("Serialized");
  const functions = ["Serialized", "HashTreeRoot", "ChunkDepth"];
  const display: Record<string, any> = {
    Serialized: props.serialized,
    HashTreeRoot: props.htr,
    ChunkDepth: props.cd,
  };

  return (
    <div className="row">
      <div className="col-2 p-1 m-1">
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
      <div className="col-3 my-1 mx-4 p-1">
        <textarea value={display[CF]} />
      </div>
      <div className="col-5 my-1 mx-4 py-1 px-2">
        <table className="table table-sm">
          <tbody>
            <tr>
              <th scope="row">Serialized Length</th>
              <td>{props.cd}</td>
            </tr>
            <tr>
              <th scope="row">Serialized Length</th>
              <td>{props.cd}</td>
            </tr>
            <tr>
              <th scope="row">Serialized Length</th>
              <td>{props.cd}</td>
            </tr>
            <tr>
              <th scope="row">Serialized Length</th>
              <td>{props.cd}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
