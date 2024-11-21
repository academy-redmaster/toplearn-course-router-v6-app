import { Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import NotFoundPage from "./pages/404";
import { ThemeSwitcher } from "./components/themeSwitcher";
import NavigationBar from "./components/navigationBar";
import CopyRight from "./components/copyRight";
import TodoPage from "./pages/todo";
import HomePage from "./pages/home";
import AdminPage from "./pages/admin";
import ContactUsPage from "./pages/contactUs";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signUp";

export default function App() {
  const location = useLocation();
  const navigationType  = useNavigationType()
  console.log("🚀 ~ App ~ navigationType:", navigationType)
  const isAdminSubdomain = location.pathname.startsWith("/admin");
  const isAuthSubdomain = location.pathname.startsWith("/auth")

  return (
    <div className="min-h-screen w-full">
      {isAdminSubdomain || isAuthSubdomain ? null : <NavigationBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/concatus" element={<ContactUsPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      {isAdminSubdomain || isAuthSubdomain ? null : <CopyRight />}
      <ThemeSwitcher />
    </div>
  );
}
