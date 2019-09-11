module.exports = {
    title: 'One Person.',
    description: 'One Person.',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    themeConfig: {
      // 背景图片;
      background: '/img/path',
      nav: [
        { text: 'Flutter', link: '/flutter/' },
        { text: 'Node.js', link: '/nodejs/' },
        { text: 'JS', link: '/js/' },
        { text: 'CSS', link: '/css/' },
        { text: 'Other', link: '/other/' },
        { text: 'Github', link: 'https://github.com/kongliya' },
      ],
      sidebar: {
        '/flutter/': [
          '',
          'flutter'
        ],
        '/nodejs/': [
          '',
        ],
        '/js/': [
          ''
        ],
        '/css/': [
          ''
        ],
        '/other/': [
          '',
          'http',
          'vue',
          'webrtc',
        ]
      }
    },
    markdown: {
      lineNumbers: true    // 代码块显示行号;
    },
  }