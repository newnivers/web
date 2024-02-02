/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withInterceptStdout = require("next-intercept-stdout");

const nextConfig = {
  images: {
    domains: ["newniverse.s3.ap-northeast-2.amazonaws.com"],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = module.exports = withBundleAnalyzer(
  withInterceptStdout(nextConfig, (text) =>
    text.includes("Duplicate atom key") ? "" : text
  )
);
