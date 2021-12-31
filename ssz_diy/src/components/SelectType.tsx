import {ssz} from '@chainsafe/lodestar-types'
import { useDisclosure } from '@chakra-ui/react';
import CreateType from './CreateType';
interface SelectTypeProps {
    set_Type: Function;
    typeNames: string[];
    _type: any;
    nativeTypes: Record<string, string[]>;
}

export default function SelectType(props: SelectTypeProps) {
  // const { isOpen, onOpen, onClose } = useDisclosure()

    
    
    return (
        <div className="col-2 h-100 "              style={{
                textDecorationColor: "darkblue",
                backgroundColor: "whitesmoke",
              }}>
          <div className="row">
            <h5 className="text-center">Select Type</h5>
            <CreateType />

            <select
            onChange={(e) => props.set_Type(e.target.value)}
              style={{
                textDecorationColor: "darkblue",
                backgroundColor: "whitesmoke",
                scrollbarWidth: "none",
                border: "none"

                  
              }}
              className="form-select form-select-sm"
              size={
                4 +
                props.typeNames.length 
                + Object.keys(props.nativeTypes).length
              }
              aria-label="size 3 select example"
              value={props._type}
            >
              {Object.keys(props.nativeTypes).map((type, idx) => {
                return (<>
                  <option disabled>{type} Types</option>
              {props.nativeTypes[type].map((type) => {
                return <option key={type} value={type}>{type}</option>;
              })}
                </>)
              
              
              })}
              {/* <option disabled>Lodestar Types</option>
              {[...Object.keys(ssz.altair), ...Object.keys(ssz)].filter((n) => !typeNames.includes(n)).sort().map((type) => {
                return <option key={type} value={type}>{type}</option>;
              })} */}
            </select>
          </div>

        </div>
    )
}