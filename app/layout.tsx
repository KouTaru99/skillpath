import '@mantine/core/styles.css';
import 'highlight.js/styles/github.css';
import './globals.css';
import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { theme } from '@/lib/theme';
import { AppFrame } from '@/components/AppFrame';

export const metadata: Metadata = {
  title: 'SkillPath — ôn kỹ năng phỏng vấn thăng cấp',
  description:
    'Tra cứu kỹ năng cần có theo từng role · level · vùng: định nghĩa và ví dụ thực tế để ôn cho buổi phỏng vấn thăng cấp.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppFrame>{children}</AppFrame>
        </MantineProvider>
      </body>
    </html>
  );
}
