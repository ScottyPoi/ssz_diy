/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import SelectElementType from "./SelectElementType"

type ListMenuProps = {}

export default function UnionMenu(props: ListMenuProps) {
    
    const [curType, setCurType] = useState("")
    
    return (
        <div className='row'>
            <SelectElementType types={[]} name="Union Types" setType={setCurType} />
        </div>
    )
}