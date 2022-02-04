const getId = require('../utilities/getId');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([        
        {
          id: 'test1',
          title: 'Красота и здоровье',
        },
        {
          id: 'test2',
          title: 'Строительство и ремонт',
        },
        {
          id: 'test3',
          title: 'Психология и отношения',
        },
        {
          id: 'test4',
          title: 'Развлечения, Кино, Музыка',
        },
        {
          id: 'test5',
          title: 'Образование',
        },
        {
          id: 'test6',
          title: 'Еда и кулинария',
        },
        {
          id: 'test7',
          title: 'Новости',
        },
        {
          id: 'test8',
          title: 'Исскуство и дизайн',
        },
        {
          id: 'test9',
          title: 'Бизнес и работа',
        },  
        {
          id: 'test10',
          title: 'Мода',
        },  
        {
          id: 'test11',
          title: 'Другое',
        },    
      ]);
    });
  };