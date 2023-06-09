import { Paper } from "@mantine/core"
import { useIsMobile } from "../utils.js"

export default function PageCard({ children, ...rest }) {
  const isMobile = useIsMobile()

  return (
    <Paper
      shadow="md"
      p="xl"
      withBorder={!isMobile}
      h={isMobile ? "100%" : "auto"}
      maw={600}
      {...rest}
    >
      {children}
    </Paper>
  )
}
