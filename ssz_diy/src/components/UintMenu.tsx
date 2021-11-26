import { useEffect, useState } from "react";

type UintProps = {
    setString: Function
}
export function UintMenu(props: UintProps) {
    const [byteLength, setByteLength] = useState("")

    useEffect(() => {
      props.setString(`<byteLength: ${byteLength}>`)
    })

    return (
        <select
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg SSZ Type"
        onChange={(e) => setByteLength(e.target.value)}
      >
        <option selected>Select Bytelength</option>
        <option value="8">byteLength: 8</option>
        <option value="16">byteLength: 16</option>
        <option value="32">byteLength: 32</option>
        <option value="64">byteLength: 64</option>
        <option value="128">byteLength: 128</option>
        <option value="128">byteLength: 256</option>
      </select>    )
}