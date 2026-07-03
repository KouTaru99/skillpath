import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Text, Box, Breadcrumbs, Anchor } from '@mantine/core';
import { ROLES, getRole } from '@/lib/structure';
import { renderMarkdownFile } from '@/lib/md';

export function generateStaticParams() {
  return ROLES.filter((r) => r.available && r.hasPhongVan).map((r) => ({ role: r.slug }));
}

export default async function PhongVanPage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleSlug } = await params;
  const role = getRole(roleSlug);
  if (!role || !role.available || !role.hasPhongVan) notFound();

  const html = renderMarkdownFile(`phong-van/${role.slug}.md`);

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

      <Box className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
}
