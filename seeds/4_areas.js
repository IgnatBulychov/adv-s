const getId = require('../utilities/getId');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('areas').del()
    .then(function () {
      // Inserts seed entries
      return knex('areas').insert([        
        {
          id: 'test1',
          title: 'test1',
          description: '',
          poster: '/storage/tests/1.jpg',
          numberOfFollowers: 1200,
          cpc: 100,
          networkId: 'test1',
          userId: 'test1'
        },
        {
          id: 'test2',
          title: 'test2',
          description: '',
          poster: '/storage/tests/2.jpg',
          numberOfFollowers: 4200,
          cpc: 140,
          networkId: 'test2',
          userId: 'test2'
        }, 
        {
          id: 'test3',
          title: 'test3',
          description: '',
          poster: '/storage/tests/3.jpg',
          numberOfFollowers: 5200,
          cpc: 40,
          networkId: 'test3',
          userId: 'test2'
        },         
      ]);
    });
  };