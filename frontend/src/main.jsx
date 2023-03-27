import App from "./App"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NewLink from "./NewLink.jsx"
import LinkList from "./LinkList.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <div>Welcome to URL shortener!</div>,
      },
      {
        path: "new",
        element: <NewLink />,
      },
      {
        path: "list",
        element: <LinkList />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
