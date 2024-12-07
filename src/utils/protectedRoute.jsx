import { useLocation , Navigate } from "react-router-dom"

export default function ProtectedRoute({ redirectTo = "/auth/login", children }) {
    const location = useLocation()

    const isAuth = sessionStorage.getItem("authToken")|| localStorage.getItem("authToken")
    console.log("🚀 ~ ProtectedRoute ~ isAuth:", isAuth)

    return isAuth ? children : (<Navigate to={redirectTo} state={{from : location}} replace  />)
}