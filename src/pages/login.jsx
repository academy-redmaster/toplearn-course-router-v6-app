import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log("🚀 ~ SignUpPage ~ formData:", formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8008/api/users/login", formData);
      const token = response.data.token;

      if (token) {
        sessionStorage.setItem("authToken", token);
        toast.success("login successfull");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      setError(error.response?.data?.message || "An Error Accurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <div className="w-full max-w-xl bg-white text-black rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome Back!
        </h2>
        <p className="text-center mb-6">
          Please login to your account to continue.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email Address"
              variant="bordered"
              color="primary"
              fullWidth
              isRequired
              errorMessage="Enter a valid email address"
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              variant="bordered"
              color="primary"
              fullWidth
              isRequired
              errorMessage="Password is required"
            />
          </div>
          <Button
            fullWidth
            color="primary"
            variant="solid"
            size="lg"
            type="submit"
          >
            {loading ? "Logging..." : "Login"}
          </Button>
        </form>
        {error && <p className="text-red-500 text-center mt-5">{error}</p>}

        <p className="flex items-center justify-center gap-x-4 text-sm text-center text-black mt-6">
          Don`t have an account?
          <Link
            to="/auth/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
