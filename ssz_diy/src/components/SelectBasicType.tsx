type SelectBasicTypeProps = {
    setType: Function
    name: string
    }
    
    export default function SelectBasicType(props: SelectBasicTypeProps) {
            return (
                <div className="row">
                <select
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg SSZ Type"
                  size={6}
                  onChange={(e) => props.setType(e.target.value)}
                >
                  <option disabled value="SSZ Type" selected>Select {props.name}</option>
                  <option value="BooleanType">Boolean</option>
                  <option value="UintType">Uint</option>
                </select>
              </div>
            )
    }