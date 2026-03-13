import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Dashboard from "./components/Dashboard";
import DeepScan from "./components/DeepScan";
import Privacy from "./components/Privacy";
import Communication from "./components/Communication";
import Multimedia from "./components/Multimedia";
import Reports from "./components/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "deep-scan", Component: DeepScan },
      { path: "privacy", Component: Privacy },
      { path: "communication", Component: Communication },
      { path: "multimedia", Component: Multimedia },
      { path: "reports", Component: Reports },
    ],
  },
]);
