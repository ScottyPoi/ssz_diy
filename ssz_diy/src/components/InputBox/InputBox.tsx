import { BasicType, CompositeType } from "@chainsafe/ssz";
import UploadFile from "../UploadFile";


interface InputProps {
  makeInfo: () => Promise<void>;
}

export default function InputBox(props: InputProps) {
  return (
    <div className="d-flex flex-box">
      {" "}
      <div className="col">
        <div className="row">
          <div className="col">
            {/* <div className="text-center col p-0 m-0">DATA:</div> */}
            <UploadFile />
          </div>
          <div className="col">
            <button
              onClick={async () => await props.makeInfo()}
              className="btn btn-secondary"
              type="button"
            >
              Use Random Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
