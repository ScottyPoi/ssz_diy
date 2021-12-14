interface SerializeInputBoxProps {
    value: string
}

export default function SerializeInputBox(props: SerializeInputBoxProps) {
    return (
        <div className="col">
            <div className="row">

            Data: <input type="text" value={props.value}/>
            </div>
            <div className="row">Type: <input type='text' value="Bytes96" /></div>
        </div>
    )
}