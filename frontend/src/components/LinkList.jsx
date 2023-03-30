import { ActionIcon, Button, Group, Modal, Paper, Stack, Table, Text, Tooltip } from "@mantine/core"
import { deleteOwnerLinks, listOwnerLinks } from "../api.js"
import { Form, useLoaderData } from "react-router-dom"
import { IconChartBar } from "@tabler/icons-react"
import { SITE_URL } from "../config.js"
import { useDisclosure } from "@mantine/hooks"

export async function loader({ params }) {
  return await listOwnerLinks(params.owner)
}

export async function action({ params }) {
  await deleteOwnerLinks(params.owner)
  return null
}

export default function LinkList() {
  const links = useLoaderData()
  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
    timeStyle: "short",
  })
  const [opened, { open, close }] = useDisclosure(false)

  const rows = links.map((link) => {
    return (
      <tr key={link.alias}>
        <td>
          <Text>{dateFormatter.format(new Date(link.createdAt))}</Text>
        </td>
        <td className="td-alias">
          <a href={`${SITE_URL}/go/${link.alias}`}>
            <Text>{link.alias}</Text>
          </a>
        </td>
        <td className="td-targetUrl">
          <a href={link.targetUrl}>
            <Text truncate>{link.targetUrl}</Text>
          </a>
        </td>
        <td>
          <Group spacing={5}>
            <span>{link.clicksCount}</span>
            <ActionIcon onClick={open} variant="filled" size="1.15rem" color="blue.4">
              <IconChartBar />
            </ActionIcon>
          </Group>
        </td>
        <td>
          <Tooltip position="bottom-start" openDelay={300} label={link.password}>
            <span>{link.password ? "******" : "-"}</span>
          </Tooltip>
        </td>
        <td>{link.expiresAfter ? dateFormatter.format(new Date(link.expiresAfter)) : "-"}</td>
      </tr>
    )
  })

  return (
    <Paper shadow="md" p="xl" withBorder mih={400} maw={1200}>
      <Modal opened={opened} onClose={close} title="Clicks statistics">
        {/* Modal content */}
      </Modal>
      <Stack align="flex-start">
        <Form method="post">
          <Button type="submit" disabled={!links.length} color="red">
            Clear history
          </Button>
        </Form>
        <Table verticalSpacing="sm">
          <thead>
            <tr>
              <th>Created</th>
              <th>Alias</th>
              <th>URL</th>
              <th>Clicks</th>
              <th>Password</th>
              <th>Expires</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Stack>
    </Paper>
  )
}
