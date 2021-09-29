/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites() {
    return [
      {
        source: '/search/:target*',
        destination: `http://j5b103.p.ssafy.io:8080/api/word/search?word=:target*`
      }
    ]
  }

};
