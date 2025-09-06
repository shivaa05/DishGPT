import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detailed from "./pages/Detailed";

const App = () => {

  return (
    <div className="app text-white min-h-screen w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dish/:name" element={<Detailed/>}/>
      </Routes>
    </div>
  );
};

export default App;
