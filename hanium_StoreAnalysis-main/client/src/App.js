import "./App.css";
import NavBar from "./template/NavBar";
import ResearchModal from "./template/searchSystem/ResearchModal";
import SendData from "./template/searchSystem/SendData";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <SendData />
    </div>
  );
}

export default App;
