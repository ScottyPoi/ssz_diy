import { BasicType, CompositeType } from "@chainsafe/ssz";
import UploadFile from "../UploadFile";

interface InputProps {
  makeInfo: () => Promise<void>;
}

export default function InputBox(props: InputProps) {
  return (
    <div className="btn-group m-1">
        <UploadFile />
        <button
          onClick={async () => await props.makeInfo()}
          className="btn btn-secondary m-1"
          type="button"
        >
          Use Random Data
        </button>
      </div>
  );
}
