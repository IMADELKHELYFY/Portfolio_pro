/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Domaines de diffusion UploadThing (v7 : <APP_ID>.ufs.sh, héritage : utfs.io)
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io", pathname: "/f/**" },
      { protocol: "https", hostname: "**.ufs.sh", pathname: "/f/**" },
    ],
  },
};

export default nextConfig;
