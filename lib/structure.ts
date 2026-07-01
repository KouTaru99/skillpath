// Nguồn sự thật cấu trúc SkillPath: role → level → vùng, và map cấp độ kỹ năng × vùng.
// Cấp độ: 0 = chưa yêu cầu (–), 1..4 = Nhập môn / Biết làm / Thành thạo / Chuyên sâu.

export const LEVEL_SYMBOL: Record<number, string> = { 1: '①', 2: '②', 3: '③', 4: '④' };
export const LEVEL_LABEL: Record<number, string> = {
  1: 'Nhập môn',
  2: 'Biết làm',
  3: 'Thành thạo',
  4: 'Chuyên sâu',
};

export interface Skill {
  slug: string;
  title: string;
  group: string;
  // Cấp độ theo 4 cột vùng: [Entry, Ex·V1, Ex·V2, Ex·V3]
  levels: [number, number, number, number];
}

export interface Vung {
  slug: string;
  label: string;
  col: number; // chỉ số cột trong Skill.levels
  note?: string;
}

export interface Role {
  slug: string;
  title: string;
  available: boolean;
  vung: Vung[];
}

// Thứ tự nhóm kỹ năng (hiển thị trong checklist).
export const GROUP_ORDER = [
  'Quy trình & tư duy hệ thống',
  'Lõi Front-end',
  'Kỹ thuật nâng cao FE',
  'Nền tảng CS & dữ liệu',
  'Công cụ & vận hành',
];

// 16 kỹ năng Dev FE (Entry → Experienced).
export const FE_SKILLS: Skill[] = [
  { slug: '01-quy-trinh-ptpm', title: 'Quy trình phát triển phần mềm (Agile/Scrum)', group: 'Quy trình & tư duy hệ thống', levels: [1, 2, 2, 3] },
  { slug: '02-doc-hieu-tai-lieu-giai-phap', title: 'Đọc hiểu & soi lỗi tài liệu giải pháp', group: 'Quy trình & tư duy hệ thống', levels: [1, 2, 2, 3] },
  { slug: '03-lap-trinh-an-toan', title: 'Lập trình an toàn (secure coding)', group: 'Quy trình & tư duy hệ thống', levels: [1, 2, 2, 3] },
  { slug: '04-html-css-js', title: 'HTML / CSS / JavaScript', group: 'Lõi Front-end', levels: [2, 3, 3, 4] },
  { slug: '05-framework-fe', title: 'Framework FE (React/Angular/Vue)', group: 'Lõi Front-end', levels: [1, 2, 3, 3] },
  { slug: '06-ux-ui-co-ban', title: 'UX/UI cơ bản', group: 'Lõi Front-end', levels: [0, 1, 1, 2] },
  { slug: '07-restful-api', title: 'RESTful API (tích hợp BE)', group: 'Lõi Front-end', levels: [0, 1, 2, 2] },
  { slug: '08-component-dung-chung', title: 'Component dùng chung (đóng gói, tái sử dụng)', group: 'Kỹ thuật nâng cao FE', levels: [0, 1, 2, 3] },
  { slug: '09-unit-test', title: 'Unit test', group: 'Kỹ thuật nâng cao FE', levels: [0, 0, 1, 2] },
  { slug: '10-microfrontends', title: 'Microfrontends', group: 'Kỹ thuật nâng cao FE', levels: [0, 0, 1, 2] },
  { slug: '11-oop-dp-algo-ds', title: 'OOP / Design Pattern / Algorithm / Data Structure', group: 'Nền tảng CS & dữ liệu', levels: [1, 2, 2, 3] },
  { slug: '12-csdl-co-ban', title: 'CSDL cơ bản + web server / microservices', group: 'Nền tảng CS & dữ liệu', levels: [0, 1, 1, 2] },
  { slug: '13-ide-coding-convention', title: 'IDE & coding convention', group: 'Công cụ & vận hành', levels: [2, 2, 3, 3] },
  { slug: '14-phan-tich-log-debug', title: 'Phân tích log / debug', group: 'Công cụ & vận hành', levels: [1, 2, 2, 3] },
  { slug: '15-ci-cd', title: 'CI/CD', group: 'Công cụ & vận hành', levels: [0, 1, 2, 2] },
  { slug: '16-docker', title: 'Docker (đóng gói ứng dụng)', group: 'Công cụ & vận hành', levels: [0, 1, 2, 2] },
];

export const ROLES: Role[] = [
  {
    slug: 'fe',
    title: 'Dev Front-end',
    available: true,
    vung: [
      { slug: 'entry', label: 'Entry', col: 0, note: '1 vùng duy nhất' },
      { slug: 'experienced-v1', label: 'Experienced · Vùng 1', col: 1 },
      { slug: 'experienced-v2', label: 'Experienced · Vùng 2', col: 2 },
      { slug: 'experienced-v3', label: 'Experienced · Vùng 3', col: 3 },
    ],
  },
  { slug: 'be', title: 'Dev Back-end', available: false, vung: [] },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}

export function getVung(role: Role, vungSlug: string): Vung | undefined {
  return role.vung.find((v) => v.slug === vungSlug);
}

export function getSkill(slug: string): Skill | undefined {
  return FE_SKILLS.find((s) => s.slug === slug);
}

// Kỹ năng cần đạt ở một vùng (cấp độ > 0 tại cột đó), giữ thứ tự nhóm.
export function skillsForVung(col: number): Skill[] {
  return FE_SKILLS.filter((s) => s.levels[col] > 0);
}

// Kỹ năng nhóm theo GROUP_ORDER (cho sidenav + trang tổng quan).
export function skillsByGroup(): { group: string; skills: Skill[] }[] {
  return GROUP_ORDER.map((group) => ({
    group,
    skills: FE_SKILLS.filter((s) => s.group === group),
  }));
}

// Kỹ năng liền trước / liền sau (cho nút điều hướng trước–sau).
export function adjacentSkills(slug: string): { prev: Skill | null; next: Skill | null } {
  const i = FE_SKILLS.findIndex((s) => s.slug === slug);
  return {
    prev: i > 0 ? FE_SKILLS[i - 1] : null,
    next: i >= 0 && i < FE_SKILLS.length - 1 ? FE_SKILLS[i + 1] : null,
  };
}
