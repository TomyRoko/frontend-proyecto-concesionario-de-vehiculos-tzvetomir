import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Catalogo from "../pages/Catologo";
import VehiculoDetail from "../pages/VahiculoDetail";

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
            ],
        },
    ]
);
