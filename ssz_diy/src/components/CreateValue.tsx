import {CopyBlock, github, a11yDark, dracula, solarizedDark, atomOneDark, a11yLight, paraisoDark, nord, xt256, zenburn} from 'react-code-blocks';
    import { NumberUintType, ContainerType, ListType, ObjectLike, toHexString } from '@chainsafe/ssz'
    import Example from '../test/example';


const ExampleMessageType = new ContainerType({fields: {
    sndId: new NumberUintType({byteLength: 16}),
    rcvId: new NumberUintType({byteLength: 16}),
    payload: new ListType({elementType: new NumberUintType({byteLength: 8}), limit: 2048})
}})






export default function CreateValue() {

    const exampleText = `

var ExampleMessageType = {
    sndId: Uint16,
    rcvId: Uint16,6
    payload: List[Uint8, limit: 2048]
}


var message = {
    sndId: 12,
    rcvId: 13,
    payload: [1,2,3,4,5]
}

var serialized = ExampleMessageType.serialize(message)
var deserialized = ExampleMessageType.deserialize(serialized)
var equals = ExampleMessageType.equals(message, deserialized)


message
// {sndId: 12, rcvId: 13, payload: [1,2,3,4,5]}
serialized
// 0x0c0000000000000000000000000000000d0000000000000000000000000000002400000001000000000000000200000000000000030000000000000004000000000000000500000000000000
deserialized
// {sndId: 12, rcvId: 13, payload: [1,2,3,4,5]}
equals
// true
    `

    return (
        <div className='container m-1'>
            <div className='row'>
            <CopyBlock
            text={exampleText}
            language="typescript"
            theme={a11yDark} />
                </div>
        </div>
    )

}