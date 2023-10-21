import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import CodeEditor from "./components/codeeditor";
AOS.init({
  duration: 1000,
});
function App() {
  return (
    <>
      <CodeEditor />
    </>
  );
}

export default App;
