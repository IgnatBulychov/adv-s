exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('networks').del()
    .then(function () {
      // Inserts seed entries
      return knex('networks').insert([        
       
        {
          id: 'test1',
          title: 'Telegram',
          poster: '/storage/networks/avatars/telegram.png'
        },
        {
          id: 'test2',
          title: 'Вконтакте',
          poster: '/storage/networks/avatars/vk.png'
        },
        {
          id: 'test3',
          title: 'Одноклассники',
          poster: '/storage/networks/avatars/ok.png'
        },
        {
          id: 'test4',
          title: 'Сайт',
          poster: '/storage/networks/avatars/site.png'
        },  
        {
          id: 'test5',
          title: 'E-mail рассылка',
          poster: '/storage/networks/avatars/email.png'
        },    
      ]);
    });
  };