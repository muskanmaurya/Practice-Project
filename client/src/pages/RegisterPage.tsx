import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering User:", formData);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        navigate("/");
        toast.success("User Registered Successfully");
      }

    } catch (error) {
      console.log("Error occurred while registering user:", error);
      toast.error("Error occurred while registering user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async(authResult: any) => {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:8000/api/auth/google-login",{
        code : authResult["code"],
      })

      localStorage.setItem("token", result.data.token);
      toast.success(result.data.message);
      setLoading(false);
      
      navigate("/"); // Redirect to home page after successful login

      handleAuthsuccess(result.data);

    }catch(error){
      console.error("Error occurred while logging in user with Google:", error);
      toast.error("Error occurred while logging in user with Google. Please try again.");
      setLoading(false);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: handleGoogleLogin,
    flow:"auth-code",
  })

   const handleAuthsuccess = (data: any) => {
    localStorage.setItem("token", data.token);
    toast.success("Login successful!");
    setLoading(false);
  }




  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 md:p-10 font-sans">
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row min-h-150">

        {/* LEFT SIDE: Visual Food Side */}
        <div className="relative w-full md:w-1/2 min-h-75 md:min-h-full bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000')` }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/80 p-3 shadow-lg backdrop-blur-md">
              <span className="text-3xl font-bold text-orange-500">F</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Register Input Form */}
        <div className="relative flex w-full flex-col justify-center bg-white px-8 py-12 md:w-1/2 lg:px-16">
          <div className="w-full">
            <h2 className="text-3xl font-semibold text-gray-800">Welcome</h2>
            <p className="mt-2 text-sm text-gray-400">Create your account to get started.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-orange-500"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="User Name or Email"
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-orange-500"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-orange-500"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-orange-600">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full border-t border-gray-100"></div>
              <span className="absolute bg-white px-3 text-xs text-gray-400">or</span>
            </div>

            <button onClick={googleLogin} type="button" className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-100 bg-gray-50/50 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.466 0-6.277-2.812-6.277-6.278 0-3.466 2.81-6.277 6.277-6.277 1.583 0 3.02.588 4.128 1.554l3.05-3.049C19.305 2.233 16.033 1 12.24 1 5.922 1 1 5.92 1 12.24 1 18.56 5.922 23 12.24 23c6.044 0 10.977-4.253 10.977-10.715 0-.704-.078-1.35-.196-2H12.24z" />
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}