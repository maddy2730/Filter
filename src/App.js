import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['All Genders', 'All Species', 'All Origins']);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/');
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };
  const handleRemoveFilter = (filter) => {
    if (filter === 'All Species') {
      setSpeciesFilter('');
    } else if (filter === 'All Genders') {
      setGenderFilter('');
    } else if (filter === 'All Origins') {
      setOriginFilter('');
    }
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };
  

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Filter characters based on search term and selected filters
    const filteredCharacters = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (speciesFilter === '' || character.species === speciesFilter) &&
      (genderFilter === '' || character.gender === genderFilter) &&
      (originFilter === '' || character.origin.name === originFilter)
    );
    return filteredCharacters;
  };

  const handleSort = () => {
    if (sortBy === '') {
      setSortBy('asc');
    } else if (sortBy === 'asc') {
      setSortBy('desc');
    } else {
      setSortBy('');
    }
  };

  const sortedCharacters = sortBy === 'asc'
    ? characters.sort((a, b) => a.id - b.id)
    : sortBy === 'desc'
      ? characters.sort((a, b) => b.id - a.id)
      : characters;

  const filteredCharacters = handleSearch();

  return (
    <div className="container mt-5">
      <div className=''>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <div className="header">
              <h3>Filters:</h3>
              <div className="filters">
                <div className="species-filter">
                  <ul>
                    <li onClick={() => { setSpeciesFilter(''); setSelectedFilters(selectedFilters.filter(f => f !== 'All Species')) }} className={speciesFilter === '' ? 'selected' : ''}>All Species</li>
                    <li onClick={() => { setSpeciesFilter('Human'); setSelectedFilters(prevFilters => [...prevFilters, 'Human']) }} className={speciesFilter === 'Human' ? 'selected' : ''}>Human</li>
                    <li onClick={() => { setSpeciesFilter('Alien'); setSelectedFilters(prevFilters => [...prevFilters, 'Alien']) }} className={speciesFilter === 'Alien' ? 'selected' : ''}>Alien</li>
                  </ul>
                </div>

                <div className="gender-filter">
                  <ul>
                    <li onClick={() => { setGenderFilter(''); setSelectedFilters(selectedFilters.filter(f => f !== 'All Genders')) }} className={genderFilter === '' ? 'selected' : ''}>All Genders</li>
                    <li onClick={() => { setGenderFilter('Male'); setSelectedFilters(prevFilters => [...prevFilters, 'Male']) }} className={genderFilter === 'Male' ? 'selected' : ''}>Male</li>
                    <li onClick={() => { setGenderFilter('Female'); setSelectedFilters(prevFilters => [...prevFilters, 'Female']) }} className={genderFilter === 'Female' ? 'selected' : ''}>Female</li>
                    <li onClick={() => { setGenderFilter('unknown'); setSelectedFilters(prevFilters => [...prevFilters, 'Unknown']) }} className={genderFilter === 'unknown' ? 'selected' : ''}>Unknown</li>
                  </ul>
                </div>

                <div className="origin-filter mt-4">
                  <ul>
                    <li onClick={() => { setOriginFilter(''); setSelectedFilters(selectedFilters.filter(f => f !== 'All Origins')) }} className={originFilter === '' ? 'selected' : ''}>All Origins</li>
                    <li onClick={() => { setOriginFilter('Earth (C-137)'); setSelectedFilters(prevFilters => [...prevFilters, 'Earth (C-137)']) }} className={originFilter === 'Earth (C-137)' ? 'selected' : ''}>Earth (C-137)</li>
                    <li onClick={() => { setOriginFilter('Earth (Replacement Dimension)'); setSelectedFilters(prevFilters => [...prevFilters, 'Earth (Replacement Dimension)']) }} className={originFilter === 'Earth (Replacement Dimension)' ? 'selected' : ''}>Earth (Replacement Dimension)</li>
                    <li onClick={() => { setOriginFilter('Abadango'); setSelectedFilters(prevFilters => [...prevFilters, 'Abadango']) }} className={originFilter === 'Abadango' ? 'selected' : ''}>Abadango</li>
                    <li onClick={() => { setOriginFilter('unknown'); setSelectedFilters(prevFilters => [...prevFilters, 'Unknown']) }} className={originFilter === 'unknown' ? 'selected' : ''}>Unknown</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-9 col-md-6 col-sm-12'>
            <div className='add_costume'>
              <div className='Main_heading_details mb-5'>
                <div className='Filter_heading'>
                  <h3>Selected Filters:</h3>
                </div>
                <div className='add_filters_details'>
                  {selectedFilters.map((filter, index) => (
                    <span key={index} className="selected-filter">
                      {filter}
                      <button className="btn-remove-filter" onClick={() => handleRemoveFilter(filter)}>X</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className='add_main_filter mb-3'>
                <div className='add_filter_search'>
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className='p-1'
                  />
                 
                  <button onClick={() => setCharacters(handleSearch())} type="button" class="btn btn-secondary mx-2 rounded-0">Search</button>
                </div>
                <div className="add_for_sort">
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      Sort by ID
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                      <li><button className="dropdown-item" onClick={() => setSortBy('asc')}>Ascending</button></li>
                      <li><button className="dropdown-item" onClick={() => setSortBy('desc')}>Descending</button></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="characters col-lg-12 col-md-12 col-sm-12">
                {filteredCharacters.map(character => (
                  <div key={character.id} className="character-card">
                    <img src={character.image} alt={character.name} />
                    <div className="character-info">
                      <div className='Characters_name'>
                        <h6>{character.name}</h6>
                        <div className='status_id'>
                          <p className='fs-6'>Id:{character.id}-created 2 years ago</p>
                        </div>
                      </div>
                      <div className='status'>
                        <div className='status_paragraph'>
                          <p className='fs-6'>Status:</p>
                        </div>
                        <div className='status_output'>
                          <p className=''>{character.status}</p>
                        </div>
                      </div>
                      <div className='status'>
                        <div className='status_paragraph'>
                          <p className='fs-6'>Species:</p>
                        </div>
                        <div className='status_output'>
                          <p className=''> {character.species}</p>
                        </div>
                      </div>
                      <div className='status'>
                        <div className='status_paragraph'>
                          <p className='fs-6'>Gender:</p>
                        </div>
                        <div className='status_output'>
                          <p className=''>{character.gender}</p>
                        </div>
                      </div>
                      <div className='status'>
                        <div className='status_paragraph'>
                          <p className='fs-6'>Origin: </p>
                        </div>
                        <div className='status_output'>
                          <p className=''>{character.origin.name}</p>
                        </div>
                      </div>
                      <div className='status'>
                        <div className='status_paragraph'>
                          <p className='fs-6'>Lastlocation:</p>
                        </div>
                        <div className='status_output'>
                          <p className=''>{character.location.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
