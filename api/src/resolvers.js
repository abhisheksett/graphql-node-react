/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets( _, {input}, ctx) {
      return ctx.models.Pet.findMany(input)
    },

    pet(_, {input}, ctx) {
      return ctx.models.Pet.findOne(input)
    }
  },
  Pet: {
    owner(pet, _, {models}) {
      return models.User.findOne({id: pet.user})
    },
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    }
  },
  Mutation: {
    pet( _, { input }, ctx ) {
      return ctx.models.Pet.create(input)
    },
    removePet( _, { id }, ctx ) {
      ctx.models.Pet.deletePet(id);
      return id
    }
  },
  User: {
    pets(user, _, ctx) {
      return ctx.models.Pet.findMany({})
    }
  }
}
