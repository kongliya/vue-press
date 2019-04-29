module.exports = {
    title: 'One Person.',
    description: 'One Person.',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    themeConfig: {
      nav: [
        { text: 'Flutter', link: '/flutter/' },
        { text: 'Node.js', link: '/nodejs/' },
        { text: 'JS', link: '/js/' },
        { text: 'CSS', link: '/css/' },
        { text: '关于', link: '/about/' },
        { text: 'Github', link: 'https://github.com/kongliya' },
      ],
      sidebar: {
        '/vue/': [
          '',
          'about'
        ],
        '/react/': [
          '',
          'react'
        ],
        '/js/': [
          ''
        ],
        '/css/': [
          ''
        ],
        '/other/': [
          '',
          'prettier'
        ]
      }
    },
    markdown: {
      lineNumbers: true    // 代码块显示行号;
    },
  }