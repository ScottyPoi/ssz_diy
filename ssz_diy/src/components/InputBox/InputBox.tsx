import { Type } from "@chainsafe/ssz";
import * as bootstrap from "bootstrap";
import UploadFile from "../UploadFile";

interface InputProps {
  type: Type<any>
  makeInfo: () => Promise<void>;
}


export default function InputBox(props: InputProps) {
  function handleEnterData() {
    const myModal =
    document.getElementById(`EnterDataManuallyModal`) !== null &&
    new bootstrap.Modal(
      document.getElementById(`EnterDataManuallyModal`)!,
      {
        keyboard: false,
      }
      );
      myModal && myModal.show();
  }
  
  return (
    <div className="btn-group m-1">
      <button type="button" className="btn btn-secondary m-1">
        Save Type as Alias
      </button>
      <UploadFile />
      <button
        onClick={async () => await props.makeInfo()}
        className="btn btn-secondary m-1"
        type="button"
      >
        Use Random Data
      </button>
      <button
        type="button"
        className="btn btn-secondary m-1"
        onClick={() => handleEnterData()}
      >
        Enter Data Manually
      </button>
    </div>
  );
}
