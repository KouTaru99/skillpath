import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Title, Text, Card, Group, Stack, ThemeIcon, Breadcrumbs, Anchor } from '@mantine/core';
import { ROLES, getRole, skillsByGroup } from '@/lib/structure';
import { LevelSwitcher } from '@/components/LevelSwitcher';

export function generateStaticParams() {
  return ROLES.filter((r) => r.available).map((r) => ({ role: r.slug }));
}

export default async function SeniorPage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleSlug } = await params;
  const role = getRole(roleSlug);
  if (!role || !role.available) notFound();

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md" fz="sm">
        <Anchor component={Link} href="/" c="dimmed">
          Trang chủ
        </Anchor>
        <Anchor component={Link} href={`/${role.slug}`} c="dimmed">
          {role.title}
        </Anchor>
        <Text c="dimmed">Senior</Text>
      </Breadcrumbs>

      <Title order={1} mb={6}>
        {role.title}
      </Title>
      <LevelSwitcher role={role.slug} active="senior" />
      <Text c="dimmed" mb="lg" maw={640}>
        Senior giữ nguyên yêu cầu của Experienced và thêm 2 mảng mới: kiến trúc & thiết kế giải
        pháp, quản lý & lãnh đạo kỹ thuật — đúng bản chất &quot;từ code giỏi sang tư vấn kiến trúc,
        dẫn dắt đội&quot;. Kỹ năng cũ vẫn ở đây vì career-path vẫn yêu cầu, chỉ đào sâu hơn.
      </Text>

      <Stack gap="xl">
        {skillsByGroup('senior').map(({ group, skills }) => (
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
