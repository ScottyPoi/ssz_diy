export default function UploadFile() {
  return (
    <div className="row p-0 m-0 g-0">
      <div className="col p-0 m-0 border">
        <button className="p-0 m-0 btn  btn-secondary" type="button">
          Upload DATA from File
        </button>
      </div>
      <div className="col p-0 m-0">
          <select className="text-center form-select form-select-sm">
            <option value="CSV">CSV</option>
            <option value="JSON">JSON</option>
            <option value="YAML">YAML</option>
          </select>
        </div>
    </div>
  );
}
