import { Group, Image, Text, Title } from "@mantine/core"
import logo from "../../logo.png"

export default function AppLogo({ isMobile }) {
  return (
    <Group spacing="xs">
      <Image src={logo} maw={isMobile ? 30 : 60} />
      <Title order={isMobile ? 3 : 1} className="logo">
        Cutto!
        <Text span size={isMobile ? 10 : 12}>
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
  )
}
