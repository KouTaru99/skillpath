import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Text, Box, Breadcrumbs, Anchor } from '@mantine/core';
import { PHONG_VAN_DOMAINS, getRole, getPhongVanDomain } from '@/lib/structure';
import { renderMarkdownFile } from '@/lib/md';

export function generateStaticParams() {
  return Object.entries(PHONG_VAN_DOMAINS).flatMap(([role, domains]) =>
    domains.map((d) => ({ role, domain: d.slug })),
  );
}

export default async function PhongVanDomainPage({
  params,
}: {
  params: Promise<{ role: string; domain: string }>;
}) {
  const { role: roleSlug, domain: domainSlug } = await params;
  const role = getRole(roleSlug);
  const domain = getPhongVanDomain(roleSlug, domainSlug);
  if (!role || !role.available || !role.hasPhongVan || !domain) notFound();

  const html = renderMarkdownFile(`phong-van/${role.slug}-${domain.slug}.md`);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="lg" fz="sm">
        <Anchor component={Link} href="/" c="dimmed">
          Trang chủ
        </Anchor>
        <Anchor component={Link} href={`/${role.slug}`} c="dimmed">
          {role.title}
        </Anchor>
        <Anchor component={Link} href={`/${role.slug}/phong-van`} c="dimmed">
          Lab phỏng vấn
        </Anchor>
        <Text c="dimmed">{domain.title}</Text>
      </Breadcrumbs>

      <Box className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
}
