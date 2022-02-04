exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('networks').del()
    .then(function () {
      // Inserts seed entries
      return knex('networks').insert([        
        {
          id: 'test1',
          title: 'Instagram',
          poster: '/storage/networks/avatars/instagram.png'
        },
        {
          id: 'test2',
          title: 'Youtube',
          poster: '/storage/networks/avatars/youtube.png'
        },
        {
          id: 'test3',
          title: 'Telegram',
          poster: '/storage/networks/avatars/telegram.png'
        },
        {
          id: 'test4',
          title: 'WhatsApp',
          poster: '/storage/networks/avatars/whatsapp.png'
        },
        {
          id: 'test5',
          title: 'Вконтакте',
          poster: '/storage/networks/avatars/vk.png'
        },
        {
          id: 'test6',
          title: 'Одноклассники',
          poster: '/storage/networks/avatars/ok.png'
        },
        {
          id: 'test7',
          title: 'Tik-Tok',
          poster: '/storage/networks/avatars/tiktok.png'
        },
        {
          id: 'test8',
          title: 'Medium',
          poster: '/storage/networks/avatars/medium.png'
        },
        {
          id: 'test9',
          title: 'Pinterest',
          poster: '/storage/networks/avatars/pinterest.png'
        },
        {
          id: 'test10',
          title: 'E-mail рассылка',
          poster: '/storage/networks/avatars/email.png'
        },    
      ]);
    });
  };