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
import { ROLES, getRole, skillsByGroup } from '@/lib/structure';

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
      <Text c="dimmed" mb="xl" maw={640}>
        16 kỹ năng cần cho lộ trình Entry → Experienced. Mỗi kỹ năng có định nghĩa và ví dụ thực tế
        chi tiết ở từng mức thành thạo. Chọn một kỹ năng để bắt đầu.
      </Text>

      <Stack gap="xl">
        {skillsByGroup().map(({ group, skills }) => (
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
