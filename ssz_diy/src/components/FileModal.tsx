interface FileModalProps {
    typeName: string
}

export default function FileModal(props: FileModalProps) {
  return (<div className="modal" id={`FileModal`} tabIndex={-1}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Upload Data from File</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismisss="modal"
            aria-label="close"
          ></button>
        </div>
        <div className="modal-body">
            <p>SSZ TYPE</p><br/>
            <p>{props.typeName}</p><br/>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Default file input example
            </label>
            {/* <select>
                <option>JSON</option>
                <option>YAML</option>
                <option>CSL</option>
            </select> */}
            <input className="form-control" type="file" id="formFile" />
          </div>{" "}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>);
}
