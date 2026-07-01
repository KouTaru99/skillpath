'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppShell, Burger, Group, Text, NavLink, ScrollArea, Divider, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ROLES, skillsByGroup } from '@/lib/structure';

export function AppFrame({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const close = opened ? toggle : undefined;

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="lg"
    >
      <AppShell.Header withBorder>
        <Group h="100%" px="md" gap="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text
            component={Link}
            href="/"
            fw={700}
            size="lg"
            c="indigo.7"
            style={{ textDecoration: 'none' }}
          >
            SkillPath
          </Text>
          <Text size="xs" c="dimmed" visibleFrom="sm">
            ôn kỹ năng phỏng vấn thăng cấp
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <ScrollArea type="scroll" px="sm" py="md">
          {ROLES.map((role) => (
            <div key={role.slug} style={{ marginBottom: 8 }}>
              <Group justify="space-between" px="xs" mb={6}>
                <Text size="sm" fw={700}>
                  {role.title}
                </Text>
                {!role.available && (
                  <Badge size="xs" variant="light" color="gray">
                    sắp có
                  </Badge>
                )}
              </Group>

              {role.available && (
                <>
                  <NavLink
                    component={Link}
                    href={`/${role.slug}`}
                    label="Tổng quan"
                    active={pathname === `/${role.slug}`}
                    onClick={close}
                  />
                  {skillsByGroup().map(({ group, skills }) => (
                    <div key={group} style={{ marginTop: 10 }}>
                      <Text
                        size="xs"
                        fw={600}
                        c="dimmed"
                        tt="uppercase"
                        px="xs"
                        mb={2}
                        style={{ letterSpacing: 0.3 }}
                      >
                        {group}
                      </Text>
                      {skills.map((s) => (
                        <NavLink
                          key={s.slug}
                          component={Link}
                          href={`/${role.slug}/ky-nang/${s.slug}`}
                          label={s.title}
                          active={pathname === `/${role.slug}/ky-nang/${s.slug}`}
                          onClick={close}
                        />
                      ))}
                    </div>
                  ))}
                  <NavLink
                    component={Link}
                    href={`/${role.slug}/tinh-huong`}
                    label="Tình huống thực chiến"
                    description="50 issue/bug thật + cách gỡ"
                    active={pathname === `/${role.slug}/tinh-huong`}
                    color="indigo"
                    variant="filled"
                    onClick={close}
                    mt="md"
                  />
                </>
              )}
              <Divider my="sm" />
            </div>
          ))}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
