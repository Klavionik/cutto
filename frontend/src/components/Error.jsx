import { Button, Stack, Text, Title } from "@mantine/core"
import { Link, useRouteError } from "react-router-dom"

export default function Error() {
  const error = useRouteError()
  const status = error?.response?.status

  const text = status
    ? `Server error ${status}. So sad...`
    : "Something bad happened and we don't know what."

  return (
    <Stack h="100%" ta="center" align="center" justify="center" spacing="xs">
      <Title order={1}>The horror, the horror!</Title>
      <Text>{text}</Text>
      <Button w={200} component={Link} reloadDocument>
        Try again
      </Button>
    </Stack>
  )
}
