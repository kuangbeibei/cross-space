import { StrictMode, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { RouterProvider, Route } from "react-router-dom";
import store from "./store";
import router from "./router/routes";

export default function App() {
	return (
		<StrictMode>
			<Provider store={store}>
				<Suspense fallback={"loading..."}>
					<RouterProvider router={router} />
				</Suspense>
			</Provider>
		</StrictMode>
	);
}
