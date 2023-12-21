import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const getCharacterCoordinates = async (documentName) => {
  const coordinateCollectionRef = collection(db, 'character-coordinates');

  try {
    const querySnapshot = await getDocs(coordinateCollectionRef);
    let pokemonCoordinates = {};

    querySnapshot.forEach((doc) => {
      if (doc.id === documentName) {
        pokemonCoordinates = {
          ...doc.data(),
          id: doc.id,
        };
      }
    });
    return pokemonCoordinates;
  } catch (error) {
    console.error('Error fetching Pokemon coordinates:', error);
    return null;
  }
};

export default getCharacterCoordinates;
