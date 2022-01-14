import {
  CompositeType,
  isBasicType,
  isBitListType,
  isCompositeType,
  isContainerType,
  isListType,
  isUintType,
  isUnionType,
  isVectorType,
  NumberUintType,
  toHexString,
  Type,
  UnionType,
} from "@chainsafe/ssz";
import { Text } from "@chakra-ui/react";
import { UnionObject } from "../../RandomData";
import { dataSet } from "../randUint";

interface InfoTableProps {
  type: Type<any>;
  data: dataSet;
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
  const data = props.data;
  const serialized = props.type.serialize(data);
  const hashTreeRoot = props.type.hashTreeRoot(data);
  const deserialized = props.type.deserialize(serialized);
  function showTree() {
    const compType = props.type as CompositeType<Type<unknown>>;
    const tree = compType.struct_convertToTree(deserialized);
    const leafGindices = compType.tree_getLeafGindices(tree);
    return leafGindices.map((v, idx) => {
      return (
        <tr key={idx}>
          <th scope="row">{v.toString()}</th>
          <td>[{getProofNodes(Number(v)).toString()}]</td>
          <td className="text-break">
            [
            {tree
              .getSingleProof(v)
              .map((v) => {
                return `${toHexString(v).slice(0, 10)}...`;
              })
              .toString()}
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
      <div className="row">
        <div className="col my-1 mx-4 py-1 px-2">
          <table className="table table-sm">
            <tbody>
              <tr>
                <th scope="row">
                  Serialized <br />
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
                <td>
                  <Text className="text-break">{serial}</Text>

                  {/* <textarea readOnly className="text-break" value={`0x${serial}`} /> */}
                </td>
              </tr>
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
              {(isListType(props.type) || isVectorType(props.type)) &&
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
              {isUnionType(props.type) && (
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
              {(isVectorType(props.type) || isListType(props.type)) &&
                props.type.struct_getChunkCount(deserialized) > 1 && (
                  <tr>
                    <th scope="row">
                      Length
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
              {isCompositeType(props.type) ? (
                <>
                  {props.type.struct_getChunkCount(deserialized) > 1 && (
                    <tr>
                      <th scope="row">Merkle Proof by Leaf:</th>
                      <td colSpan={2}>
                        <table className="table">
                          <tbody>{showTree()}</tbody>
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
                          {`{`}selector:{" "}
                          {(deserialized as UnionObject).selector}
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
                              <div key={key} className="text-break overflow-auto">
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
