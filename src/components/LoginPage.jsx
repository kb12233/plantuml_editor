import { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div className="flex h-screen" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center w-3/5 bg-gray-900 text-white p-10">
        <img src="\src\assets\images\logo_dark.png" alt="Logo" className="mb-16 w-32" />
        <h1 className="text-2xl font-bold">Sign in to ClassyCode</h1>
        <div className="mt-10 w-1/2">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-teal-400 cursor-pointer mb-4">Forgot your password?</p>
          <button className="w-full p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition">
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center w-2/5 bg-[#b8dbd9] p-10">
        <h2 className="text-2xl font-bold text-gray-900">Hello Friend!</h2>
        <p className="text-center text-gray-800 mt-4 px-10">
          Create an account and get started!
        </p>
        <button onClick={handleRegister} className="mt-6 px-6 py-2 border border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white">
          SIGN UP
        </button>
      </div>
    </div>
  );
}
