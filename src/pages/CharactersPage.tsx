import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import styled from "styled-components";

const CharacterCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`;

const CharacterCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  max-width: 200px;
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 4px;
  }

  p {
    margin-top: 8px;
    font-weight: bold;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;

  input {
    margin-top: 8px;
  }

  select {
    margin-top: 8px;
  }
`;

const CharactersPage: React.FC<any> = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get("/character");
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
      } catch (error) {
        console.error("Error fetching characters", error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, filter);
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
    applyFilters(searchTerm, selectedFilter);
  };

  const applyFilters = (search: string, selectedFilter: string) => {
    let filtered = characters.filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    );

    let filterValue;

    if (selectedFilter) {
      filtered = characters.filter((char) => {
        if (selectedFilter == "location") {
          filterValue = char[selectedFilter].name;
        } else {
          filterValue = char[selectedFilter];
        }

        console.log(filterValue, selectedFilter);
        return (
          filterValue &&
          typeof filterValue === "string" &&
          filterValue.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    setFilteredCharacters(filtered);
    console.log(filtered);
  };

  return (
    <div>
      <Header>
        <div>
          <input
            type="text"
            placeholder="Search by"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <select onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">Search Filter by</option>
            <option value="">Name</option>
            <option value="status">Status</option>
            <option value="location">Location</option>
            <option value="gender">Gender</option>
            <option value="species">Species</option>
            <option value="type">Type</option>
          </select>
        </div>
      </Header>

      <CharacterCardContainer>
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </Link>
          </CharacterCard>
        ))}
      </CharacterCardContainer>
    </div>
  );
};

export default CharactersPage;
