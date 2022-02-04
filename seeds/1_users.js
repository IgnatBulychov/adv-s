const getId = require('../utilities/getId');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([ 
        {
          id: 'test1',
          email: 'a@a.ru',
          about: 'test1',
          firstName: 'test1',
          lastName: 'test1',
          avatar: '/storage/tests/1.jpg',
          isSeller: 1,
          isBuyer: 0,
          passwordHash: '$2a$10$MAYUb6ze8nFaNs6Pl.XFJuwGnHjYyK4dTI.nhHl/HE7eHC3XKwv9y',
        },
        {
          id: 'test2',
          email: 'test2',
          about: 'test2',
          firstName: 'test2',
          lastName: 'test2',
          avatar: '/storage/tests/2.jpg',
          isSeller: 1,
          isBuyer: 0,
          passwordHash: 1200,
        },
      ]);
    });
  };