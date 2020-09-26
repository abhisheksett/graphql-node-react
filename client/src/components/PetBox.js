import React from 'react'

const PetBox = ({pet, deletePet}) => (
  <div className="pet">
    <figure>
      <img src={pet.img + `?pet=${pet.id}`} alt=""/>
    </figure>
    <div className="pet-name">{pet.name}</div>
    <div className="pet-type">{pet.type}</div>
    <button className="pet-delete" onClick={() => deletePet(pet.id)}>Delete</button>
  </div>
)

export default PetBox
