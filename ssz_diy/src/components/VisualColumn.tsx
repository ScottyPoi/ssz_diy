import { isCompositeType, Type } from "@chainsafe/ssz";
import Animation from "./Animation";
import Tree from "./VisualTree/Tree";

interface VisualColumnProps {
    type: Type<unknown>
    proofNode: number
    data: unknown;
}

export default function VisualColumn(props: VisualColumnProps) {
    const typeSelect = props.type
    const data = props.data
    const proofNode = props.proofNode
    
    return isCompositeType(typeSelect) ? (<Tree type={typeSelect} p={proofNode} />
    ) : (<><Animation type={typeSelect} data={data} /></>)
}