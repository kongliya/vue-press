module.exports = {
    title: 'Kkkkkl',
    description: '心平气和',
    themeConfig: {
      nav: [
        { text: 'Vue', link: '/vue/' },
        { text: 'React', link: '/react/' },
        { text: 'JS', link: '/js/' },
        { text: 'CSS', link: '/css/' },
        { text: '其他', link: '/other/' },
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
      lineNumbers: true
    },
  }