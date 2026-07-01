const isProd = process.env.NODE_ENV === 'production';

// SkillPath = nội dung tĩnh chỉ đọc → static export lên GitHub Pages ($0).
// basePath chỉ bật khi build production để `npm run dev` vẫn chạy ở localhost:3000/ (root).
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/skillpath' : '',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
