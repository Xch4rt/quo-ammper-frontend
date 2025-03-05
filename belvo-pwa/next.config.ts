import type { NextConfig } from "next";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // @ts-expect-error - Import assignment for next-pwa
})(nextConfig);