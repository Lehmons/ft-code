/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true | {
      // Enabled by default.
      cssProp: true
    },
  },
  env: {
    loadingThreshold: 20,
    thumbSize: 350,
    desktopSize: 2000,
    loadingThreshold: 3,
  }
}

module.exports = nextConfig
