import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { action as linksAction, loader as linksLoader } from "./components/LinkList.jsx"
import App from "./App"
import Error from "./components/Error.jsx"
import LinkList from "./components/LinkList.jsx"
import LinkListWrapper from "./components/LinkListWrapper.jsx"
import NewLink from "./components/NewLink.jsx"
import React from "react"
import ReactDOM from "react-dom/client"
import Welcome from "./components/Welcome.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "new",
        element: <NewLink />,
        errorElement: <Error />,
      },
      {
        path: "list",
        element: <LinkListWrapper />,
      },
      {
        path: "list/:owner",
        element: <LinkList />,
        loader: linksLoader,
        action: linksAction,
        errorElement: <Error />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
