import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detailed from "./pages/Detailed";

const App = () => {
  return (
    <div
      className="app text-white min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Optional dark overlay for better readability */}
      <div className="w-full min-h-screen bg-black/50 backdrop-blur-sm">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dish/:name" element={<Detailed />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
