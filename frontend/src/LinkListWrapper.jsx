import { useContext, useEffect } from "react"
import { OwnerContext } from "./App.jsx"
import { useNavigate } from "react-router-dom"

export default function LinkListWrapper() {
  const owner = useContext(OwnerContext)
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/list/${owner}`)
  }, [owner, navigate])
}
