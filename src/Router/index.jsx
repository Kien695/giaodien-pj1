import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <ProductList />,
      },
    ],
  },
];
