import { useState } from "react";

interface ValidateInputBoxProps {
  value: string;
  serialized: string;
  htr: string;
}

export default function ValidateInputBox(props: ValidateInputBoxProps) {
  const [input, setInput] = useState<any>(props.value);

  return (
    <div className="container border">
      <div className="btn-group">
        <input
          type="radio"
          className="btn-check"
          checked={input === props.value}
          id="unserialized"
        />
        <label
          onClick={() => setInput(props.value)}
          htmlFor="unserialized"
          className="btn btn-outline-primary"
        >
          {" "}
          Unserialized
        </label>
        <input
          type="radio"
          checked={input === props.serialized}
          className="btn-check"
          id="serialized"
        />
        <label
          onClick={() => setInput(props.serialized)}
          htmlFor="serialized"
          className="btn btn-outline-success"
        >
          Serialized
        </label>
</div>
<div className="row">
        <input type="text" value={input} />
      </div>
      <div className="row">
        Hash_Tree_Root: <input type="text" value={props.htr} />
      </div>
    </div>
  );
}
