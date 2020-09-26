const nanoid = require('nanoid')

const createPetModel = db => {
  return {
    findMany(filter) {
      return db.get('pet')
        .filter(filter)
        .value()
    },

    findOne(filter) {
      return db.get('pet')
        .find(filter)
        .value()
    },

    create(pet) {
      const newPet = {id: nanoid(), createdAt: Date.now(), ...pet}
      
      db.get('pet')
        .push(newPet)
        .write()

      return newPet
    },

    deletePet(id) {
      const pets = db.get('pet').value();
      const filtered = pets.filter(pet => pet.id !== id);
      db.set('pet', filtered).write();
      return id;
    }
  }
}

module.exports = createPetModel
