import { StrictMode, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Loading } from "./components";
import store from "./store";
import router from "./router/routes";

export default function App() {
	return (
		<StrictMode>
			<Provider store={store}>
				<Suspense fallback={<Loading />}>
					<RouterProvider router={router} />
				</Suspense>
			</Provider>
		</StrictMode>
	);
}
