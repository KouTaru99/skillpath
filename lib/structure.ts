// Nguồn sự thật cấu trúc SkillPath: role → level → nhóm kỹ năng.
// Cấp độ thành thạo dùng trong nội dung (không phải để lọc UI): 1..4 = Nhập môn / Biết làm / Thành thạo / Chuyên sâu.

export const LEVEL_SYMBOL: Record<number, string> = { 1: '①', 2: '②', 3: '③', 4: '④' };
export const LEVEL_LABEL: Record<number, string> = {
  1: 'Nhập môn',
  2: 'Biết làm',
  3: 'Thành thạo',
  4: 'Chuyên sâu',
};

// Level nghề nghiệp (Entry/Experienced gộp 1 trang, rồi Senior, Specialist) — mỗi level có trang riêng.
export type LevelSlug = 'entry-experienced' | 'senior' | 'specialist';

export interface LevelInfo {
  slug: LevelSlug;
  title: string;
  blurb: string;
}

// Metadata hiển thị level — KHÔNG chứa "available" vì độ sẵn sàng khác nhau theo từng role
// (xem roleHasLevel). Ví dụ FE có đủ 10 vùng, BE mới có Entry→Experienced.
export const LEVELS: LevelInfo[] = [
  {
    slug: 'entry-experienced',
    title: 'Entry → Experienced',
    blurb: 'Kỹ năng nền tảng, từ mới vào nghề tới vững vàng.',
  },
  {
    slug: 'senior',
    title: 'Senior',
    blurb: 'Từ code giỏi sang tư vấn kiến trúc + dẫn dắt đội.',
  },
  {
    slug: 'specialist',
    title: 'Specialist',
    blurb: 'Từ chuyên gia kỹ thuật sang người ra quyết định công nghệ cấp đơn vị.',
  },
];

export function getLevel(slug: string): LevelInfo | undefined {
  return LEVELS.find((l) => l.slug === slug);
}

export interface Skill {
  slug: string;
  title: string;
  group: string;
  // Level nào hiển thị kỹ năng này trong checklist tổng quan + sidenav.
  // Kỹ năng carry-over (đã học từ level thấp) vẫn liệt kê ở level cao hơn vì career-path vẫn yêu cầu.
  appearsIn: LevelSlug[];
}

// Thứ tự nhóm kỹ năng theo từng role + level (hiển thị trong checklist + sidenav).
// Level rỗng ([]) = role đó CHƯA có nội dung ở level này (dùng để suy ra roleHasLevel).
export const GROUP_ORDER: Record<string, Record<LevelSlug, string[]>> = {
  fe: {
    'entry-experienced': [
      'Quy trình & tư duy hệ thống',
      'Lõi Front-end',
      'Kỹ thuật nâng cao FE',
      'Nền tảng CS & dữ liệu',
      'Công cụ & vận hành',
    ],
    senior: [
      'Quy trình & tư duy hệ thống',
      'Lõi Front-end',
      'Kỹ thuật nâng cao FE',
      'Kiến trúc & thiết kế giải pháp',
      'Nền tảng CS & dữ liệu',
      'Công cụ & vận hành',
      'Quản lý & lãnh đạo kỹ thuật',
    ],
    specialist: [
      'Quy trình & tư duy hệ thống',
      'Lõi Front-end',
      'Kỹ thuật nâng cao FE',
      'Kiến trúc & thiết kế giải pháp',
      'Nền tảng CS & dữ liệu',
      'Công cụ & vận hành',
      'Quản lý & lãnh đạo kỹ thuật',
      'Chiến lược & quản trị công nghệ',
    ],
  },
  be: {
    'entry-experienced': [
      'Quy trình & tư duy hệ thống',
      'Lõi Back-end',
      'Kỹ thuật nâng cao BE',
      'Nền tảng mạng & hệ thống',
      'Công cụ & vận hành',
    ],
    senior: [
      'Quy trình & tư duy hệ thống',
      'Lõi Back-end',
      'Kỹ thuật nâng cao BE',
      'Kiến trúc & thiết kế giải pháp',
      'Nền tảng mạng & hệ thống',
      'Công cụ & vận hành',
      'Quản lý & lãnh đạo kỹ thuật',
    ],
    specialist: [
      'Quy trình & tư duy hệ thống',
      'Lõi Back-end',
      'Kỹ thuật nâng cao BE',
      'Kiến trúc & thiết kế giải pháp',
      'Nền tảng mạng & hệ thống',
      'Công cụ & vận hành',
      'Quản lý & lãnh đạo kỹ thuật',
      'Chiến lược & quản trị công nghệ',
    ],
  },
};

