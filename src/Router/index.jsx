import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../pages/Home";

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];
