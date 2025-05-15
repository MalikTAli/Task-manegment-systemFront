import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import ThemeToggle from "../ui/ThemeToggle";
import LoaderSpinner from "../ui/LoaderSpinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [stayLogIn, setStayLogIn] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true); 

    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              login(email: "${email}", password: "${password}") {
                token
                user { id email role }
              }
            }
          `,
        }),
      });

      const result = await res.json();
      const loginData = result?.data?.login;

      if (loginData?.token) {
        const storage = stayLogIn ? localStorage : sessionStorage;
        storage.setItem("token", loginData.token);
        storage.setItem("user", JSON.stringify(loginData.user));
        dispatch(loginSuccess(loginData));
        navigate("/main");
      } else {
        setError("Login failed: " + result?.errors?.[0]?.message);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <div className="w-[100%] bg-white dark:bg-black flex flex-col min-h-screen">
      <ThemeToggle />
      <div className="textcolre mt-[10%] w-[50%] m-auto flex flex-col gap-20 items-start bg-[#f8f8f8] dark:bg-[#1e1e1e] p-10 borderStyle min-h-[400px]">
        <h1 className="font-bold text-3xl">Sign In</h1>
        <form className="flex flex-col gap-5 w-[100%]" onSubmit={handelSubmit}>
          <label className="lableStyle text-xl">
            Email
            <Input type="email" Value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="lableStyle text-xl">
            Password
            <Input type="password" Value={password} onChange={(e) => setPasswrod(e.target.value)} />
          </label>
          <label className="text-xl font-semibold">
            <input
              type="checkbox"
              className="mr-1"
              checked={stayLogIn}
              onChange={(e) => setStayLogIn(e.target.checked)}
            />
            Stay signed in
          </label>
          {error && <p className="text-red-500">{error}</p>}

          {isLoading ? (
            <div className="flex justify-center">
              <LoaderSpinner />
            </div>
          ) : (
            <button className="w-full bg-[#a5d6a7] dark:bg-[#4caf50] hover:bg-[#40c844] buttonStyle">
              Sign In
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
