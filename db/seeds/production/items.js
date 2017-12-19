exports.seed = function(knex, Promise) {
  return knex('garage_things').del()
    .then(() => {
      return Promise.all([
        knex('garage_things').insert([
          {
            'itemName': 'shays bicycle',
            'itemReason': 'who knows',
            'itemCleanliness': 'dusty'
          },
          {
            'itemName': 'jms tool box',
            'itemReason': 'doin work',
            'itemCleanliness': 'sparkling'
          },
          {
            'itemName': 'shelf full of chems',
            'itemReason': 'chem stuff',
            'itemCleanliness': 'rancid'
          },
          {
            'itemName': 'air compressor',
            'itemReason': 'to compress air',
            'itemCleanliness': 'dusty'
          }
        ])
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
