import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const CharacterProfilePage: React.FC<any> = () => {
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
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Status: {character.status}</p>
      {/* Add other details as needed */}
      <h3>Origin:</h3>
      <p>Name: {character.origin.name}</p>
      <p>Dimension: {character.origin.dimension}</p>
      {/* Add more origin details as needed */}
      <h3>Location:</h3>
      <p>Name: {character.location.name}</p>
      <p>Dimension: {character.location.dimension}</p>
      {/* Add more location details as needed */}
      <h3>Episodes:</h3>
      <ul>
        {character.episode.map((episode: string) => (
          <li key={episode}>{episode}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterProfilePage;
