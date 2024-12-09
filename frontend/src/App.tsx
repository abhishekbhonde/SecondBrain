import Signin from "./components/ui/Signin";
import Signup from "./components/ui/Signup";
import Dashbarod from "./pages/Dashbarod";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashbarod/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
</BrowserRouter>
}

export default App;
