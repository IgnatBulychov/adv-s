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
          poster: 'instagram'
        },
        {
          id: getId(),
          title: 'Youtube',
          poster: 'youtube'
        },
        {
          id: getId(),
          title: 'Telegram',
          poster: 'telegram'
        },
        {
          id: getId(),
          title: 'WhatsApp',
          poster: 'whatsapp'
        },
        {
          id: getId(),
          title: 'Вконтакте',
          poster: 'vk'
        },
        {
          id: getId(),
          title: 'Tik-Tok',
          poster: 'tiktok'
        },
        {
          id: getId(),
          title: 'Pinterest',
          poster: 'pinterest'
        },
        {
          id: getId(),
          title: 'Email рассылка',
          poster: 'email'
        },    
      ]);
    });
  };