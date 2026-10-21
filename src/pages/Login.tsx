import loginImg from "../assets/login_svg.svg";
import Button from "../components/Btn";
import Input from "../components/Input";
import { useState } from "react";
import { authenticatedLogin, setToken } from "@/services/AuthService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  function signIn() {
    if (validateForm()) {
      setIsLoading(true);
      authenticatedLogin(username, password)
        .then((response) => {
          setToken(response.data);
          toast("Signed In", {
            description: "You have successfully signed in.",
            position: "top-right",
          });
          setIsLoading(false);
          // window.location.href = "/employees";
          navigate("/employees");
        })
        .catch(() => setIsLoading(false));
    }
  }

  function validateForm() {
    let isFormValid = true;

    const errorsCopy = { ...errors };

    if (username.trim()) {
      errorsCopy.username = "";
    } else {
      errorsCopy.username = "Username is required";
      isFormValid = false;
    }

    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is required";
      isFormValid = false;
    }

    setErrors(errorsCopy);
    return isFormValid;
  }

  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-purple-accent/10 p-20">
          <div className="flex flex-col gap-6 justify-center">
            <h1 className="text-xl font-bold text-primary">Welcome Back!</h1>
            <p className="text-sm text-pretty text-slate-600">
              Sign in to continue to your account <br /> and manage leave
              requests.
            </p>
            <div className="flex items-center justify-center">
              <img src={loginImg} className="h-100 w-100" />
            </div>
          </div>
        </div>
        <div className="grid items-center p-20">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-xl font-bold text-primary">Sign in</h1>
            <p className="text-sm text-pretty text-slate-600">
              Welcome back! Please enter your details.
            </p>
            <Input
              type="text"
              name="username"
              labelName="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              state={errors.username ? "error" : "regular"}
              error={errors.username}
            />
            <Input
              type="password"
              name="password"
              labelName="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              state={errors.password ? "error" : "regular"}
              error={errors.password}
            />
            <div className="mt-4">
              <Button
                type="primary"
                text="Sign in"
                onClick={signIn}
                isLoading={isLoading}
                isDisabled={isLoading}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
