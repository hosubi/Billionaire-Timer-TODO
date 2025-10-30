import withPWA from "next-pwa";

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
});

const config = {
  experimental: {
    appDir: true
  }
};

export default pwa(config);
