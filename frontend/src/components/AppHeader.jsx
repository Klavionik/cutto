import { Burger, Group, Header } from "@mantine/core"
import AppLogo from "./AppLogo.jsx"

export default function AppHeader({ burgerOpened, onBurgerClick }) {
  return (
    <Header height={50} p="sm">
      <Group spacing="xs" align="center">
        <Burger opened={burgerOpened} onClick={onBurgerClick} size="sm" />
        <AppLogo isMobile={true} />
      </Group>
    </Header>
  )
}
