import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.scss";
import Input from "./components/Input";
import CreateValue from "./components/CreateValue";

function App() {


  return (
    <Router>
      <Input />
      <CreateValue />
          </Router>
  );
}

export default App;
