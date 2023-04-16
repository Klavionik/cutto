import { useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

export function useIsMobile() {
  const { breakpoints } = useMantineTheme()
  return useMediaQuery(`(max-width: ${breakpoints.sm})`)
}

export function useIsTablet() {
  const { breakpoints } = useMantineTheme()
  return useMediaQuery(`(max-width: ${breakpoints.md})`)
}
