import { useState } from "react";
import {
  a11yDark,
  CodeBlock,
  CopyBlock,
  github,
  tomorrowNight,
} from "react-code-blocks";

export default function AliasMenu() {
  const [alias, setAlias] = useState("");

  const schemaOne = `
# user 1654 has a richly aliased typesytem for the contents of the packet
type byte = uint8
type bytes32 = vector[byte, 32]
type connectionId = uint16
type messageId = bytes32
type content = bitvector[18]
type payload = union[null, content]

# the data to be sent is a container type named Packet with 4 key-type pairs
type PacketType = container[
    snd_id: connection_id
    rcv_id: connection_id
    message_id: message_id
    message: payload]

packet_value = {
snd_id: 1654
rcv_id: 1790
message_id: 0xe0da630053a07dc5bfc
    043da2c8fbe7ce678f93689c2e2b1b
    3b156cf440c0525
payload: [0,1,0,0,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1]


# packet is serialized as PacketType into a bytestring
serialized_packet = PacketType.serialize(packet_value)
# 0x05ab9ef9b8e8e8f...

# hash_tree_root is 32 byte string merkle tree root
hash_tree_root = PacketType.hash_tree_root(packet_)
# 0x01b8d75e7783f6ee65a...
`;

  const received = `
  # user 17 creates the same container with no type aliases and calls it Foo

  class Foo(container) = {
      0: uint16
      1: uint16
      2: uint256
      3: union[null, vector[boolean, 18]]
  }
  
  # Receives an array of bytestrings from user-16
  # bytestrings[0] is the data packet
  # bytestrings[1] is the merkle proof
  received_bytes = ["0x05ab9ef9b8e8e8f...", "0x01b8d75e7783f6ee65a..."]
  
  # Treats the bytestring like a serialized Foo container
  # And calls the deserialize function to return deserialized Foo container
  deserialized = foo.deserialize(received_bytes[0])
  # { 0: 16
  #   1: 17
  #   2: 0xe0da630053a07dc5bfc043da2c8fbe7ce678f93689c2e2b1b3b156cf440c0525
  #   3: [0,1,0,0,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1]
  #  }

  # Calculates hash_tree_root of deserialized Foo container
  hash_tree_root = Foo.hash_tree_root(deserialized)
  # 0x01b8d75e7783f6ee65a...
  
  # Uses calculated root to validate against merkle_proof
  assert(hash_tree_root == bytestrings[1])
  # 0x01b8d75e7783f6ee65a...
  `;
  const schemaTwo = `print(deserialized_bytes)
#    {"snd_id": 16
#    "rcv_id": 17
#    "message_id": 0xe0da630053a07dc5bfc
#        043da2c8fbe7ce678f93689c2e2b1b
#        3b156cf440c0525
#    "payload": [0,1,0,0,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1]}`;

    let x = 20

  return (
    <div className="row row-auto-cols justify-content-start">
      <div className="col">
        <div className="row">
          <svg viewBox="20 0 100 100">
            <rect height="70" width="75" x="22" fill="none" stroke="black">
              {/* <CodeBlock
          showLineNumbers={false}
          text={schemaOne}
          language="python"
          theme={tomorrowNight}
          /> */}
            </rect>
            <text
              x={x+5}
              y="5"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            > {`{`}
              </text>
            <text
              x={x+5}
              y="15"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`"snd_id": "1654"`}
            </text>
            <text
              x={x+5}
              y="20"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`"rcv_id": "1790"`}
            </text>
            <text
              x={x+5}
              y="25"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`"message_id": "0xe0da630053a07dc`}
            </text>
            <text
              x={x+10}
              y="30"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`5bfc043da2c8fbe7ce678f93689`}
            </text>
            <text
              x={x+10}
              y="35"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`c2e2b1b3b156cf440c0525"`}
              </text>
            <text
              x={x+5}
              y="40"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              
            {`"payload": ["0","1","0","0","1","0","1","0",`}
            </text>
            <text
              x={x+10}
              y="45"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`"1","1","0","1","0","1","0","0",]`}
              </text>
            <text
              x={x+10}
              y="50"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`"1","0","1","0","1","1","0","1"]`}
              </text>
            <text
              x={x+5}
              y="55"
              style={{ font: "italic 4px sans-serif", fill: "black", wordBreak: "break-all" }}
            >
              {`}`} 
              </text>
          </svg>
        </div>
        <div className="row">
          <svg viewBox="0 0 100 100">
            <rect height="50" width="50" x="25"></rect>
          </svg>
        </div>
      </div>
      <div className="col m-0 p-0 border">
        <h3>
          <div className="row p-0 m-0 justify-content-center">
            [SERIALIZED_DATA {`&`} MERKLE_PROOF]
          </div>
          <div className="row justify-content-center">
            ["0x05ab9ef9b8e8e8f...", "0x01b8d75e7783f6ee65a..."]
          </div>
          <div className="row justify-content-center">
            <svg viewBox="0 0 100 100">
              <g fill="#aaaaaa">
                <circle cx="75" cy="25" r="25" opacity="0.5">
                  <animate
                    attributeName="cx"
                    values="0;75"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;.4;.5;.5;.5;.3;.1;0"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <ellipse cx="50" cy="25" rx="50" ry="25" opacity="0.5" />
                <polygon
                  // points="0,15 75,15 75,0 100,25 75,50 75,35 0,35"
                  fill="none"
                  stroke="black"
                >
                  <animate
                    attributeName="points"
                    from="-100,8 -50,8 -50,12 -40,12 -40,8 -25,8 -25,0 0,12 -25,24 -25,16, -25,16 -40,12 -50,12 -50,16 -100,16"
                    to=   "100,8  150,8 150,12 160,12 160,8 175,8 175,0 200,12 175,24 175,16 160,16 160,12 150,12 150,16 100,16"
                    fill="freeze"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </polygon>
                <polygon
                  points="0,15 75,15 75,0 100,25 75,50 75,35 0,35"
                  fill="none"
                  stroke="black"
                >
                  <animate
                    attributeName="points"
                    from="-110,32 -35,32 -35,24 -10,40 -35,48 -35,40 -110,40"
                    to="90,32 165,32 165,24 190,32 165,48 165,40 90,40"
                    fill="freeze"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </polygon>
                <text
                  x="00"
                  y="13"
                  style={{ font: "italic 4px sans-serif", fill: "black" }}>
                  <animate
                    attributeName="x"
                    values="-95;105"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                    "0x05ab9ef9b8e8e8f..." {` <-- `} serialized_packet
                </text>
                <text
                  x="00"
                  y="37"
                  style={{ font: "italic 4px sans-serif", fill: "black" }}
                >
                  <animate
                    attributeName="x"
                    values="-108;92"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                  "0x01b8d75e7783f6ee65a..." {` <-- `} hash_tree_root  
                </text>
              </g>
            </svg>
          </div>
        </h3>
      </div>
      <div className="col">
        {/* <CodeBlock
          showLineNumbers={false}
          text={received}
          language="python"
          theme={a11yDark}
        /> */}
        {/* <CodeBlock
          showLineNumbers={false}
          text={schemaTwo}
          language="python"
          theme={a11yDark}
        /> */}
      </div>
    </div>
  );
}