// Role nào đã có nội dung ở level nào — dùng cho LevelSwitcher + sidenav + generateStaticParams.
export function roleHasLevel(roleSlug: string, level: LevelSlug): boolean {
  return (GROUP_ORDER[roleSlug]?.[level]?.length ?? 0) > 0;
}

// 16 kỹ năng Dev FE nền (Entry → Experienced) + kỹ năng thêm cho Senior/Specialist.
export const FE_SKILLS: Skill[] = [
  // --- 16 kỹ năng nền, vẫn required ở Senior (career-path Senior = "Như level Experienced và...") ---
  { slug: '01-quy-trinh-ptpm', title: 'Quy trình phát triển phần mềm (Agile/Scrum)', group: 'Quy trình & tư duy hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '02-doc-hieu-tai-lieu-giai-phap', title: 'Đọc hiểu & soi lỗi tài liệu giải pháp', group: 'Quy trình & tư duy hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '03-lap-trinh-an-toan', title: 'Lập trình an toàn (secure coding)', group: 'Quy trình & tư duy hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '04-html-css-js', title: 'HTML / CSS / JavaScript', group: 'Lõi Front-end', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '05-framework-fe', title: 'Framework FE (Angular)', group: 'Lõi Front-end', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '06-ux-ui-co-ban', title: 'UX/UI cơ bản', group: 'Lõi Front-end', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '07-restful-api', title: 'RESTful API (tích hợp BE)', group: 'Lõi Front-end', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '08-component-dung-chung', title: 'Component dùng chung (đóng gói, tái sử dụng)', group: 'Kỹ thuật nâng cao FE', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '09-unit-test', title: 'Unit test', group: 'Kỹ thuật nâng cao FE', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '10-microfrontends', title: 'Microfrontends', group: 'Kỹ thuật nâng cao FE', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '11-oop-dp-algo-ds', title: 'OOP / Design Pattern / Algorithm / Data Structure', group: 'Nền tảng CS & dữ liệu', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '12-csdl-co-ban', title: 'CSDL cơ bản + web server / microservices', group: 'Nền tảng CS & dữ liệu', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '13-ide-coding-convention', title: 'IDE & coding convention', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '14-phan-tich-log-debug', title: 'Phân tích log / debug', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '15-ci-cd', title: 'CI/CD', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '16-docker', title: 'Docker (đóng gói ứng dụng)', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },

  // --- 15 kỹ năng mới xuất hiện từ Senior ---
  { slug: '17-state-management-lib', title: 'Thư viện quản lý State (Redux/NgRx/NgXS/Akita)', group: 'Kỹ thuật nâng cao FE', appearsIn: ['senior', 'specialist'] },
  { slug: '18-phan-tich-thiet-ke-he-thong', title: 'Phân tích & thiết kế hệ thống', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '19-uml-er', title: 'Công cụ thiết kế UML / ER Diagram', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '20-tu-van-phan-bien', title: 'Tư vấn & phản biện giải pháp PTPM', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '21-database-design-tuning', title: 'Database design & query, query tuning', group: 'Nền tảng CS & dữ liệu', appearsIn: ['senior', 'specialist'] },
  { slug: '22-capacity-sizing', title: 'Định cỡ hiệu năng hệ thống (capacity sizing)', group: 'Nền tảng CS & dữ liệu', appearsIn: ['senior', 'specialist'] },
  { slug: '23-sockets-rmi', title: 'Lập trình giao tiếp mạng (Sockets, RMI)', group: 'Nền tảng CS & dữ liệu', appearsIn: ['senior', 'specialist'] },
  { slug: '24-fullstack', title: 'Lập trình fullstack', group: 'Nền tảng CS & dữ liệu', appearsIn: ['senior', 'specialist'] },
  { slug: '25-da-nen-tang-hdh', title: 'Triển khai đa nền tảng hệ điều hành', group: 'Công cụ & vận hành', appearsIn: ['senior', 'specialist'] },
  { slug: '26-state-session-sync', title: 'State/session synchronization', group: 'Công cụ & vận hành', appearsIn: ['senior', 'specialist'] },
  { slug: '27-phan-task', title: 'Phân task cho thành viên dự án', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '28-review-code', title: 'Review code (cho người khác)', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '29-mentor', title: 'Hướng dẫn, đào tạo Dev FE cấp thấp hơn (mentor)', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '30-seminar', title: 'Tổ chức seminar / chia sẻ công nghệ', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '31-phong-van-tuyen-dung', title: 'Tham gia phỏng vấn tuyển dụng', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },

  // --- 8 kỹ năng mới xuất hiện từ Specialist ---
  { slug: '32-design-pattern-nang-cao', title: 'Design pattern kiến trúc nâng cao (GoF/EIP)', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['specialist'] },
  { slug: '33-giam-sat-hieu-nang-apm', title: 'Giám sát & chẩn đoán hiệu năng hệ thống (APM)', group: 'Nền tảng CS & dữ liệu', appearsIn: ['specialist'] },
  { slug: '34-quy-trinh-dao-tao-danh-gia', title: 'Xây quy trình đào tạo & đánh giá đội ngũ', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['specialist'] },
  { slug: '35-nghien-cuu-cong-nghe-moi', title: 'Nghiên cứu & phát triển công nghệ mới (R&D)', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '36-quan-ly-du-an', title: 'Quản lý dự án', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '37-tech-stack-ownership', title: 'Sở hữu Technology Stack của đơn vị', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '38-xay-dung-framework', title: 'Xây dựng framework/nền tảng dùng chung', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '39-dam-bao-nfr', title: 'Đảm bảo yêu cầu phi chức năng hệ thống (NFR)', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
];

// 16 kỹ năng Dev BE nền (Entry → Experienced). Ngôn ngữ minh hoạ: Java/Spring Boot (PO chốt).
export const BE_SKILLS: Skill[] = [
  { slug: '01-quy-trinh-ptpm', title: 'Quy trình phát triển phần mềm (Agile/Scrum)', group: 'Quy trình & tư duy hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '02-doc-hieu-tai-lieu-giai-phap', title: 'Đọc hiểu & soi lỗi tài liệu giải pháp', group: 'Quy trình & tư duy hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '03-lap-trinh-an-toan', title: 'Lập trình an toàn (secure coding)', group: 'Quy trình & tư duy hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '04-java', title: 'Java (ngôn ngữ lập trình)', group: 'Lõi Back-end', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '05-oop-dp-algo-ds', title: 'OOP / Design Pattern / Algorithm / Data Structure', group: 'Lõi Back-end', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '06-csdl', title: 'Cơ sở dữ liệu (SQL & NoSQL) — thiết kế & tối ưu', group: 'Lõi Back-end', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '07-da-luong-concurrency', title: 'Lập trình đa luồng (multithreading/concurrency)', group: 'Kỹ thuật nâng cao BE', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '08-unit-test', title: 'Unit test', group: 'Kỹ thuật nâng cao BE', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '09-he-dieu-hanh-io', title: 'Hệ điều hành & I/O', group: 'Kỹ thuật nâng cao BE', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '10-mang-may-tinh', title: 'Mạng máy tính (giao thức, mã hoá, đa kết nối)', group: 'Nền tảng mạng & hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '11-web-server-microservices', title: 'Web server / Microservices cơ bản', group: 'Nền tảng mạng & hệ thống', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '12-git-svn', title: 'Git/SVN', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '13-ide-debug', title: 'IDE & debug code', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '14-phan-tich-log-debug', title: 'Phân tích log / debug', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '15-docker', title: 'Docker (đóng gói ứng dụng)', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '16-ci-cd', title: 'CI/CD', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },

  // --- 12 kỹ năng mới xuất hiện từ Senior (tái dùng khuôn Senior FE, đổi ví dụ sang Java/Spring) ---
  { slug: '17-phan-tich-thiet-ke-he-thong', title: 'Phân tích & thiết kế hệ thống', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '18-uml-er', title: 'Công cụ thiết kế UML / ER Diagram', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '19-tu-van-phan-bien', title: 'Tư vấn & phản biện giải pháp PTPM', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '20-capacity-sizing', title: 'Định cỡ hiệu năng hệ thống (capacity sizing)', group: 'Kỹ thuật nâng cao BE', appearsIn: ['senior', 'specialist'] },
  { slug: '21-da-nen-tang-hdh', title: 'Triển khai đa nền tảng hệ điều hành', group: 'Công cụ & vận hành', appearsIn: ['senior', 'specialist'] },
  { slug: '22-remote-debug', title: 'Remote debug', group: 'Nền tảng mạng & hệ thống', appearsIn: ['senior', 'specialist'] },
  { slug: '23-container-orchestration-cloud', title: 'Container Orchestration & Cloud Native', group: 'Nền tảng mạng & hệ thống', appearsIn: ['senior', 'specialist'] },
  { slug: '24-phan-task', title: 'Phân task cho thành viên dự án', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '25-review-code', title: 'Review code (cho người khác)', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '26-mentor', title: 'Hướng dẫn, đào tạo Dev BE cấp thấp hơn (mentor)', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '27-seminar', title: 'Tổ chức seminar / chia sẻ công nghệ', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '28-phong-van-tuyen-dung', title: 'Tham gia phỏng vấn tuyển dụng', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },

  // --- 8 kỹ năng mới xuất hiện từ Specialist (tái dùng khuôn Specialist FE) ---
  { slug: '29-design-pattern-nang-cao', title: 'Design pattern kiến trúc nâng cao (GoF/EIP)', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['specialist'] },
  { slug: '30-giam-sat-hieu-nang-apm', title: 'Giám sát & chẩn đoán hiệu năng hệ thống (APM)', group: 'Kỹ thuật nâng cao BE', appearsIn: ['specialist'] },
  { slug: '31-quy-trinh-dao-tao-danh-gia', title: 'Xây quy trình đào tạo & đánh giá đội ngũ', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['specialist'] },
  { slug: '32-nghien-cuu-cong-nghe-moi', title: 'Nghiên cứu & phát triển công nghệ mới (R&D)', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '33-quan-ly-du-an', title: 'Quản lý dự án', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '34-tech-stack-ownership', title: 'Sở hữu Technology Stack của đơn vị', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '35-xay-dung-framework', title: 'Xây dựng framework/nền tảng dùng chung', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
  { slug: '36-dam-bao-nfr', title: 'Đảm bảo yêu cầu phi chức năng hệ thống (NFR)', group: 'Chiến lược & quản trị công nghệ', appearsIn: ['specialist'] },
];

export const SKILLS_BY_ROLE: Record<string, Skill[]> = {
  fe: FE_SKILLS,
  be: BE_SKILLS,
};

export interface Role {
  slug: string;
  title: string;
  available: boolean;
  // Có trang "Tình huống thực chiến" chưa — chưa viết cho role mới thì ẩn link, tránh 404.
  hasTinhHuong: boolean;
  // Có trang "Lab phỏng vấn" chưa — chưa viết cho role mới thì ẩn link, tránh 404.
  hasPhongVan: boolean;
}

export const ROLES: Role[] = [
  { slug: 'fe', title: 'Dev Front-end', available: true, hasTinhHuong: true, hasPhongVan: true },
  { slug: 'be', title: 'Dev Back-end', available: true, hasTinhHuong: false, hasPhongVan: true },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}

export function getSkill(roleSlug: string, slug: string): Skill | undefined {
  return SKILLS_BY_ROLE[roleSlug]?.find((s) => s.slug === slug);
}

// Kỹ năng nhóm theo GROUP_ORDER của một role + level (cho sidenav + trang tổng quan).
export function skillsByGroup(roleSlug: string, level: LevelSlug): { group: string; skills: Skill[] }[] {
  const skills = SKILLS_BY_ROLE[roleSlug] ?? [];
  return (GROUP_ORDER[roleSlug]?.[level] ?? []).map((group) => ({
    group,
    skills: skills.filter((s) => s.group === group && s.appearsIn.includes(level)),
  }));
}

// Kỹ năng liền trước / liền sau theo thứ tự khai báo (cho nút điều hướng trước–sau).
export function adjacentSkills(roleSlug: string, slug: string): { prev: Skill | null; next: Skill | null } {
  const skills = SKILLS_BY_ROLE[roleSlug] ?? [];
  const i = skills.findIndex((s) => s.slug === slug);
  return {
    prev: i > 0 ? skills[i - 1] : null,
    next: i >= 0 && i < skills.length - 1 ? skills[i + 1] : null,
  };
}
