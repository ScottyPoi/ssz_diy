interface DeserializeInputBoxProps {
    htr: string
}

export default function DeserializeInputBox(props: DeserializeInputBoxProps) {
    
    
    
    return (
        <div className="d-flex flex-box">
           Serialized: <input type="text" value={props.htr} />
        </div>
    )
}