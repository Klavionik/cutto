import { Paper, Text, Title } from "@mantine/core"

export default function Welcome() {
  return (
    <Paper shadow="md" p="xl" withBorder maw={600}>
      <p>
        <Title>Welcome to URL Shortener!</Title>
        <Text>Hello!</Text>
      </p>
    </Paper>
  )
}
