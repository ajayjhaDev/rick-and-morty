import React from "react";
import { Link } from "react-router-dom";

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, image }) => (
  <div className="col">
    <Link to={`/characters/${id}`}>
      <img src={image} alt={name} />
      <p>{name}</p>
    </Link>
  </div>
);

export default CharacterCard;
