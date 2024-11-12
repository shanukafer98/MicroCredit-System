import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [user, setUser] = useState({
    email: "", // Change 'username' to 'email' here
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/auth/signin", user);
      console.log(response.data);
      toast.success("Signin successful");
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-6">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/Signup" className="text-blue-500 hover:text-blue-700">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
