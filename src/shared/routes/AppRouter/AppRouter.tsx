import { Route, Routes } from "react-router-dom"
import { FavoritesCars } from "../../../pages/FavoritesCars/FavoritesCars"
import { Login } from "../../../pages/Login/Login"
import { Cars } from "../../../pages/ViewCars/Cars"
import Welcome from "../../../pages/Welcome/Welcome"
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes"

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<Welcome />} path="/" />
            <Route element={<Cars />} path="cars/" />
            <Route element={<ProtectedRoutes />}>
                <Route element={<FavoritesCars />} path="cars/favorites" />
            </Route>
            <Route element={<Login />} path="login" />
        </Routes>
    )
}

export default AppRouter