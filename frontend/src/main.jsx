import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import LinkList from "./LinkList.jsx"
import LinkListWrapper from "./LinkListWrapper.jsx"
import { action as linksAction, loader as linksLoader } from "./LinkList.jsx"
import NewLink from "./NewLink.jsx"
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
