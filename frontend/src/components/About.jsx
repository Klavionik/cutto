import { Paper, Text, Title } from "@mantine/core"

export default function About() {
  return (
    <Paper shadow="md" p="xl" pt={0} withBorder maw={600}>
      <Title order={2} mt="xl" mb="xs">
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
    </Paper>
  )
}
