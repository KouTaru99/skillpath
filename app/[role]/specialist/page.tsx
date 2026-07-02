import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Title, Text, Card, Group, Stack, ThemeIcon, Breadcrumbs, Anchor } from '@mantine/core';
import { ROLES, getRole, skillsByGroup, roleHasLevel } from '@/lib/structure';
import { LevelSwitcher } from '@/components/LevelSwitcher';

export function generateStaticParams() {
  return ROLES.filter((r) => r.available && roleHasLevel(r.slug, 'specialist')).map((r) => ({ role: r.slug }));
}

export default async function SpecialistPage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleSlug } = await params;
  const role = getRole(roleSlug);
  if (!role || !role.available || !roleHasLevel(role.slug, 'specialist')) notFound();

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md" fz="sm">
        <Anchor component={Link} href="/" c="dimmed">
          Trang chủ
        </Anchor>
        <Anchor component={Link} href={`/${role.slug}`} c="dimmed">
          {role.title}
        </Anchor>
        <Text c="dimmed">Specialist</Text>
      </Breadcrumbs>

      <Title order={1} mb={6}>
        {role.title}
      </Title>
      <LevelSwitcher role={role.slug} active="specialist" />
      <Text c="dimmed" mb="lg" maw={640}>
        Specialist giữ nguyên yêu cầu của Senior và thêm mảng &quot;Chiến lược &amp; quản trị công
        nghệ&quot; — nghiên cứu công nghệ mới, quản lý dự án, sở hữu Technology Stack của đơn vị.
        Đây là 3 vùng cuối cùng của toàn bộ thang {role.title}: từ chuyên gia kỹ thuật sang người
        ra quyết định công nghệ cấp đơn vị.
      </Text>

      <Stack gap="xl">
        {skillsByGroup(role.slug, 'specialist').map(({ group, skills }) => (
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
