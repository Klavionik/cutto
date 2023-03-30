import { AppShell, Navbar, NavLink, ThemeIcon, Title } from "@mantine/core"
import { IconHome, IconLayersLinked, IconList, IconSquareRoundedPlus } from "@tabler/icons-react"
import { Link, Outlet, useMatch } from "react-router-dom"
import { createOwner } from "./api.js"
import { OwnerContext } from "./OwnerContext.js"
import { ThemeProvider } from "./ThemeProvider"
import { useEffect } from "react"
import { useLocalStorage } from "@mantine/hooks"

export default function App() {
  const rootMatch = useMatch({ path: "/" })
  const newLinkPage = useMatch({ path: "/new" })
  const linkListPage = useMatch({ path: "/list/:owner*" })
  const [owner, setOwner] = useLocalStorage({ key: "owner", getInitialValueInEffect: false })

  useEffect(() => {
    if (owner) return

    createOwner().then(({ id }) => setOwner(id))
  }, [])

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
                to="/"
                label="Home"
                p="md"
                variant="filled"
                color="teal.7"
                active={Boolean(rootMatch)}
                icon={<IconHome size={18} />}
              />
              <NavLink
                component={Link}
                to="/new"
                label="Create a link"
                p="md"
                variant="filled"
                color="teal.7"
                active={Boolean(newLinkPage)}
                icon={<IconSquareRoundedPlus size={18} />}
              />
              <NavLink
                component={Link}
                to="/list"
                active={Boolean(linkListPage)}
                label="Link history"
                p="md"
                color="teal.7"
                variant="filled"
                icon={<IconList size={18} />}
              />
            </Navbar.Section>
          </Navbar>
        }
      >
        <OwnerContext.Provider value={owner}>
          <Outlet />
        </OwnerContext.Provider>
      </AppShell>
    </ThemeProvider>
  )
}
