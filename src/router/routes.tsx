import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const MenuPage = lazy(() => import("../views/Menu"));
const Settlement = lazy(() => import("../views/Settlement"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <MenuPage />,
	},
	{
		path: "/settlement",
		element: <Settlement />,
	},
]);

export default router;
