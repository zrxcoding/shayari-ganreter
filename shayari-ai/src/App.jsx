import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Generator from "./pages/Generator";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f3e7c3] text-[#2b1b07] font-serif p-5">
        <h1 className="text-4xl font-bold text-center mb-4">📖 Shayari Book</h1>
        <div className="text-center mb-6 space-x-3">
          <Link to="/">Home</Link>
          <Link to="/generate">AI Generator</Link>
        </div>

        <Routes>
          <Route path="/" element={<div className='text-center text-xl'>Select a Category Above</div>} />
          <Route path="/generate" element={<Generator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
