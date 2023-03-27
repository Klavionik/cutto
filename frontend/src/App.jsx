import { AppShell, Navbar, NavLink, ThemeIcon, Title } from "@mantine/core"
import { IconLayersLinked, IconLink, IconList } from "@tabler/icons-react"
import { Link, Outlet } from "react-router-dom"
import { ThemeProvider } from "./ThemeProvider"
import { useMatch } from "react-router-dom"

export default function App() {
  const newLinkPage = useMatch({ path: "/new" })
  const linkListPage = useMatch({ path: "/list" })

  return (
    <ThemeProvider>
      <AppShell
        navbar={
          <Navbar p="xs" width={{ base: 300 }}>
            <Navbar.Section>
              <Title>
                URL Shortener
                <ThemeIcon ml={10} color="teal">
                  <IconLayersLinked size={24} />
                </ThemeIcon>
              </Title>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
              <NavLink
                component={Link}
                to="/new"
                label="Create a link"
                p="md"
                variant="filled"
                color="teal.7"
                active={Boolean(newLinkPage)}
                icon={<IconLink size={18} />}
                onChange={(e) => console.log(e)}
              />
              <NavLink
                component={Link}
                to="/list"
                active={Boolean(linkListPage)}
                label="My links"
                p="md"
                color="teal.7"
                variant="filled"
                icon={<IconList size={18} />}
              />
            </Navbar.Section>
          </Navbar>
        }
      >
        <Outlet />
      </AppShell>
    </ThemeProvider>
  )
}
