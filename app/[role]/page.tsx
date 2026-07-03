import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Stack,
  ThemeIcon,
  Breadcrumbs,
  Anchor,
} from '@mantine/core';
import { ROLES, getRole, skillsByGroup, getLevelTitle } from '@/lib/structure';
import { LevelSwitcher } from '@/components/LevelSwitcher';

export function generateStaticParams() {
  return ROLES.filter((r) => r.available).map((r) => ({ role: r.slug }));
}

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleSlug } = await params;
  const role = getRole(roleSlug);
  if (!role || !role.available) notFound();

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md" fz="sm">
        <Anchor component={Link} href="/" c="dimmed">
          Trang chủ
        </Anchor>
        <Text c="dimmed">{role.title}</Text>
      </Breadcrumbs>

      <Title order={1} mb={6}>
        {role.title}
      </Title>
      <LevelSwitcher role={role.slug} active="entry-experienced" />
      <Text c="dimmed" mb="lg" maw={640}>
        Kỹ năng cần cho lộ trình {getLevelTitle(role.slug, 'entry-experienced')}. Mỗi kỹ năng có
        định nghĩa và ví dụ thực tế chi tiết ở từng mức thành thạo. Chọn một kỹ năng để bắt đầu.
      </Text>

      {role.hasTinhHuong && (
        <Link
          href={`/${role.slug}/tinh-huong`}
          style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem' }}
        >
          <Card withBorder radius="md" padding="md" bg="indigo.0">
            <Group justify="space-between" wrap="nowrap">
              <div>
                <Text fw={600} c="indigo.8">
                  🔧 Tình huống thực chiến — 50 issue/bug thật + cách gỡ
                </Text>
                <Text size="sm" c="dimmed">
                  Những ca gãy chân hay gặp khi làm việc thật, gom theo chủ đề để tra nhanh.
                </Text>
              </div>
              <ThemeIcon variant="filled" color="indigo" size="md" radius="xl">
                <span aria-hidden>→</span>
              </ThemeIcon>
            </Group>
          </Card>
        </Link>
      )}

      <Stack gap="xl">
        {skillsByGroup(role.slug, 'entry-experienced').map(({ group, skills }) => (
          <div key={group}>
            <Text fw={700} c="indigo.7" mb="sm">
              {group}
            </Text>
            <Stack gap="xs">
              {skills.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${role.slug}/ky-nang/${s.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card withBorder radius="md" padding="md">
                    <Group justify="space-between" wrap="nowrap">
                      <Text fw={500}>{s.title}</Text>
                      <ThemeIcon variant="light" color="indigo" size="sm" radius="xl">
                        <span aria-hidden>→</span>
                      </ThemeIcon>
                    </Group>
                  </Card>
                </Link>
              ))}
            </Stack>
          </div>
        ))}
      </Stack>
    </Container>
  );
}
