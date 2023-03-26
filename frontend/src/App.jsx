import { ThemeProvider } from "./ThemeProvider"
import { Welcome } from "./Welcome"

export default function App() {
  return (
    <ThemeProvider>
      <Welcome />
    </ThemeProvider>
  )
}
