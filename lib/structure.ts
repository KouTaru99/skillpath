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

// Tên level hiển thị đôi khi lệch theo role (vd Tester dùng "Junior" thay vì "Entry"
// theo đúng career-path gốc) — tra override trước, rơi về title mặc định của LEVELS.
const LEVEL_TITLE_OVERRIDE: Record<string, Partial<Record<LevelSlug, string>>> = {
  tester: { 'entry-experienced': 'Junior → Experienced' },
  // BA không có level Entry/Junior — career-path chỉ bắt đầu từ Experienced.
  ba: { 'entry-experienced': 'Experienced' },
};

export function getLevelTitle(roleSlug: string, slug: LevelSlug): string {
  return LEVEL_TITLE_OVERRIDE[roleSlug]?.[slug] ?? getLevel(slug)?.title ?? slug;
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
  tester: {
    'entry-experienced': [
      'Quy trình & tư duy nghiệp vụ',
      'Lõi Kiểm thử',
      'Kỹ thuật nâng cao Kiểm thử',
      'Công cụ & vận hành',
    ],
    senior: [
      'Quy trình & tư duy nghiệp vụ',
      'Lõi Kiểm thử',
      'Kỹ thuật nâng cao Kiểm thử',
      'Kiến trúc & thiết kế giải pháp',
      'ATTT & chuyên sâu',
      'Công cụ & vận hành',
      'Quản lý & lãnh đạo kỹ thuật',
    ],
    specialist: [
      'Quy trình & tư duy nghiệp vụ',
      'Lõi Kiểm thử',
      'Kỹ thuật nâng cao Kiểm thử',
      'Kiến trúc & thiết kế giải pháp',
      'ATTT & chuyên sâu',
      'Công cụ & vận hành',
      'Quản lý & lãnh đạo kỹ thuật',
      'Chiến lược & quản trị kiểm thử',
    ],
  },
  ba: {
    'entry-experienced': [
      'Phân tích & mô hình hoá nghiệp vụ',
      'Nghiệp vụ & khách hàng',
      'Quản lý yêu cầu & tài liệu',
      'Kỹ năng mềm & giao tiếp',
    ],
    senior: [
      'Phân tích & mô hình hoá nghiệp vụ',
      'Nghiệp vụ & khách hàng',
      'Trải nghiệm người dùng',
      'Kiến trúc & thiết kế giải pháp',
      'Quản lý yêu cầu & tài liệu',
      'Kỹ năng mềm & giao tiếp',
    ],
    specialist: [
      'Phân tích & mô hình hoá nghiệp vụ',
      'Nghiệp vụ & khách hàng',
      'Trải nghiệm người dùng',
      'Kiến trúc & thiết kế giải pháp',
      'Quản lý yêu cầu & tài liệu',
      'Kỹ năng mềm & giao tiếp',
      'Chiến lược & lãnh đạo chuyên môn BA',
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

// 14 kỹ năng nền Tester (Junior → Experienced) + kỹ năng thêm cho Senior/Specialist.
// Nguồn: JD thật Trung tâm Sản phẩm Telco (Data_JD) + tester-carrer-path.pdf (xem _planning/map-tester.md).
export const TESTER_SKILLS: Skill[] = [
  // --- 14 kỹ năng nền, vẫn required ở Senior/Specialist ---
  { slug: '01-quy-trinh-ptpm', title: 'Quy trình phát triển phần mềm (Agile/Scrum)', group: 'Quy trình & tư duy nghiệp vụ', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '02-doc-hieu-phan-tich-yeu-cau', title: 'Đọc hiểu, phân tích & phản biện yêu cầu nghiệp vụ', group: 'Quy trình & tư duy nghiệp vụ', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '03-khai-niem-nguyen-ly-kiem-thu', title: 'Khái niệm & nguyên lý kiểm thử', group: 'Lõi Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '04-cac-loai-kiem-thu', title: 'Các loại kiểm thử', group: 'Lõi Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '05-cac-muc-do-kiem-thu', title: 'Các mức độ kiểm thử', group: 'Lõi Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '06-ky-thuat-thiet-ke-kiem-thu', title: 'Kỹ thuật thiết kế kiểm thử', group: 'Lõi Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '07-xay-dung-tai-lieu-kiem-thu', title: 'Xây dựng tài liệu kiểm thử', group: 'Lõi Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '08-sql-co-so-du-lieu', title: 'SQL & cơ sở dữ liệu sản phẩm', group: 'Kỹ thuật nâng cao Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '09-giao-thuc-mang', title: 'Giao thức mạng (HTTP/HTTPS)', group: 'Kỹ thuật nâng cao Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '10-kiem-thu-api-tu-dong-hoa', title: 'Kiểm thử API & công cụ tự động hoá', group: 'Kỹ thuật nâng cao Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '11-uoc-luong-no-luc-rui-ro', title: 'Ước lượng nỗ lực & rủi ro kiểm thử', group: 'Kỹ thuật nâng cao Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '12-nghiep-vu-he-thong-san-pham', title: 'Nghiệp vụ hệ thống của sản phẩm', group: 'Kỹ thuật nâng cao Kiểm thử', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '13-cong-cu-quan-ly-loi', title: 'Công cụ quản lý lỗi & yêu cầu thay đổi', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '14-tin-hoc-van-phong', title: 'Tin học văn phòng', group: 'Công cụ & vận hành', appearsIn: ['entry-experienced', 'senior', 'specialist'] },

  // --- 8 kỹ năng mới xuất hiện từ Senior ---
  { slug: '15-ci-cd-co-ban', title: 'CI/CD cơ bản', group: 'Công cụ & vận hành', appearsIn: ['senior', 'specialist'] },
  { slug: '16-kien-thuc-attt', title: 'Kiến thức chuyên ngành ATTT', group: 'ATTT & chuyên sâu', appearsIn: ['senior', 'specialist'] },
  { slug: '17-am-hieu-san-pham-attt', title: 'Am hiểu dòng sản phẩm ATTT', group: 'ATTT & chuyên sâu', appearsIn: ['senior', 'specialist'] },
  { slug: '18-kiem-thu-chuyen-sau', title: 'Kiểm thử chuyên sâu theo mảng (hiệu năng/bảo mật/thiết bị)', group: 'ATTT & chuyên sâu', appearsIn: ['senior', 'specialist'] },
  { slug: '19-danh-gia-rui-ro-chat-luong', title: 'Phân tích, đánh giá & dự báo rủi ro chất lượng sản phẩm', group: 'ATTT & chuyên sâu', appearsIn: ['senior', 'specialist'] },
  { slug: '20-cai-tien-luong-nghiep-vu', title: 'Phân tích & đề xuất cải tiến luồng nghiệp vụ', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '21-huong-dan-review-kich-ban', title: 'Hướng dẫn & review kịch bản kiểm thử', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },
  { slug: '22-quan-ly-nhom-kiem-thu', title: 'Quản lý nhóm kiểm thử', group: 'Quản lý & lãnh đạo kỹ thuật', appearsIn: ['senior', 'specialist'] },

  // --- 7 kỹ năng mới xuất hiện từ Specialist ---
  { slug: '23-nghien-cuu-cong-nghe-kiem-thu-moi', title: 'Nghiên cứu công nghệ/kỹ thuật kiểm thử mới (R&D)', group: 'Chiến lược & quản trị kiểm thử', appearsIn: ['specialist'] },
  { slug: '24-xay-dung-chien-luoc-kiem-thu', title: 'Xây dựng chiến lược kiểm thử cho đơn vị', group: 'Chiến lược & quản trị kiểm thử', appearsIn: ['specialist'] },
  { slug: '25-tu-van-lua-chon-cong-nghe-kiem-thu', title: 'Tư vấn lựa chọn công nghệ/công cụ kiểm thử', group: 'Chiến lược & quản trị kiểm thử', appearsIn: ['specialist'] },
  { slug: '26-dao-tao-lan-toa-kien-thuc', title: 'Đào tạo, lan toả kiến thức chuyên sâu', group: 'Chiến lược & quản trị kiểm thử', appearsIn: ['specialist'] },
  { slug: '27-danh-gia-nang-luc-dinh-huong-phat-trien', title: 'Đánh giá năng lực, định hướng phát triển đội ngũ', group: 'Chiến lược & quản trị kiểm thử', appearsIn: ['specialist'] },
  { slug: '28-phan-bien-giai-phap-kien-truc', title: 'Phản biện giải pháp nghiệp vụ & kiến trúc hệ thống', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['specialist'] },
  { slug: '29-review-kien-truc-san-pham', title: 'Review kiến trúc sản phẩm, phát hiện rủi ro hệ thống', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['specialist'] },
];

// 11 kỹ năng nền BA (Experienced — KHÔNG có level Entry/Junior) + kỹ năng thêm Senior/Specialist.
// Nguồn: ba-carrer-path.pdf, đối chiếu Data_JD (3 đơn vị khác Telco, chỉ có Ex+Senior) — xem _planning/map-ba.md.
export const BA_SKILLS: Skill[] = [
  // --- 11 kỹ năng nền, vẫn required ở Senior/Specialist ---
  { slug: '01-ky-thuat-phan-tich-mo-hinh-hoa', title: 'Kỹ thuật phân tích nghiệp vụ & mô hình hoá (UML/Use case/BPMN)', group: 'Phân tích & mô hình hoá nghiệp vụ', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '02-xay-dung-tai-lieu-ptyc-giai-phap', title: 'Xây dựng tài liệu phân tích yêu cầu (PTYC) & giải pháp chi tiết', group: 'Phân tích & mô hình hoá nghiệp vụ', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '03-xay-dung-prototype', title: 'Xây dựng prototype sản phẩm/ứng dụng', group: 'Phân tích & mô hình hoá nghiệp vụ', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '04-nam-vung-nghiep-vu-san-pham', title: 'Nắm vững nghiệp vụ trong mảng sản phẩm liên quan', group: 'Nghiệp vụ & khách hàng', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '05-khao-sat-nhu-cau-chot-yeu-cau', title: 'Khảo sát nhu cầu & chốt thống nhất yêu cầu với khách hàng', group: 'Nghiệp vụ & khách hàng', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '06-giai-dap-trao-doi-nghiep-vu', title: 'Giải đáp, trao đổi thắc mắc nghiệp vụ với đội dự án', group: 'Nghiệp vụ & khách hàng', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '07-quan-ly-tai-lieu-yeu-cau-thay-doi', title: 'Cập nhật, quản lý & lưu trữ tài liệu/yêu cầu thay đổi theo quy trình', group: 'Quản lý yêu cầu & tài liệu', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '08-ho-tro-nghiem-thu', title: 'Hỗ trợ nghiệm thu sản phẩm/hệ thống với khách hàng', group: 'Quản lý yêu cầu & tài liệu', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '09-giao-tiep-dien-dat-thuyet-trinh', title: 'Giao tiếp, diễn đạt & thuyết trình', group: 'Kỹ năng mềm & giao tiếp', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '10-tu-duy-phan-bien', title: 'Tư duy phản biện', group: 'Kỹ năng mềm & giao tiếp', appearsIn: ['entry-experienced', 'senior', 'specialist'] },
  { slug: '11-dam-phan-to-chuc-cuoc-hop', title: 'Kỹ năng đàm phán & tổ chức cuộc họp', group: 'Kỹ năng mềm & giao tiếp', appearsIn: ['entry-experienced', 'senior', 'specialist'] },

  // --- 8 kỹ năng mới xuất hiện từ Senior ---
  { slug: '12-phan-tich-thi-truong-doi-thu', title: 'Phân tích sản phẩm/ứng dụng thị trường & đối thủ cạnh tranh', group: 'Nghiệp vụ & khách hàng', appearsIn: ['senior', 'specialist'] },
  { slug: '13-kien-thuc-ux', title: 'Kiến thức UX & định hướng UX sản phẩm', group: 'Trải nghiệm người dùng', appearsIn: ['senior', 'specialist'] },
  { slug: '14-de-xuat-cach-tiep-can-ky-thuat', title: 'Đề xuất cách tiếp cận & kỹ thuật phân tích phù hợp dự án', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '15-thiet-ke-dfd', title: 'Thiết kế luồng dữ liệu hệ thống (DFD)', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '16-review-tai-lieu-giai-phap', title: 'Review tài liệu giải pháp nghiệp vụ', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '17-cai-tien-luong-giai-phap-tu-van-khach-hang', title: 'Cải tiến luồng giải pháp nghiệp vụ, tư vấn khách hàng giải pháp tối ưu', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '18-xay-dung-tai-lieu-chi-tieu-ky-thuat', title: 'Xây dựng tài liệu chỉ tiêu kỹ thuật dự án/sản phẩm', group: 'Kiến trúc & thiết kế giải pháp', appearsIn: ['senior', 'specialist'] },
  { slug: '19-danh-gia-uu-tien-trinh-bay-quyet-dinh', title: 'Đánh giá ưu tiên yêu cầu & trình bày thông tin hỗ trợ ra quyết định', group: 'Kỹ năng mềm & giao tiếp', appearsIn: ['senior', 'specialist'] },

  // --- 8 kỹ năng mới xuất hiện từ Specialist ---
  { slug: '20-mind-mapping', title: 'Mô hình hoá bằng sơ đồ tư duy (Mind mapping)', group: 'Phân tích & mô hình hoá nghiệp vụ', appearsIn: ['specialist'] },
  { slug: '21-kien-thuc-chuyen-sau-linh-vuc', title: 'Kiến thức chuyên sâu nghiệp vụ theo lĩnh vực (tài chính/tài sản/nhân sự...)', group: 'Nghiệp vụ & khách hàng', appearsIn: ['specialist'] },
  { slug: '22-visual-design', title: 'Visual design của sản phẩm/ứng dụng', group: 'Trải nghiệm người dùng', appearsIn: ['specialist'] },
  { slug: '23-giai-phap-nghiep-vu-tong-the', title: 'Phân tích & xây dựng giải pháp nghiệp vụ tổng thể, toàn trình, liên thông hệ thống', group: 'Chiến lược & lãnh đạo chuyên môn BA', appearsIn: ['specialist'] },
  { slug: '24-tham-dinh-huong-dan-giai-phap', title: 'Thẩm định & hướng dẫn giải pháp cho thành viên trong nhóm', group: 'Chiến lược & lãnh đạo chuyên môn BA', appearsIn: ['specialist'] },
  { slug: '25-xay-dung-phuong-phap-danh-gia-hieu-qua', title: 'Xây dựng phương pháp đánh giá hiệu quả tính năng sản phẩm', group: 'Chiến lược & lãnh đạo chuyên môn BA', appearsIn: ['specialist'] },
  { slug: '26-dao-tao-quan-ly-nhom-ba', title: 'Đào tạo & quản lý nhóm chuyên môn BA', group: 'Chiến lược & lãnh đạo chuyên môn BA', appearsIn: ['specialist'] },
  { slug: '27-nang-luc-lanh-dao-anh-huong', title: 'Năng lực lãnh đạo & ảnh hưởng ở tầm tổ chức', group: 'Chiến lược & lãnh đạo chuyên môn BA', appearsIn: ['specialist'] },
];

export const SKILLS_BY_ROLE: Record<string, Skill[]> = {
  fe: FE_SKILLS,
  be: BE_SKILLS,
  tester: TESTER_SKILLS,
  ba: BA_SKILLS,
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
  { slug: 'tester', title: 'Kiểm thử (Tester)', available: true, hasTinhHuong: false, hasPhongVan: true },
  { slug: 'ba', title: 'Giải pháp nghiệp vụ (BA)', available: true, hasTinhHuong: false, hasPhongVan: true },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}

// Lab phỏng vấn theo DOMAIN nghiệp vụ — trục mở rộng mới (pilot: BA × Ngân hàng).
// Thêm domain/role mới = thêm 1 dòng ở đây + 1 file content/phong-van/<role>-<domain>.md.
export interface PhongVanDomain {
  slug: string;
  title: string;
  // Mô tả ngắn hiện ở sidenav + card giới thiệu trên trang Lab phỏng vấn chung.
  short: string;
}

export const PHONG_VAN_DOMAINS: Record<string, PhongVanDomain[]> = {
  ba: [
    {
      slug: 'ngan-hang',
      title: 'Nghiệp vụ Ngân hàng',
      short: 'Hành trình vay vốn trên hệ thống LOS — tiếp nhận → CIC → thẩm định → phê duyệt → giải ngân',
    },
  ],
};

export function phongVanDomains(roleSlug: string): PhongVanDomain[] {
  return PHONG_VAN_DOMAINS[roleSlug] ?? [];
}

export function getPhongVanDomain(roleSlug: string, domainSlug: string): PhongVanDomain | undefined {
  return phongVanDomains(roleSlug).find((d) => d.slug === domainSlug);
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
