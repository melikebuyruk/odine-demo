import React, { useEffect, useState } from 'react';
import { fetchUser, searchByName, searchByJobCount, searchByCity, mockPhoto } from './../services/userService';
import { User } from '../types/User';
import FreelancerCard from '../components/FreelancerCard/FreelancerCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import SearchBar from '../components/SearchBar/SearchBar';
import { useColorMode } from '../Theme';
import { Button, Box, Switch } from '@mui/material';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [savedFreelancers, setSavedFreelancers] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('savedFreelancers') || '[]')
  );
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>('name');
  const [searchValue, setSearchValue] = useState<string>('');
  const [jobCountRange, setJobCountRange] = useState<number[]>([0, 20]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleColorMode } = useColorMode();
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    localStorage.getItem('themeMode') === 'dark' ? 'dark' : 'light'
  );
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSwitch = () => {
    toggleColorMode();
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchUser();
        const fetchedPhotos = await mockPhoto();
        setUsers(response);
        setFilteredUsers(response);
        setPhotos(fetchedPhotos);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleSearch = () => {
    let results = users;
    if (searchType === 'name') {
      results = searchByName(users, searchValue);
    } else if (searchType === 'city') {
      results = searchByCity(users, searchValue);
    } else if (searchType === 'jobCount') {
      const [min, max] = jobCountRange;
      results = searchByJobCount(users, min, max);
    }

    if (showSavedOnly) {
      results = results.filter((user) => savedFreelancers.includes(user.id));
    }

    setFilteredUsers(results);
  };

  const handleReset = () => {
    setFilteredUsers(users);
    setSearchValue('');
    setJobCountRange([0, 20]);
    setShowSavedOnly(false);
  };

  const handleSaveFreelancer = (id: number) => {
    const updatedSaved = savedFreelancers.includes(id)
      ? savedFreelancers.filter((freelancerId) => freelancerId !== id)
      : [...savedFreelancers, id];
    setSavedFreelancers(updatedSaved);
    localStorage.setItem('savedFreelancers', JSON.stringify(updatedSaved));
  };

  const toggleShowSavedOnly = () => {
    setShowSavedOnly((prev) => !prev);
  };

  useEffect(() => {
    handleSearch();
  }, [showSavedOnly]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <Switch
        checked={mode === 'dark'}
        onChange={handleSwitch}
        inputProps={{ 'aria-label': 'theme toggle' }}
      />
      Mode
      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <SearchBar
          searchType={searchType}
          setSearchType={setSearchType}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          jobCountRange={jobCountRange}
          setJobCountRange={setJobCountRange}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <Button
          variant="contained"
          onClick={toggleShowSavedOnly}
          sx={{ marginBottom: 2 }}
        >
          {showSavedOnly ? 'Show All Freelancers' : 'Show Saved Freelancers'}
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredUsers.map((user, index) => (
              <Grid key={user.id} size={{ xs: 2, sm: 4, md: 4 }}>
                <FreelancerCard
                  User={user}
                  onSave={() => handleSaveFreelancer(user.id)}
                  isSaved={savedFreelancers.includes(user.id)}
                  photo={photos[index % photos.length] || "https://via.placeholder.com/345x194"}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
