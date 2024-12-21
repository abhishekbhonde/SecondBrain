// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import  Signup  from "./pages/Signup";
import { Dashboard } from "./pages/dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      {/* Wrap the entire app inside HeroHighlightDemo */}
        
        
       
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
