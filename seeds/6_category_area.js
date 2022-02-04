const getId = require('../utilities/getId');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('category_area').del()
    .then(function () {
      // Inserts seed entries
      return knex('category_area').insert([        
        {
          id: 'test1',
          categoryId: 'test1',
          areaId: 'test1'
        },
        {
          id: 'test2',
          categoryId: 'test2',
          areaId: 'test1'
        },
        {
          id: 'test3',
          categoryId: 'test3',
          areaId: 'test1'
        },
        {
          id: 'test4',
          categoryId: 'test1',
          areaId: 'test2'
        },
        {
          id: 'test5',
          categoryId: 'test2',
          areaId: 'test2'
        },
      ]);
    });
  };