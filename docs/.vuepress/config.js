module.exports = {
    title: '孔孔.',
    description: '孔孔\'s blog.',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    themeConfig: {
      // 背景图片;
      background: '/img/path',
      nav: [
        { text: 'Vue 3.0', link: '/vue/' },
        { text: 'Node.js', link: '/nodejs/' },
        { text: 'JS', link: '/js/' },
        { text: 'CSS', link: '/css/' },
        { text: 'Other', link: '/other/' },
        { text: 'Github', link: 'https://github.com/kongliya' },
      ],
      sidebar: {
        '/vue/': [
          '',
          'vite',
          'vue',
        ],
        '/nodejs/': [
          '',
        ],
        '/js/': [
          '',
          'dailySummary',
        ],
        '/css/': [
          ''
        ],
        '/other/': [
          '',
          'http',
          'vue',
          'webrtc',
          'linux',
          'angular',
          'flutter',
          'webpack',
        ]
      }
    },
    markdown: {
      lineNumbers: true    // 代码块显示行号;
    },
  }