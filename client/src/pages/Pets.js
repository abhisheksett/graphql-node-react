import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

// This is fragment
const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    id
    name
    type
    img
    vacinated @client
  }
`;

const ALL_PETS = gql`
  query AllPets {
    pets {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

const CREATE_PET = gql`
  mutation CreateAPet($input: NewPet!) {
    pet(input: $input) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

const DELETE_PET = gql`
  mutation deletePet($id: String!) {
    removePet(id: $id)
  }
`;

export default function Pets () {
  const [modal, setModal] = useState(false);
  const {data, loading, error} = useQuery(ALL_PETS);
  const [createPet, { data: d, loading: l, error: e }] = useMutation(CREATE_PET, {
    update( cache, { data: { pet } }) {
      const { pets } = cache.readQuery({ query: ALL_PETS });
      cache.writeQuery({
        query: ALL_PETS,
        data: {
          pets: [
            pet,
            ...pets
          ]
        }
      })
    }
  });

  const [deletePet, { data: dd, loading: dl, error: de }] = useMutation(DELETE_PET, {
    update( cache, { data }) {
      const id = data.removePet;
      const { pets } = cache.readQuery({ query: ALL_PETS });
      cache.writeQuery({
        query: ALL_PETS,
        data: {
          pets: pets.filter(pet => pet.id !== id)
        }
      })
    }
  });


  const onSubmit = input => {
    setModal(false)
    createPet({
      variables: {
        "input": {
          "name": input.name,
          "type": input.type,
        }
      }
    })
  };

  const onDelete = id => {
    deletePet({
      variables: {
        "id": id
      }
    })
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  if (loading || l) return <Loader />;
  if (error || e) return <p>ERROR</p>

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} deletePet={onDelete}/>
      </section>
    </div>
  )
}
