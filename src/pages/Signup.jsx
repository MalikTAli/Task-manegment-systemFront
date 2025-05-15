import { useState } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import LoaderSpinner from "../ui/LoaderSpinner";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [universityID, SetUniversityID] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const res = await registerUser({
      email,
      password,
      universityId: universityID,
      isStudent
    });
     
    if (res.status === "SUCCESS") {
      navigate("/login");
    } else {
      setError(res.message || "Registration failed");
    }
    setIsLoading(false);
  }

  return (
    <div className="w-[100%] bg-white dark:bg-black flex flex-col min-h-screen">
      <ThemeToggle />
      <div className="textcolre mt-[10%] w-[50%] m-auto flex flex-col gap-20 items-start bg-[#f8f8f8] dark:bg-[#1e1e1e] p-10 borderStyle min-h-[400px]" >
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <form className="flex flex-col gap-5 w-[100%]" onSubmit={handelSubmit}>
          <label className="lableStyle text-xl">
            username
            <Input type="email" Value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="lableStyle text-xl">
            Password
            <Input type="password" Value={password} onChange={(e) => setPasswrod(e.target.value)} />
          </label>
          <label className="text-xl font-semibold">
            <input type="checkbox" className="mr-1" checked={isStudent} onChange={(e) => {
              setIsStudent(e.target.checked);
            }} />
            I am a student
          </label>
          {isStudent && <label className="lableStyle text-xl">
            University ID
            <Input type="text" Value={universityID} onChange={(e) => SetUniversityID(e.target.value)} />
          </label>}
          <button type="submit" className="w-[100%] bg-[#a5d6a7] dark:bg-[#4caf50] hover:bg-[#40c844] buttonStyle">{isLoading ? <LoaderSpinner size={20} /> : "Sign Up"}</button>
        </form>
        {error && <p className="text-red-500 font-semibold">{error}</p>}
      </div>
    </div>
  );
}
