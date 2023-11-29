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
    margin-right: 30px;
  }

  select {
    margin-top: 8px;
  }
`;

const CharactersPage: React.FC<any> = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterP, setFilterP] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filterVal, setFilterVal] = useState<any[]>([]);

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
    setFilteredCharacters(
      filteredCharacters.filter((ele) => ele.name.toLowerCase().includes(term))
    );

    if (term.length <= 1) {
      setFilteredCharacters(characters);
    }
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilterP(selectedFilter);

    setFilteredCharacters(characters);

    if (selectedFilter) {
      setFilterVal(
        characters.map((ele) => {
          if (selectedFilter == "location") return ele[selectedFilter].name;
          return ele[selectedFilter];
        })
      );
    }
  };

  useEffect(() => {
    if (filter == "") {
      return setFilteredCharacters(characters);
    } else {
      applyFilters(filter, filterP);
    }
  }, [filter]);

  const applyFilters = (search: string, selectedFilter: string) => {
    let filtered = [];

    let filterValue;

    if (search == "") {
      return setFilteredCharacters(characters);
    }

    if (selectedFilter) {
      filtered = characters.filter((char) => {
        if (selectedFilter == "location") {
          filterValue = char[selectedFilter].name;
        } else {
          filterValue = char[selectedFilter];
        }

        return (
          filterValue &&
          typeof filterValue === "string" &&
          filterValue.toLowerCase() == search.toLowerCase()
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
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <select onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">Search Filter by</option>
            <option value="status">Status</option>
            <option value="location">Location</option>
            <option value="gender">Gender</option>
            <option value="species">Species</option>
            <option value="type">Type</option>
          </select>

          {filterVal.length > 1 && filterP != "" && (
            <select onClick={(e: any) => setFilter(e.target.value)}>
              <option value="">Select</option>
              {[...new Set(filterVal)]?.map((ele: string) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          )}
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
