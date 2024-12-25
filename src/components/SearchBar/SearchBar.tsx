import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const searchOptions = [
  { value: 'name', label: 'Name' },
  { value: 'city', label: 'City' },
  { value: 'jobCount', label: 'Job Count' },
];

interface SearchBarProps {
  searchType: string;
  setSearchType: (type: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  jobCountRange: number[];
  setJobCountRange: (range: number[]) => void;
  onSearch: () => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchType,
  setSearchType,
  searchValue,
  setSearchValue,
  jobCountRange,
  setJobCountRange,
  onSearch,
  onReset,
}) => {
  const handleJobCountChange = (event: Event, newValue: number | number[]) => {
    setJobCountRange(newValue as number[]);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        select
        label="Search By"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        sx={{ marginRight: 2, width: '150px' }}
      >
        {searchOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {searchType === 'jobCount' ? (
        <Box sx={{ width: 300, marginRight: 2, display: 'inline-block' }}>
          <Slider
            value={jobCountRange}
            onChange={handleJobCountChange}
            valueLabelDisplay="auto"
            min={0}
            max={30}
          />
        </Box>
      ) : (
        <TextField
          label="Search Value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{ marginRight: 2, width: '300px' }}
        />
      )}
      <Button variant="contained" onClick={onSearch} sx={{ marginRight: 2 }}>
        Search
      </Button>
      <Button variant="outlined" onClick={onReset}>
        Reset
      </Button>
    </Box>
  );
};

export default SearchBar;
