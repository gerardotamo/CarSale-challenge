import { Route, Routes } from "react-router-dom";
import Navbar from "../../../components/NavBar/Navbar";
import NavBarFilter from "../../../components/NavBarFilter/NavBarFilter";
import { FavoritesCars } from "../../../pages/FavoritesCars/FavoritesCars";
import { Login } from "../../../pages/Login/Login";
import { ViewCars } from "../../../pages/ViewCars/Cars";
import ViewCreateCar from "../../../pages/ViewCreateCar/ViewCreateCar";
import Welcome from "../../../pages/Welcome/Welcome";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route element={<Welcome />} path="/" />
        <Route element={<NavBarFilter />}>
          <Route element={<ViewCars />} path="cars/" />
          <Route element={<ProtectedRoutes />}>
            <Route element={<FavoritesCars />} path="cars/favorites" />
          </Route>
        </Route>
        <Route element={<ViewCreateCar />} path="cars/create" />
      </Route>
      <Route element={<Login />} path="login" />
    </Routes>
  );
};

export default AppRouter;
