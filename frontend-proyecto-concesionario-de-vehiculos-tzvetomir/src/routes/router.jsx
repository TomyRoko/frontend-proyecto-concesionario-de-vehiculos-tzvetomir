import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Catalogo from "../pages/Catologo";
import VehiculoDetail from "../pages/VahiculoDetail";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminVehiculosPage from "../pages/admin/AdminVehiculosPage.jsx";
import DashboardPage from "../pages/admin/DaskboardPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/catalogo",
        element: <Catalogo />,
      },
      {
        path: "/catalogo/:id",
        element: <VehiculoDetail />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "vehiculos",
        element: <AdminVehiculosPage />,
      },
    ],
  },
]);
