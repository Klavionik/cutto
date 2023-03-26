import { MantineProvider } from "@mantine/core"

export function ThemeProvider({ children }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  )
}
