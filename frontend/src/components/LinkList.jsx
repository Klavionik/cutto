import { Button, Paper, Stack, Table, Text, Tooltip } from "@mantine/core"
import { deleteOwnerLinks, listOwnerLinks } from "../api.js"
import { useFetcher, useLoaderData } from "react-router-dom"
import { SITE_URL } from "../config.js"

export async function loader({ params }) {
  return await listOwnerLinks(params.owner)
}

export async function action({ params }) {
  await deleteOwnerLinks(params.owner)
  return null
}

export default function LinkList() {
  const links = useLoaderData()
  const fetcher = useFetcher()
  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
    timeStyle: "short",
  })

  const rows = links.map((link) => {
    return (
      <tr key={link.alias}>
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
        <td>{link.clicksCount}</td>
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
      <Stack align="flex-start">
        <fetcher.Form method="post">
          <Button type="submit" disabled={!links.length} color="red">
            Clear history
          </Button>
        </fetcher.Form>
        <Table verticalSpacing="sm">
          <thead>
            <tr>
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
