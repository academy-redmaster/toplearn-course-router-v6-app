import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import NotFoundPage from "./pages/404";
import { ThemeSwitcher } from "./components/themeSwitcher";
import NavigationBar from "./components/navigationBar";
import CopyRight from "./components/copyRight";
import HomePage from "./pages/home";
import AdminPage from "./pages/admin";
import ContactUsPage from "./pages/contactUs";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signUp";
import { ToastContainer } from "react-toastify";
import TodoLayoutPage from "./pages/todoLayout";
import TodoIndexPage from "./pages/todoIndex";
import TodoCreatePage from "./pages/todoCreate";
import TodoDetailsPage from "./pages/todoDetails";
import TodoCompletePage from "./pages/todoComplete";
import TodoArchivePage from "./pages/todoArchive";
import TodoDeletePage from "./pages/todoDelete";
import ProtectedRoute from "./utils/protectedRoute";

export default function App() {
  const location = useLocation();
  const navigationType = useNavigationType();
  console.log("🚀 ~ App ~ navigationType:", navigationType);
  const isAdminSubdomain = location.pathname.startsWith("/admin");
  const isAuthSubdomain = location.pathname.startsWith("/auth");

  return (
    <div className="min-h-screen w-full">
      {isAdminSubdomain || isAuthSubdomain ? null : <NavigationBar />}
      <Routes>
        <Route
          path="/:lang?/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="todo"
          element={
            <ProtectedRoute >
              <TodoLayoutPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<TodoIndexPage />} />
          <Route path="create" element={<TodoCreatePage />} />
          <Route path=":id" element={<TodoDetailsPage />} />
          <Route path=":id/edit" element={<TodoCreatePage />} />
          <Route path=":id/delete" element={<TodoDeletePage />} />
          <Route path=":id/complete" element={<TodoCompletePage />} />
          <Route path=":id/archive" element={<TodoArchivePage />} />
        </Route>
        <Route path="concatus" element={<ContactUsPage />} />
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/signup" element={<SignUpPage />} />
        <Route path="admin/*" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
      {isAdminSubdomain || isAuthSubdomain ? null : <CopyRight />}
      <ThemeSwitcher />
    </div>
  );
}
