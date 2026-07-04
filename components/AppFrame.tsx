'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppShell, Burger, Group, Text, NavLink, ScrollArea, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  ROLES,
  LEVELS,
  skillsByGroup,
  roleHasLevel,
  getLevelTitle,
  phongVanDomains,
  type LevelSlug,
} from '@/lib/structure';

// trailingSlash:true (static export) → pathname bản build có "/" cuối, bản dev thì không.
// Chuẩn hoá cả 2 vế trước khi so sánh, nếu không active không bao giờ khớp trên bản live.
function norm(p: string): string {
  const s = p.replace(/\/+$/, '');
  return s === '' ? '/' : s;
}

// Tìm nhánh (role/level/group) chứa trang đang xem để tự mở đúng nhánh đó trong tree.
function locateBranch(pathname: string): { role: string; level?: LevelSlug; group?: string } | null {
  const parts = norm(pathname).split('/').filter(Boolean);
  if (parts.length === 0) return null;
  const roleSlug = parts[0];
  if (!ROLES.some((r) => r.slug === roleSlug)) return null;

  if (parts[1] === 'ky-nang' && parts[2]) {
    // Trang kỹ năng không mang level trên URL — lấy level ĐẦU TIÊN chứa kỹ năng đó.
    for (const lvl of LEVELS) {
      if (!roleHasLevel(roleSlug, lvl.slug)) continue;
      for (const { group, skills } of skillsByGroup(roleSlug, lvl.slug)) {
        if (skills.some((s) => s.slug === parts[2])) {
          return { role: roleSlug, level: lvl.slug, group };
        }
      }
    }
    return { role: roleSlug };
  }

  if (parts[1] === 'senior' || parts[1] === 'specialist') {
    return { role: roleSlug, level: parts[1] };
  }
  // /[role], /[role]/tinh-huong, /[role]/phong-van → mở role + level gốc
  return { role: roleSlug, level: 'entry-experienced' };
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const close = opened ? toggle : undefined;

  const [openRoles, setOpenRoles] = useState<Record<string, boolean>>({});
  const [openLevels, setOpenLevels] = useState<Record<string, boolean>>({});
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Điều hướng tới đâu, tree tự mở nhánh đó (giữ nguyên các nhánh người dùng đã tự mở).
  useEffect(() => {
    const loc = locateBranch(pathname);
    if (!loc) return;
    setOpenRoles((s) => ({ ...s, [loc.role]: true }));
    if (loc.level) setOpenLevels((s) => ({ ...s, [`${loc.role}/${loc.level}`]: true }));
    if (loc.level && loc.group)
      setOpenGroups((s) => ({ ...s, [`${loc.role}/${loc.level}/${loc.group}`]: true }));
  }, [pathname]);

  const isActive = (href: string) => norm(pathname) === norm(href);

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
            <NavLink
              key={role.slug}
              label={role.title}
              fw={700}
              disabled={!role.available}
              rightSection={
                !role.available ? (
                  <Badge size="xs" variant="light" color="gray">
                    sắp có
                  </Badge>
                ) : undefined
              }
              opened={!!openRoles[role.slug]}
              onChange={(o) => setOpenRoles((s) => ({ ...s, [role.slug]: o }))}
              childrenOffset={12}
            >
              {role.available &&
                LEVELS.filter((lvl) => roleHasLevel(role.slug, lvl.slug)).map((lvl) => {
                  const levelHref =
                    lvl.slug === 'entry-experienced' ? `/${role.slug}` : `/${role.slug}/${lvl.slug}`;
                  const levelKey = `${role.slug}/${lvl.slug}`;
                  return (
                    <NavLink
                      key={levelKey}
                      label={getLevelTitle(role.slug, lvl.slug)}
                      fw={600}
                      opened={!!openLevels[levelKey]}
                      onChange={(o) => setOpenLevels((s) => ({ ...s, [levelKey]: o }))}
                      childrenOffset={12}
                    >
                      <NavLink
                        component={Link}
                        href={levelHref}
                        label={`Tổng quan ${getLevelTitle(role.slug, lvl.slug)}`}
                        active={isActive(levelHref)}
                        onClick={close}
                      />
                      {skillsByGroup(role.slug, lvl.slug).map(({ group, skills }) => {
                        const groupKey = `${levelKey}/${group}`;
                        return (
                          <NavLink
                            key={groupKey}
                            label={group}
                            fz="xs"
                            c="dimmed"
                            tt="uppercase"
                            opened={!!openGroups[groupKey]}
                            onChange={(o) => setOpenGroups((s) => ({ ...s, [groupKey]: o }))}
                            childrenOffset={8}
                          >
                            {skills.map((s) => (
                              <NavLink
                                key={`${groupKey}/${s.slug}`}
                                component={Link}
                                href={`/${role.slug}/ky-nang/${s.slug}`}
                                label={s.title}
                                active={isActive(`/${role.slug}/ky-nang/${s.slug}`)}
                                onClick={close}
                              />
                            ))}
                          </NavLink>
                        );
                      })}
                    </NavLink>
                  );
                })}
              {role.available && role.hasTinhHuong && (
                <NavLink
                  component={Link}
                  href={`/${role.slug}/tinh-huong`}
                  label="Tình huống thực chiến"
                  description="50 issue/bug thật + cách gỡ"
                  active={isActive(`/${role.slug}/tinh-huong`)}
                  color="indigo"
                  variant="filled"
                  onClick={close}
                  mt="xs"
                />
              )}
              {role.available && role.hasPhongVan && (
                <>
                  <NavLink
                    component={Link}
                    href={`/${role.slug}/phong-van`}
                    label="Lab phỏng vấn"
                    description="Kịch bản mô phỏng buổi phỏng vấn thật"
                    active={isActive(`/${role.slug}/phong-van`)}
                    color="teal"
                    variant="filled"
                    onClick={close}
                    mt="xs"
                  />
                  {phongVanDomains(role.slug).map((d) => (
                    <NavLink
                      key={d.slug}
                      component={Link}
                      href={`/${role.slug}/phong-van/${d.slug}`}
                      label={`Lab phỏng vấn · ${d.title}`}
                      active={isActive(`/${role.slug}/phong-van/${d.slug}`)}
                      color="teal"
                      variant="light"
                      onClick={close}
                    />
                  ))}
                </>
              )}
            </NavLink>
          ))}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
