const getId = require('../utilities/getId');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('networks').del()
    .then(function () {
      // Inserts seed entries
      return knex('networks').insert([        
        {
          id: getId(),
          title: 'Instagram',
          poster: '/storage/networks/avatars/instagram.png'
        },
        {
          id: getId(),
          title: 'Youtube',
          poster: '/storage/networks/avatars/youtube.png'
        },
        {
          id: getId(),
          title: 'Telegram',
          poster: '/storage/networks/avatars/telegram.png'
        },
        {
          id: getId(),
          title: 'WhatsApp',
          poster: '/storage/networks/avatars/whatsapp.png'
        },
        {
          id: getId(),
          title: 'Вконтакте',
          poster: '/storage/networks/avatars/vk.png'
        },
        {
          id: getId(),
          title: 'Одноклассники',
          poster: '/storage/networks/avatars/ok.png'
        },
        {
          id: getId(),
          title: 'Tik-Tok',
          poster: '/storage/networks/avatars/tiktok.png'
        },
        {
          id: getId(),
          title: 'Medium',
          poster: '/storage/networks/avatars/medium.png'
        },
        {
          id: getId(),
          title: 'Pinterest',
          poster: '/storage/networks/avatars/pinterest.png'
        },
        {
          id: getId(),
          title: 'Сайт с подписчиками',
          poster: '/storage/networks/avatars/email.png'
        },    
      ]);
    });
  };