import Link from 'next/link';
import { Container, Title, Text, SimpleGrid, Card, Group, Badge, Button, Stack } from '@mantine/core';
import { ROLES, SKILLS_BY_ROLE, roleHasLevel } from '@/lib/structure';

function roleSummary(roleSlug: string): string {
  const count = SKILLS_BY_ROLE[roleSlug]?.length ?? 0;
  const scope = roleHasLevel(roleSlug, 'specialist')
    ? 'Entry → Specialist (10 vùng)'
    : 'Entry → Experienced';
  return `${count} kỹ năng · ${scope} · định nghĩa + ví dụ thực tế theo 4 mức.`;
}

export default function HomePage() {
  return (
    <Container size="lg" py="lg">
      <Stack gap="xs" mb="xl">
        <Title order={1}>Ôn đúng kỹ năng cho buổi phỏng vấn thăng cấp</Title>
        <Text size="lg" c="dimmed" maw={720}>
          SkillPath cho bạn biết mỗi role · level · vùng cần <b>những kỹ năng gì</b>, mỗi kỹ năng
          <b> định nghĩa ra sao</b> và <b>ví dụ thực tế/cách code thế nào</b> — như một bản lời giải
          để ôn cho chắc.
        </Text>
      </Stack>

      <Title order={2} mb="md">
        Chọn vị trí của bạn
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {ROLES.map((role) => (
          <Card key={role.slug} withBorder radius="lg" padding="lg">
            <Group justify="space-between" mb="xs">
              <Text fw={650} size="lg">
                {role.title}
              </Text>
              {role.available ? (
                <Badge color="indigo" variant="light">
                  Có sẵn
                </Badge>
              ) : (
                <Badge color="gray" variant="light">
                  Sắp có
                </Badge>
              )}
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              {role.available ? roleSummary(role.slug) : 'Sẽ bổ sung khi có thêm tài liệu.'}
            </Text>
            <Button
              component={Link}
              href={`/${role.slug}`}
              variant={role.available ? 'filled' : 'default'}
              disabled={!role.available}
              fullWidth
            >
              {role.available ? 'Xem lộ trình kỹ năng' : 'Chưa mở'}
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
