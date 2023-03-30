import { ActionIcon, Button, Group, Paper, Stack, Table, Text, Tooltip } from "@mantine/core"
import { deleteOwnerLinks, listOwnerLinks } from "../api.js"
import { Form, Link, Outlet, useLoaderData } from "react-router-dom"
import { IconChartBar } from "@tabler/icons-react"
import { SITE_URL } from "../config.js"

export async function loader({ params }) {
  return await listOwnerLinks(params.owner)
}

export async function action({ params }) {
  await deleteOwnerLinks(params.owner)
  return null
}

function LinkTable({ links, dateFormatter }) {
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
            <ActionIcon
              component={Link}
              to={`link/${link.alias}/clicks`}
              variant="filled"
              size="1.15rem"
              color="blue.4"
            >
              <IconChartBar />
            </ActionIcon>
          </Group>
        </td>
        <td>
          {link.password ? (
            <Tooltip position="bottom-start" openDelay={300} label={link.password}>
              <span>******</span>
            </Tooltip>
          ) : (
            <span>-</span>
          )}
        </td>
        <td>{link.expiresAfter ? dateFormatter.format(new Date(link.expiresAfter)) : "-"}</td>
      </tr>
    )
  })

  return (
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
  )
}

export default function LinkList() {
  const links = useLoaderData()
  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
    timeStyle: "short",
  })

  return (
    <>
      <Outlet />
      <Paper shadow="md" p="xl" withBorder mih={400} maw={1200}>
        <Stack align="flex-start">
          <Form method="post">
            <Button type="submit" disabled={!links.length} color="red">
              Clear history
            </Button>
          </Form>
          <LinkTable links={links} dateFormatter={dateFormatter} />
        </Stack>
      </Paper>
    </>
  )
}
