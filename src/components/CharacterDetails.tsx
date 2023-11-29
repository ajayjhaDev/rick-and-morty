import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const CharacterDetails: React.FC<any> = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await api.get(`/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error("Error fetching character details", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      {/* Display other character details */}
    </div>
  );
};

export default CharacterDetails;
