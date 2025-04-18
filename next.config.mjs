/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'gz0xpnt8er8l9axc.public.blob.vercel-storage.com'
      }
    ]
  }
}

export default nextConfig
