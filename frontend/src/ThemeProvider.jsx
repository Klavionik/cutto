import { MantineProvider } from "@mantine/core"

function globalStyles(theme) {
  return {
    ".link": {
      textDecoration: "none",
      color: theme.colors.blue,
      transition: "color 100ms",
    },
    ".link:hover": { color: theme.colors.blue[6] },
    ".td-alias": { maxWidth: 150 },
    ".td-targetUrl": { maxWidth: 220 },
    td: { cursor: "default", wordBreak: "break-all" },
    ".no-link, .no-link:visited": {
      color: "black",
      textDecoration: "none",
    },
    ".logo": {
      cursor: "default",
    },
  }
}

export function ThemeProvider({ children }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ globalStyles }}>
      {children}
    </MantineProvider>
  )
}
