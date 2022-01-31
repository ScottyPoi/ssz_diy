import { Tree } from "@chainsafe/persistent-merkle-tree";
import {
  CompositeType,
  isBasicType,
  isBitListType,
  isCompositeType,
  isContainerType,
  isListType,
  isUnionType,
  isVectorType,
  NumberUintType,
  toHexString,
  Type,
} from "@chainsafe/ssz";
import { Text } from "@chakra-ui/react";
import { UnionObject } from "../../RandomData";
import { dataSet } from "../randUint";

interface InfoTableProps {
  type: Type<any>;
  data: dataSet;
  tree?: Tree;
  container?: boolean;
  leaves?: bigint[];
  // setProofNode: Function;
}

function getProofNodes(leaf: number) {
  let l = leaf;
  let nodes = [];
  while (l > 1) {
    if (l % 2 === 0) {
      nodes.push(l + 1);
      l = l / 2;
    } else {
      nodes.push(l - 1);
      l = (l - 1) / 2;
    }
  }
  return nodes;
}

export default function InfoTable(props: InfoTableProps) {
  // const _tree = props.tree;
  const data = props.data;
  const serialized = props.type.serialize(data);
  const hashTreeRoot = props.type.hashTreeRoot(data);
  const deserialized = props.type.deserialize(serialized);
  const json = props.type.toJson(deserialized);
  // const containerLeaves = props.leaves ? props.leaves : isContainerType(props.type) ? props.type.tree_getLeafGindices(props.type.struct_convertToTree(props.data)) : undefined
  function showTree(compType: CompositeType<any>) {
    // const compType = props.type as CompositeType<Type<unknown>>;
    const tree = compType.struct_convertToTree(deserialized);

    const leafGindices = isContainerType(compType)
      ? Object.keys(compType.fields).map((field) => {
          return compType.getPropertyGindex(field);
        })
      : compType.tree_getLeafGindices(tree);
    return leafGindices.map((v, idx) => {
      return (
        <tr key={idx}>
          <th scope="row">
            {/* {containerLeaves.toString()} */}
            {v.toString()}
            {props.leaves && props.leaves[idx + 1].toString()}
            {isContainerType(compType) &&
              `: ${Object.keys(compType.fields)[idx]}`}
          </th>
          <td>[{getProofNodes(Number(v)).toString()}]</td>
          {/* <td>[{props.leaves && getProofNodes(Number(props.leaves[idx])).toString()}]</td> */}
          <td className="text-break">
            [
            {tree.getSingleProof(v).map((p, idx) => {
              return (
                <>
                  {toHexString(p)}
                  {idx !== tree.getSingleProof(v).length - 1 && (
                    <>
                      , <br />
                    </>
                  )}
                </>
              );
            })}
            ]
          </td>
        </tr>
      );
    });
  }
  const serial = Array.from(toHexString(serialized)).map((v, idx) => {
    return (
      <span
        key={idx}
        style={{ fontWeight: Math.floor(idx / 2) === 1 ? "bold" : "normal" }}
      >
        {v}
      </span>
    );
  });

  return (
    <>
      <div className="row justify-content-between border-bottom my-1 mx-4 py-1 px-2">
        <div className="col-1">
          Serialized <br />
          {isVectorType(props.type) &&
            `(length: ${props.type.getFixedSerializedLength()})`}
          <br />
          {isListType(props.type) && isBitListType(props.type)
            ? `(length: ${(data as unknown[]).length} / ${props.type.limit})`
            : isListType(props.type) &&
              !isBitListType(props.type) &&
              `(length: ${(data as unknown[]).length} / ${
                props.type.getMaxSerializedLength() /
                // @ts-ignore
                props.type.elementType.byteLength
              })`}
          <br />
          {isListType(props.type) &&
            `(bytes: ${props.type.tree_getSerializedLength(
              // @ts-ignore
              props.type.struct_convertToTree(data)
            )} / ${
              isBitListType(props.type)
                ? props.type.limit / 8
                : props.type.getMaxSerializedLength()
            })`}
        </div>
        <div
          className="col-9 text-break p-0 m-0 px-2 mx-2"
          style={{ maxHeight: "100px", overflowY: "scroll" }}
        >
          {serial}
        </div>
      </div>

      <div className="table-responsive my-1 mx-4 py-1 px-2">
        <table className="table table-sm">
          <tbody style={{ fontSize: "0.7rem" }}>
            {/* <tr style={{ maxHeight: "100px", overflowY: "scroll" }}>
              <th>
                Serialized
                {isVectorType(props.type) &&
                  `(length: ${props.type.getFixedSerializedLength()})`}
                <br />
                {isListType(props.type) && isBitListType(props.type)
                  ? `(length: ${(data as unknown[]).length} / ${
                      props.type.limit
                    })`
                  : isListType(props.type) &&
                    !isBitListType(props.type) &&
                    `(length: ${(data as unknown[]).length} / ${
                      props.type.getMaxSerializedLength() /
                      // @ts-ignore
                      props.type.elementType.byteLength
                    })`}
                <br />
                {isListType(props.type) &&
                  `(bytes: ${props.type.tree_getSerializedLength(
                    // @ts-ignore
                    props.type.struct_convertToTree(data)
                  )} / ${
                    isBitListType(props.type)
                      ? props.type.limit / 8
                      : props.type.getMaxSerializedLength()
                  })`}
              </th>
              <td>{serial}</td>
              {Number(9).toString()}
            </tr> */}
            {isBasicType(props.type) && (
              <tr>
                <th scope="row">Serialized (padded to 32 Bytes)</th>
                <td>
                  <Text className="text-break">
                    {toHexString(hashTreeRoot)}
                  </Text>

                  {/* <textarea readOnly className="text-break" value={`0x${serial}`} /> */}
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">
                HashTreeRoot
                <br />
                (G-Index 1)
              </th>
              <td className="text-break">{toHexString(hashTreeRoot)}</td>
            </tr>
            {isListType(props.type) &&
              props.type.struct_getChunkCount(deserialized) > 1 && (
                <tr>
                  <th scope="row">
                    Merkle Root
                    <br />
                    (G-Index 2)
                  </th>
                  <td className="text-break">
                    {toHexString(
                      props.type
                        .struct_convertToTree(deserialized)
                        .getRoot(BigInt(2))
                    )}
                  </td>
                </tr>
              )}
            {(isUnionType(props.type) || isListType(props.type)) && (
              <tr>
                <th scope="row">
                  Merkle Root of Value
                  <br />
                  (G-Index 2)
                </th>
                <td className="text-break">
                  {toHexString(
                    props.type
                      .struct_convertToTree(deserialized)
                      .getRoot(BigInt(2))
                  )}
                </td>
              </tr>
            )}
            {isUnionType(props.type) && (
              <tr>
                <th scope="row">
                  Selector: type[
                  {new NumberUintType({ byteLength: 32 }).deserialize(
                    props.type
                      .struct_convertToTree(deserialized)
                      .getRoot(BigInt(3))
                  )}
                  ]
                  <br />
                  (G-Index 3)
                </th>
                <td className="text-break">
                  {toHexString(
                    props.type
                      .struct_convertToTree(deserialized)
                      .getRoot(BigInt(3))
                  )}
                </td>
              </tr>
            )}
            {isListType(props.type) && (
              // props.type.struct_getChunkCount(deserialized) > 1 &&
              <tr>
                <th scope="row">
                  Length ({(data as any[]).length})
                  <br />
                  (G-Index 3)
                </th>
                <td className="text-break">
                  {/* {toHexString(new NumberUintType({byteLength: 32}).serialize(props.type.tree_getLength(props.type.struct_convertToTree(deserialized))))} */}

                  {/* {props.type.tree_getLength(props.type.struct_convertToTree(deserialized))} */}
                  {toHexString(
                    props.type
                      .struct_convertToTree(deserialized)
                      .getRoot(BigInt(3))
                  )}
                </td>
              </tr>
            )}
            {isCompositeType(props.type) ? (
              <>
                {props.type.struct_getChunkCount(deserialized) > 1 && (
                  <tr>
                    <th scope="row">Merkle Proof by Leaf:</th>
                    <td colSpan={2}>
                      <table className="table">
                        <tbody>{showTree(props.type)}</tbody>
                      </table>
                    </td>
                  </tr>
                )}
                <tr>
                  <th scope="row">
                    Values
                    {isUnionType(props.type) && (
                      <>
                        <br />
                        {`{`}selector: {(deserialized as UnionObject).selector}
                        {`}`}
                      </>
                    )}
                    <br />({(data as unknown[]).length})
                  </th>
                  <td>
                    {isUnionType(props.type) ? (
                      <div className="text-break overflow-auto">
                        <InfoTable
                          type={
                            props.type.types[
                              (deserialized as UnionObject).selector
                            ]
                          }
                          data={(deserialized as UnionObject).value}
                        />
                      </div>
                    ) : isContainerType(props.type) ? (
                      Object.entries(props.type.fields).map(
                        ([key, type], idx) => {
                          return (
                            <div key={key} className="">
                              {key}:{" "}
                              <InfoTable type={type} data={props.data[key]} />
                            </div>
                          );
                        }
                      )
                    ) : (
                      <div className="text-break overflow-auto">
                        [{data.toString()}]
                      </div>
                    )}
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <th scope="row">Value</th>
                <td>
                  <div className="text-break overflow-auto">
                    {deserialized.toString()}
                  </div>
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">JSON</th>
              <td>
                {json && (
                  <div className="text-break overflow-auto">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                      }}
                    >
                      Write
                    </button>
                    {json?.toString()}
                    {}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
