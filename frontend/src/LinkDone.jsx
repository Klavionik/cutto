import { ActionIcon, Alert, CopyButton, Group, Stack, Text, Title } from "@mantine/core"
import { IconCheck, IconLink } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { SITE_URL } from "./config.js"

function CopyURLButton({ value }) {
  function handleClick(copy) {
    return (e) => {
      e.stopPropagation()
      copy(e)
    }
  }

  return (
    <CopyButton value={value}>
      {({ copied, copy }) => (
        <ActionIcon color={copied ? "teal" : "gray"} onClick={handleClick(copy)}>
          {copied ? <IconCheck size={18} /> : <IconLink size={18} />}
        </ActionIcon>
      )}
    </CopyButton>
  )
}

export default function LinkDone({ data }) {
  const fullLink = `${SITE_URL}/go/${data.alias}`

  return (
    <Stack spacing="xl">
      <Title color="teal">Done! 🎉</Title>
      <Stack spacing="xs">
        <Title order={4}>Here's your short link:</Title>
        <Group spacing={5}>
          <Text fw="bold">{fullLink}</Text>
          <CopyURLButton value={fullLink} />
        </Group>
        <Alert title="Heads up!" color="orange">
          Bookmark <Link to={`/list/${data.owner}`}>this page</Link> to manage your short links and
          access statistics. This bookmark is going to contain your unique ID&nbsp;
          <Text component={"span"} fw="bold">
            {data.owner}
          </Text>
          . Make sure you don't lose the bookmark or the ID!
        </Alert>
      </Stack>
    </Stack>
  )
}
