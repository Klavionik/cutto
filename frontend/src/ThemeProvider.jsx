import { MantineProvider } from "@mantine/core"

function globalStyles(theme) {
  return {
    ".link": {
      textDecoration: "none",
      color: theme.colors.blue,
      transition: "color 100ms",
    },
    ".link:hover": { color: theme.colors.blue[6] },
    ".td-alias": { minWidth: "fit-content" },
    ".td-targetUrl": { maxWidth: 600 },
    td: { cursor: "default" },
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
