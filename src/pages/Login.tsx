import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login_svg.svg";
import Button from "../components/Btn";
import Input from "../components/Input";
import { useState } from "react";
import { toast } from "sonner";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  function signIn() {
    console.log("SIGIN_DETAILS:: ", username, " / ", password);
    // if (validateForm()) {
    toast("Signed In", {
      description: "You have successfully signed in.",
      position: "top-right",
    });
      navigate("/employees");
    // }
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
              <Button type="primary" text="Sign in" onClick={signIn}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
