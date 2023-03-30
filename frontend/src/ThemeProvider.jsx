import { MantineProvider } from "@mantine/core"

export function ThemeProvider({ children }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (theme) => ({
          "table a": {
            textDecoration: "none",
            color: theme.colors.blue,
            transition: "color 100ms",
          },
          "table a:hover": { color: theme.colors.blue[6] },
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
        }),
      }}
    >
      {children}
    </MantineProvider>
  )
}
