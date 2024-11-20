import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404";
import { ThemeSwitcher } from "./components/themeSwitcher";
import NavigationBar from "./components/navigationBar";
import CopyRight from "./components/copyRight";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<h1>hello world</h1>} />
        <Route path="/admin" element={<h1>Admin page</h1>} />
        <Route path="/todo" element={<h1>todo page</h1>} />
        <Route path="/concatus" element={<h1>contact us page</h1>} />
        <Route path="/auth/login" element={<h1>login page</h1>} />
        <Route path="/auth/signup" element={<h1>signup page</h1>} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      <CopyRight />
      <ThemeSwitcher />
    </div>
  );
}
