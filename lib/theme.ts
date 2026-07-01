import { createTheme } from '@mantine/core';

// Theme SkillPath — light, accent xanh, bo góc mềm. Full-width app-shell.
export const theme = createTheme({
  primaryColor: 'indigo',
  primaryShade: { light: 6 },
  defaultRadius: 'md',
  fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: 'ui-monospace, "SF Mono", Menlo, monospace',
  headings: {
    fontWeight: '650',
    sizes: {
      h1: { fontSize: '1.75rem', lineHeight: '1.25' },
      h2: { fontSize: '1.35rem', lineHeight: '1.3' },
      h3: { fontSize: '1.1rem' },
    },
  },
});
