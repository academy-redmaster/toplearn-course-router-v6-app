import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    userName: "",
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
      const response = await axios.post("http://localhost:8008/api/users/register", formData);
      console.log("🚀 ~ handleSubmit ~ response:", response.data);
      toast.success("user Registered successfully");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      setError(error.response?.data?.message || "An Error Accurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4">
      <div className="w-full max-w-xl bg-white text-black rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Join us today! It`s quick and easy.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              label="Username"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Username is required"
            />
          </div>
          {/* Email Field */}
          <div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email Address"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Enter a valid email address"
            />
          </div>
          {/* Password Field */}
          <div>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Password must be at least 6 characters"
            />
          </div>
          {/* Submit Button */}
          <Button
            fullWidth
            color="secondary"
            variant="solid"
            size="lg"
            type="submit"
          >
            {loading ? "submitting..." : "Sign Up"}
          </Button>
        </form>
        {error && <p className="text-red-500 text-center mt-5">{error}</p>}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?
          <Link
            to="/auth/login"
            className="text-secondary font-semibold hover:underline mx-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
