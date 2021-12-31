import {
  CompositeType,
  isBasicType,
  isCompositeType,
  toHexString,
  Type,
} from "@chainsafe/ssz";

interface SerializeOutputBoxProps {
  type: Type<any>;
  data: number | unknown[] | bigint | boolean;
  // setProofNode: Function;
}

function getProofNodes(leaf: number) {
  let nodes = [];
  if (leaf % 2 === 0) {
    nodes.push(leaf + 1);
    (leaf / 2) % 2 === 0
      ? nodes.push(leaf / 2 + 1)
      : nodes.push(leaf / 2 - 1);
  } else {
    nodes.push(leaf - 1);
    ((leaf - 1) / 2) % 2 === 0
      ? nodes.push((leaf - 1) / 2 + 1)
      : nodes.push((leaf - 1) / 2 - 1);
  }
  return nodes;
}

export default function SerializeOutputBox(props: SerializeOutputBoxProps) {
  const data = props.data
  const serialized = props.type.serialize(data);
  const hashTreeRoot = props.type.hashTreeRoot(data);
  const deserialized = props.type.deserialize(serialized)
  function showTree() {
    const compType = props.type as CompositeType<any>
    const tree = compType.struct_convertToTree(deserialized as Type<unknown>);
    const leafGindices = compType.tree_getLeafGindices();
    const values = compType.tree_iterateValues(tree);
    const valuesArray = Array.from(values);
    return leafGindices.map((v, idx) => {
        return (<tr key={idx}>
          <th scope="row">{v.toString()}</th>
          <td>
            [{getProofNodes(Number(v)).toString()}]
          </td>
          <td className='text-break'>
            [{tree.getSingleProof(v).map((v) => {
              return `${toHexString(v).slice(0,10)}...`;
            }).toString()}] 
          </td>
        </tr>
  
    )
  })}
  const serial = Array.from(toHexString(serialized)).map((v, idx) => {
    return  (<span key={idx} style={{ fontWeight: Math.floor(idx/2) === 1 ? "bold" : "normal" }}>
    {v}
  </span> ) 
    
  });



  return (
    <>
      <div className="row">
        <div className="col my-1 mx-4 py-1 px-2">
          <table className="table table-sm">
            <tbody>
              <tr>
                <th scope="row">
                   Serialized (length: {isBasicType(props.type) ? "32" : props.type.getFixedSerializedLength()})
                </th>
                <td>
                  <text className='text-break'>{serial}</text>
                  
                  {/* <textarea readOnly className="text-break" value={`0x${serial}`} /> */}
                </td>
              </tr>
              <tr>
                <th scope="row">HashTreeRoot</th>
                <td className="text-break">{toHexString(hashTreeRoot)}</td>
              </tr>
              {isCompositeType(props.type) ? (<><tr>
                <th scope="row">Merkle Proof by Leaf:</th>
                <td colSpan={2}>
                  <table className="table">
                    <tbody>
                  {showTree()}
                  </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th scope="row">Values</th>
                <td>
                  <div className="text-break overflow-auto">
                    {/* [{valuesArray.toString()}] */}
                  </div>
                </td>
              </tr></>) : (
                <tr>
                <th scope="row">Value</th>
                <td>
                  <div className="text-break overflow-auto">
                    {deserialized.toString()}
                  </div>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
