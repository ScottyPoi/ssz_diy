type SelectElementTypeProps = {
setType: Function
name: string
types: string[]
}

export default function SelectElementType(props: SelectElementTypeProps) {
        
          let types = props.types;


  
          return (
            <div className="row">
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg SSZ Type"
              size={types.length + 1}
              onChange={(e) => props.setType(e.target.value)}
            >
              <option disabled value="SSZ Type" selected>Select {props.name}</option>
              {types.map((type: string) => {
                return (
                  <option value={`${type}Type`}>{type}</option>

                )
              })}
            </select>
          </div>
        )
}