import { isUintType, toHexString, Type } from "@chainsafe/ssz";

interface AnimationProps {
  data: unknown
  type: Type<unknown>
}
export default function Animation(props: AnimationProps) {

  const len = isUintType(props.type) ? props.type.byteLength * 2 : 64

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">Serialize</div>
            <div className="col"></div>
          </div>
          <div className="row">
            <svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
              {/* <!-- Simple rectangle --> */}
              <rect width="100" height="100" />

              {/* <!-- Rounded corner rectangle --> */}
              <rect x="1" y="1" fill="white" width="98" height="98" rx="15">
                {/* <animate
                  attributeName="width"
                  values="10;10;98;98;98;98;98"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="height"
                  values="5;5;5;50;98;98;98"
                  dur="4s"
                  repeatCount="indefinite"
                /> */}
              </rect>
              {/* <text x="5" y="5" className="small">
                {toHexString(new Uint8Array(32).fill(0))}
              </text> */}
              <text x="2" y="20" font-size="0.7rem" font-family="Montserrat" fill="black">
                    {toHexString(props.type.serialize(props.data)).slice(0, len+2)}
              </text>
              {/* <path id="path">
                <animate
                  attributeName="d"
                  from="m0,20 h00"
                  to="m0,20 h100"
                  begin="0s"
                  dur="1s"
                  fill="freeze"
                //   restart="never"
                //   repeatCount="indefinite"
                />
              </path>
              <text x="25" font-size="0.7rem" font-family="Montserrat" fill="red">
                <textPath xlinkHref="#path">
                    {toHexString(new Uint8Array(32).fill(0)).slice(4,16)}
                </textPath>
              </text>
              <path id="path2">
                <animate
                  attributeName="d"
                  from="m0,30 h00"
                  to="m0,30 h100"
                  begin="1s"
                  dur="1s"
                  fill="freeze"
                //   restart="never"
                //   repeatCount="indefinite"
                />
              </path>
              <text x="15" font-size="0.7rem" font-family="Montserrat" fill="red">
                <textPath xlinkHref="#path2">
                    {toHexString(new Uint8Array(32).fill(0)).slice(12,26)}
                </textPath>
              </text>
              <path id="path3">
                <animate
                  attributeName="d"
                  from="m0,40 h00"
                  to="m0,40 h100"
                  begin="2s"
                  dur="1s"
                  fill="freeze"
                //   repeatCount="indefinite"
                />
              </path>
              <text x="15" font-size="0.7rem" font-family="Montserrat" fill="red">
                <textPath xlinkHref="#path3">
                    {toHexString(new Uint8Array(32).fill(0)).slice(26,40)}
                </textPath>
              </text>
              <path id="path4">
                <animate
                  attributeName="d"
                  from="m0,50 h00"
                  to="m0,50 h100"
                  begin="3s"
                  dur="1s"
                  fill="freeze"
                //   repeatCount="indefinite"
                />
              </path>
              <text x="15" font-size="0.7rem" font-family="Montserrat" fill="red">
                <textPath xlinkHref="#path4">
                    {toHexString(new Uint8Array(32).fill(0)).slice(40,54)}
                </textPath>
              </text>
              <path id="path5">
                <animate
                  attributeName="d"
                  from="m0,60 h00"
                  to="m0,60 h100"
                  begin="4s"
                  dur="1s"
                  fill="freeze"
                //   repeatCount="indefinite"
                />
              </path>
              <text x="15" font-size="0.7rem" font-family="Montserrat" fill="red">
                <textPath xlinkHref="#path5">
                    {toHexString(new Uint8Array(32).fill(0)).slice(54,64)}
                </textPath>
              </text> */}
            </svg>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col"></div>
            <div className="col">Deserialize</div>
          </div>
        </div>
      </div>
    </div>
  );
}
