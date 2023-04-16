import { ActionIcon, Button, Group, Paper, Stack, Table, Text, Tooltip } from "@mantine/core"
import { deleteOwnerLinks, listOwnerLinks } from "../api.js"
import { Form, Link, Outlet, useLoaderData } from "react-router-dom"
import { IconChartBar } from "@tabler/icons-react"
import PageCard from "./PageCard.jsx"
import { SITE_URL } from "../config.js"
import { useIsTablet } from "../utils.js"

export async function loader({ params }) {
  return await listOwnerLinks(params.owner)
}

export async function action({ params }) {
  await deleteOwnerLinks(params.owner)
  return null
}

function PasswordCell({ password }) {
  return password ? (
    <Tooltip
      position="bottom-start"
      events={{ hover: true, touch: true, focus: false }}
      openDelay={300}
      label={password}
    >
      <span>******</span>
    </Tooltip>
  ) : (
    <span>-</span>
  )
}

function ClicksCell({ clicksCount, linkAlias }) {
  return (
    <Group spacing={5}>
      <span>{clicksCount}</span>
      <ActionIcon
        component={Link}
        to={`link/${linkAlias}/clicks`}
        variant="filled"
        size="1.15rem"
        color="blue.4"
      >
        <IconChartBar />
      </ActionIcon>
    </Group>
  )
}

function URLCell({ targetUrl }) {
  return (
    <a className="link" href={targetUrl}>
      <Text>{targetUrl}</Text>
    </a>
  )
}

function AliasCell({ alias }) {
  return (
    <a className="link" href={`${SITE_URL}/go/${alias}`}>
      {alias}
    </a>
  )
}

function DateCell({ date, dateFormatter }) {
  return date ? dateFormatter.format(new Date(date)) : "-"
}

function LinkTable({ links, dateFormatter }) {
  const rows = links.map((link) => {
    return (
      <tr key={link.alias}>
        <td>
          <DateCell date={link.createdAt} dateFormatter={dateFormatter} />
        </td>
        <td className="td-alias">
          <AliasCell alias={link.alias} />
        </td>
        <td className="td-targetUrl">
          <URLCell targetUrl={link.targetUrl} />
        </td>
        <td>
          <ClicksCell clicksCount={link.clicksCount} linkAlias={link.alias} />
        </td>
        <td>
          <PasswordCell password={link.password} />
        </td>
        <td>
          <DateCell date={link.expiresAfter} dateFormatter={dateFormatter} />
        </td>
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

function MobileLinkTable({ links, dateFormatter }) {
  return links.map((link) => {
    return (
      <Paper shadow="xs" p="xs">
        <Table key={link.alias} sx={{ th: { width: 100 }, tableLayout: "fixed" }}>
          <tbody>
            <tr>
              <th>Created</th>
              <td>
                <DateCell date={link.createdAt} dateFormatter={dateFormatter} />
              </td>
            </tr>
            <tr>
              <th>Alias</th>
              <td>
                <AliasCell alias={link.alias} />
              </td>
            </tr>
            <tr>
              <th>URL</th>
              <td>
                <URLCell targetUrl={link.targetUrl} />
              </td>
            </tr>
            <tr>
              <th>Clicks</th>
              <td>
                <ClicksCell clicksCount={link.clicksCount} linkAlias={link.alias} />
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <PasswordCell password={link.password} />
              </td>
            </tr>
            <tr>
              <th>Expires</th>
              <td>
                <DateCell date={link.expiresAfter} dateFormatter={dateFormatter} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    )
  })
}

export default function LinkList() {
  const links = useLoaderData()
  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
    timeStyle: "short",
  })
  const isTablet = useIsTablet()

  return (
    <>
      <Outlet />
      <PageCard
        p={isTablet ? "xs" : "xl"}
        maw={isTablet ? "initial" : 1200}
        mih={isTablet ? "initial" : 500}
      >
        <Stack>
          <Form method="post">
            <Button type="submit" disabled={!links.length} color="red">
              Clear history
            </Button>
          </Form>
          {isTablet ? (
            <MobileLinkTable links={links} dateFormatter={dateFormatter} />
          ) : (
            <LinkTable links={links} dateFormatter={dateFormatter} />
          )}
        </Stack>
      </PageCard>
    </>
  )
}
