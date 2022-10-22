import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router-dom";

const MenuPage = lazy(() => import("../views/Menu"));
const Settlement = lazy(() => import("../views/Settlement"));

const router = createHashRouter([
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
