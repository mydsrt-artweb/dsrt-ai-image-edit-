/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // boleh ambil image dari mana saja
      },
    ],
  },
}

export default nextConfig
