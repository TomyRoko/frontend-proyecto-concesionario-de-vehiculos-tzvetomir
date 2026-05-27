import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Catalogo from "../pages/Catologo";

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
            ],
        },
    ]
);
