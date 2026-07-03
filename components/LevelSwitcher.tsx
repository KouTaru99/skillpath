import Link from 'next/link';
import { Group, Button, Tooltip } from '@mantine/core';
import { LEVELS, roleHasLevel, getLevelTitle, type LevelSlug } from '@/lib/structure';

export function LevelSwitcher({ role, active }: { role: string; active: LevelSlug }) {
  return (
    <Group gap="xs" mb="lg">
      {LEVELS.map((lvl) => {
        const isActive = lvl.slug === active;
        const available = roleHasLevel(role, lvl.slug);
        const title = getLevelTitle(role, lvl.slug);

        if (!available) {
          return (
            <Tooltip key={lvl.slug} label={lvl.blurb}>
              <Button disabled variant="light" color="indigo" size="xs" radius="xl">
                {title}
              </Button>
            </Tooltip>
          );
        }

        const href = lvl.slug === 'entry-experienced' ? `/${role}` : `/${role}/${lvl.slug}`;
        return (
          <Button
            key={lvl.slug}
            component={Link}
            href={href}
            variant={isActive ? 'filled' : 'light'}
            color="indigo"
            size="xs"
            radius="xl"
          >
            {title}
          </Button>
        );
      })}
    </Group>
  );
}
