import { AppShell, Group, Image, Navbar, NavLink, Text, Title } from "@mantine/core"
import { createOwner, getOwner } from "./api.js"
import { IconHome, IconList, IconSquareRoundedPlus } from "@tabler/icons-react"
import { Link, Outlet, useMatch } from "react-router-dom"
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
    async function ensureOwnerExists() {
      let ownerExists

      if (owner) {
        try {
          await getOwner(owner)
          ownerExists = true
        } catch (e) {
          const status = e?.response?.status

          if (status === 404) {
            ownerExists = false
          } else {
            throw e
          }
        }
      }

      if (ownerExists) return

      const { id: ownerId } = await createOwner()
      setOwner(ownerId)
    }

    ensureOwnerExists()
  }, [])

  return (
    <ThemeProvider>
      <AppShell
        navbar={
          <Navbar p="xs" width={{ base: 300 }}>
            <Navbar.Section>
              <Group>
                <Image src="../logo.png" maw={60} />
                <Title className="logo">
                  Cutto!
                  <Text span size={12}>
                    <a
                      className="no-link"
                      target="_blank"
                      href="https://jisho.org/search/%23kanji%20%E5%88%80"
                      rel="noreferrer"
                    >
                      刀
                    </a>
                  </Text>
                </Title>
              </Group>
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
                label="Add new link"
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
