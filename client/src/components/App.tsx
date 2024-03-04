import MainLayout from "layouts/MainLayout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProductsTable from "./products/ProductsTable";
import WarehousesTable from "./warehouses/WarehousesTable";

let router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return <Navigate to="/products" />;
    },
  },
  {
    path: "/products",
    Component() {
      return (
        <MainLayout>
          <ProductsTable />
        </MainLayout>
      );
    },
  },
  {
    path: "/warehouses",
    Component() {
      return (
        <MainLayout>
          <WarehousesTable />
        </MainLayout>
      );
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
