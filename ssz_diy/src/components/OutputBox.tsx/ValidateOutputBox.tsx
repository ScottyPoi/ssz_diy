import { useEffect, useState } from "react";

interface ValidateOutputBoxProps {
  valid: boolean;
}

export default function ValidateOutputBox(props: ValidateOutputBoxProps) {
  const [status, updateStatus] = useState("VALIDATE");
    const [color, setColor] = useState("danger")
  function validate() {
    setTimeout(() => updateStatus("VALIDATING..."), 500);
    setTimeout(() => updateStatus("VALIDATION COMPLETE"), 3000);
  }
  
  useEffect(() => {
      let c = status === "VALIDATE" ? "danger" : status === 'VALIDATING...' ? "warning" : "success"
    setColor(c)
    }, [status])



  return (
    <div>
      <button
        className={`btn btn-outline-${color}`}
        onClick={
          status === "VALIDATE"
            ? () => validate()
            : () => updateStatus("VALIDATE")
        }
      >
        {status}
      </button>
     <h2 className="text-center">
         {props.valid && status === "VALIDATION COMPLETE" && `Hash Tree Root Valid`}
         </h2> 
    </div>
  );
}
