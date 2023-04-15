import { AppShell, Navbar, NavLink } from "@mantine/core"
import { createOwner, getOwner } from "./api.js"
import { IconHome, IconInfoCircle, IconList, IconSquareRoundedPlus } from "@tabler/icons-react"
import { Link, Outlet, useLocation, useMatch } from "react-router-dom"
import { useEffect, useState } from "react"
import AppHeader from "./components/AppHeader.jsx"
import AppLogo from "./components/AppLogo.jsx"
import { OwnerContext } from "./OwnerContext.js"
import { ThemeProvider } from "./ThemeProvider"
import { useIsMobile } from "./utils.js"
import { useLocalStorage } from "@mantine/hooks"

export default function App() {
  const rootMatch = useMatch({ path: "/" })
  const newLinkPage = useMatch({ path: "/new" })
  const linkListPage = useMatch({ path: "/list/:owner*" })
  const aboutPage = useMatch({ path: "/about" })
  const [owner, setOwner] = useLocalStorage({ key: "owner", getInitialValueInEffect: false })
  const [burgerOpened, setBurgerOpened] = useState(false)
  const isMobile = useIsMobile()
  const location = useLocation()

  function toggleBurgerMenu() {
    setBurgerOpened((o) => !o)
  }

  useEffect(() => {
    setBurgerOpened(false)
  }, [location])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ThemeProvider>
      <AppShell
        padding={isMobile ? 0 : "md"}
        header={
          isMobile ? (
            <AppHeader burgerOpened={burgerOpened} onBurgerClick={toggleBurgerMenu} />
          ) : null
        }
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar p="xs" width={{ base: 300 }} hiddenBreakpoint="sm" hidden={!burgerOpened}>
            <Navbar.Section>{isMobile ? null : <AppLogo />}</Navbar.Section>
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
                to={`/list/${owner}`}
                active={Boolean(linkListPage)}
                label="Link history"
                p="md"
                color="teal.7"
                variant="filled"
                icon={<IconList size={18} />}
              />
            </Navbar.Section>
            <Navbar.Section>
              <NavLink
                component={Link}
                to="/about"
                active={Boolean(aboutPage)}
                label="About"
                p="md"
                color="teal.7"
                variant="filled"
                icon={<IconInfoCircle size={18} />}
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
