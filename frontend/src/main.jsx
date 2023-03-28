import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { action as linksAction, loader as linksLoader } from "./components/LinkList.jsx"
import App from "./App"
import LinkList from "./components/LinkList.jsx"
import LinkListWrapper from "./components/LinkListWrapper.jsx"
import NewLink from "./components/NewLink.jsx"
import React from "react"
import ReactDOM from "react-dom/client"

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
        element: <LinkListWrapper />,
      },
      {
        path: "list/:owner",
        element: <LinkList />,
        loader: linksLoader,
        action: linksAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
