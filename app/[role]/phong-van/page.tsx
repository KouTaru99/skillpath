import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Text, Box, Breadcrumbs, Anchor, Card, Group, Badge } from '@mantine/core';
import { ROLES, getRole, phongVanDomains } from '@/lib/structure';
import { renderMarkdownFile } from '@/lib/md';

export function generateStaticParams() {
  return ROLES.filter((r) => r.available && r.hasPhongVan).map((r) => ({ role: r.slug }));
}

export default async function PhongVanPage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleSlug } = await params;
  const role = getRole(roleSlug);
  if (!role || !role.available || !role.hasPhongVan) notFound();

  const html = renderMarkdownFile(`phong-van/${role.slug}.md`);
  const domains = phongVanDomains(role.slug);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="lg" fz="sm">
        <Anchor component={Link} href="/" c="dimmed">
          Trang chủ
        </Anchor>
        <Anchor component={Link} href={`/${role.slug}`} c="dimmed">
          {role.title}
        </Anchor>
        <Text c="dimmed">Lab phỏng vấn</Text>
      </Breadcrumbs>

      {domains.length > 0 && (
        <Card withBorder radius="md" mb="lg" padding="md">
          <Text fw={600} fz="sm" mb="xs">
            Bộ lab theo domain nghiệp vụ
          </Text>
          {domains.map((d) => (
            <Group key={d.slug} gap="xs" wrap="nowrap">
              <Badge color="teal" variant="light" style={{ flexShrink: 0 }}>
                MỚI
              </Badge>
              <Text fz="sm">
                <Anchor component={Link} href={`/${role.slug}/phong-van/${d.slug}`} fw={600}>
                  {d.title}
                </Anchor>{' '}
                — {d.short}
              </Text>
            </Group>
          ))}
        </Card>
      )}

      <Box className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
}
