/* eslint-disable @typescript-eslint/no-unused-vars */
import { toHexString } from "@chainsafe/ssz";
import { Modal } from "bootstrap";
import { useState } from "react";

export default function UploadFile() {


  const [asDes, setAsDes] = useState(true)
  const [input, setInput] = useState<string>()

  function handleClick(): void {
    const myModal = document.getElementById("FileModal") !== null && new Modal(document.getElementById("FileModal")!, {
      keyboard: false,
    });
    myModal && myModal.show();
  }
  
  function processFileContents(contents: string | ArrayBuffer) {
    try {
      if (asDes && contents instanceof ArrayBuffer) {
        setInput(toHexString(new Uint8Array(contents)))
      } else {
        setInput(contents as string);
      }
    } catch (error) {
      throw new Error(`${error}`)
    }
    throw new Error("Function not implemented.");
  }

  function onUpload(file: Blob) {
    if (file) {
      const reader = new FileReader();
      if (asDes) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
      reader.onload = (e) => {
        if (e.target?.result) {
          if (e.target !== null) {
            processFileContents(e.target.result);
          }
        };
      reader.onerror = (e) => {
        throw new Error(`error: ${e}`)
      }
      }

    }
  }

  return (
    <button className="m-1 btn btn-secondary" type="button" onClick={() => handleClick()}>
      Upload DATA from File
    </button>
  );
}

