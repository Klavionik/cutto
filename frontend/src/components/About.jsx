import { Text, Title } from "@mantine/core"
import PageCard from "./PageCard.jsx"

export default function About() {
  return (
    <PageCard>
      <Title order={2} mb="xs">
        About the project
      </Title>
      <Text>
        <b>Cutto!</b>&nbsp;is a URL shortener app made by&nbsp;
        <a className="link" href="https://github.com/Klavionik">
          Klavionik
        </a>
        &nbsp;(
        <a className="link" href="https://gitlab.com/Klavionik/shortener">
          source code
        </a>
        ) .
      </Text>
      <br />
      <Text>
        UI built with delightful&nbsp;
        <a className="link" href="https://mantine.dev">
          Mantine.
        </a>
      </Text>
    </PageCard>
  )
}
