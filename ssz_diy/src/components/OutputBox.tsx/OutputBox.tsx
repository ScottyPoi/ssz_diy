import DeserializeOutputBox from "./DeserializeOutputBox";
import SerializeOutputBox from "./SerializeOutputBox";
import ValidateOutputBox from "./ValidateOutputBox";

interface OutputBoxProps {
    mode: number
    value: any;
    htr: string;
    serialized: string;
    cd: number;
}

export default function OutputBox(props: OutputBoxProps) {
    
    const mode: number = props.mode
    const modes = ["serialize", "deserialize", "validate"]
    
    const box: Record<string, JSX.Element> = {
        serialize: (<SerializeOutputBox serialized={props.serialized} htr={props.htr} cd={props.cd} />),
        deserialize: (<DeserializeOutputBox value={props.value} htr={props.htr} />),
        validate: (<ValidateOutputBox valid={true} />)
    }

    return (
        <div className="container">
            {box[modes[mode]]}
        </div>
    )


}