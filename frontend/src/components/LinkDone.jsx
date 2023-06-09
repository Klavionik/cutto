import { ActionIcon, Alert, Button, CopyButton, Group, Stack, Text, Title } from "@mantine/core"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { SITE_URL } from "../config.js"

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
        <ActionIcon color={copied ? "teal" : "blue"} onClick={handleClick(copy)}>
          {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
        </ActionIcon>
      )}
    </CopyButton>
  )
}

export default function LinkDone({ data, addAnotherHandler }) {
  const fullLink = `${SITE_URL}/go/${data.alias}`

  return (
    <Stack spacing="xl" align="flex-start">
      <Title color="teal">Done! 🎉</Title>
      <Stack spacing={0}>
        <Text>Here's your short link:</Text>
        <Group spacing={5}>
          <Text fw="bold">{fullLink}</Text>
          <CopyURLButton value={fullLink} />
        </Group>
      </Stack>
      <Alert title="Important" color="orange">
        Your link history is saved on this device. Bookmark&nbsp;
        <Link to={`/list/${data.owner}`}>this page</Link> to access it from any other device. This
        bookmark is going to contain your unique ID.
      </Alert>
      <Button onClick={addAnotherHandler} color="red.6" variant="outline">
        Add another one
      </Button>
    </Stack>
  )
}
