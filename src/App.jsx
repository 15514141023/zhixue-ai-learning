import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import Knowledge from "./pages/Knowledge"
import Training from "./pages/Training"
import Progress from "./pages/Progress"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/training" element={<Training />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
  
  )
}
export default App