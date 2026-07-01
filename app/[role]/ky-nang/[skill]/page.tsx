import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Text, Box, Breadcrumbs, Anchor, Group, Card, Divider } from '@mantine/core';
import { ROLES, getRole, getSkill, FE_SKILLS, adjacentSkills } from '@/lib/structure';
import { renderMarkdownFile } from '@/lib/md';

export function generateStaticParams() {
  const out: { role: string; skill: string }[] = [];
  for (const role of ROLES.filter((r) => r.available)) {
    for (const s of FE_SKILLS) out.push({ role: role.slug, skill: s.slug });
  }
  return out;
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ role: string; skill: string }>;
}) {
  const { role: roleSlug, skill: skillSlug } = await params;
  const role = getRole(roleSlug);
  const skill = getSkill(skillSlug);
  if (!role || !skill) notFound();

  const html = renderMarkdownFile(`fe/${skill.slug}.md`);
  const { prev, next } = adjacentSkills(skill.slug);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="lg" fz="sm">
        <Anchor component={Link} href="/" c="dimmed">
          Trang chủ
        </Anchor>
        <Anchor component={Link} href={`/${role.slug}`} c="dimmed">
          {role.title}
        </Anchor>
        <Text c="dimmed" lineClamp={1}>
          {skill.title}
        </Text>
      </Breadcrumbs>

      <Box className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      <Divider my="xl" />

      <Group grow align="stretch" wrap="nowrap">
        {prev ? (
          <Link href={`/${role.slug}/ky-nang/${prev.slug}`} style={{ textDecoration: 'none' }}>
            <Card withBorder radius="md" padding="sm" h="100%">
              <Text size="xs" c="dimmed">
                ← Kỹ năng trước
              </Text>
              <Text size="sm" fw={500}>
                {prev.title}
              </Text>
            </Card>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/${role.slug}/ky-nang/${next.slug}`} style={{ textDecoration: 'none' }}>
            <Card withBorder radius="md" padding="sm" h="100%" ta="right">
              <Text size="xs" c="dimmed">
                Kỹ năng tiếp →
              </Text>
              <Text size="sm" fw={500}>
                {next.title}
              </Text>
            </Card>
          </Link>
        ) : (
          <div />
        )}
      </Group>
    </Container>
  );
}
