import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import DrawerForFilter from "./DrawerForFilter";
import DoYouMean from "./DoYouMean";
import ListProperty from "./ListProperty";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterByWebsite from "./FilterByWebsite";
import Pagination from "./Pagination";
import TrendingHouses from "./TrendingHouses";
import TrendingSearches from "./TrendingSearches";

const defaultTheme = createTheme();
const itemsPerPage = 12; // Number of items to display per page
const pagesToShow = 3; // Number of pagination buttons to show on each side of the current page

export default function FinalDashboard() {
  const { city } = useParams();

  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [listSuggestions, setListSuggestions] = useState([]);

  const [listOfRentals, setListOfRentals] = useState([]);

  const [trendingHouses, setTrendingHouses] = React.useState([]);

  const [trendingSearches, setTrendingSearches] = React.useState([]);

  const [autoCompleteRecommend, setAutoCompleteRecommend] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchFrequency, setSearchFrequency] = React.useState({});

  const [loading, setLoading] = useState(false);
  const loadingAPI = openSuggestion && listSuggestions.length === 0;

  const [currentPage, setCurrentPage] = useState(1);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [category, setCategory] = React.useState(["individual_house"]);
  const [bed, setBed] = React.useState("");
  const [bath, setBath] = React.useState("");
  const [sortOption, setSortOption] = React.useState("random");

  const totalItems = listOfRentals.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    console.log("calling trending ");
    fetchTrendingSearches();
    fetchTrendingHouses();
  }, []);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleBedChange = (value) => {
    setBed(value);
  };
  const handleBathChange = (value) => {
    setBath(value);
  };
  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };
  const handleClearFilters = () => {
    setCategory([]);
    setBed("");
    setBath("");
    setSortOption("");
  };

  const handleSearch = async () => {
    if (searchValue) {
      setLoading(true);
      try {
        incrementSearchCount(searchValue);
        const response = await fetch(
          `http://aitalk.in:8080/api/real-estate/search?query=${searchValue}&bed=${bed}&bath=${bath}&type=${category}&type=${sortOption}`
        );
        const data = await response.json();
        setListOfRentals(data.data);
        setSearchFrequency(data.freq_in_sites);
        setAutoCompleteRecommend(data.autoComplete);

        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSearchOnRegexClicks = async (searchValue) => {
    setLoading(true);
    try {
      incrementSearchCount(searchValue);
      const response = await fetch(
        `http://aitalk.in:8080/api/real-estate/search?query=${searchValue}&bed=${bed}&bath=${bath}&type=${category}&type=${sortOption}`
      );
      const data = await response.json();
      setListOfRentals(data.data);
      setSearchFrequency(data.freq_in_sites);
      setAutoCompleteRecommend(data.autoComplete);

      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const incrementSearchCount = async (searchValue) => {
    try {
      await fetch(
        `http://aitalk.in:8080/api/real-estate/add-term?term=${searchValue}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const handleDoYouMeanClick = (suggestion) => {
    // Set the search input to the selected suggestion
    setSearchValue(suggestion);
    // Trigger a new search with the selected suggestion
    handleSearch();

    setCurrentPage(1);
  };

  const handleTrendingHouseClick = (suggestion) => {
    handleSearchOnRegexClicks(suggestion);
    setCurrentPage(1);
  };

  const handleTrendingSearchesClick = (suggestion) => {
    handleSearchOnRegexClicks(suggestion);
    setCurrentPage(1);
  };

  const handleRegexClickOnCityAndZipcode = (suggestion) => {
    handleSearchOnRegexClicks(suggestion);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    if (searchValue) {
      const fetchData = async () => {
        try {
          incrementSearchCount(searchValue);
          const response = await fetch(
            `http://aitalk.in:8080/api/real-estate/search?query=${searchValue}&bed=${bed}&bath=${bath}&type=${category}&type=${sortOption}`
          );
          const data = await response.json();
          setListOfRentals(data.data);
          // setJsonDataBk(data.data);
          setSearchFrequency(data.freq_in_sites);
          setAutoCompleteRecommend(data.autoComplete);

          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // Simulate a loading delay for 3 seconds
          setTimeout(() => {
            setLoading(false);
          }, 750);
        }
      };

      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, bed, bath, category, sortOption]);

  const fetchTrendingHouses = async () => {
    try {
      const response = await fetch(
        "http://aitalk.in:8080/api/real-estate/top-10"
      );
      const data = await response.json();
      setTrendingHouses(data);
    } catch (error) {
      console.error("Error fetching trending houses data:", error);
    }
  };

  const fetchTrendingSearches = async () => {
    try {
      const response = await fetch(
        "http://aitalk.in:8080/api/real-estate/top-terms"
      );
      const data = await response.json();
      console.log(data);
      setTrendingSearches(data);
    } catch (error) {
      console.error("Error fetching trending houses data:", error);
    }
  };

  useEffect(() => {
    let active = true;
    let timeoutId;

    if (!loadingAPI) {
      return undefined;
    }
    const fetchData = async () => {
      const response = await fetch(
        `http://aitalk.in:8080/api/real-estate/autosuggest-search?q=${searchValue}`
      );

      if (active && response.data && response.data.matchingDocuments) {
        setListSuggestions(response.data.matchingDocuments);
        setAutoCompleteRecommend(response.data.autoComplete);
      }
    };

    // Introduce a delay of 200ms before making the API call
    timeoutId = setTimeout(fetchData, 200);

    return () => {
      active = false;
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts or the input changes
    };
  }, [loadingAPI, searchValue]);

  const handlePageChange = (newPage) => {
    setLoading(true); // Set loading to true when pagination button is clicked

    setTimeout(() => {
      setLoading(false);
    }, 750);
    setCurrentPage(newPage);
  };

  const filterDataByDomain = (domain) => {
    const filteredData = listOfRentals.filter((property) => {
      // Assuming that the domain is present in the property data, adjust this condition accordingly
      return (
        property.website !== undefined && property.website.includes(domain)
      );
    });

    setListOfRentals(filteredData);
    setCurrentPage(1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CottageIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Cozy Rentals
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <SearchBar
            setIsDrawerOpen={setIsDrawerOpen}
            listSuggestions={listSuggestions}
            openSuggestion={openSuggestion}
            setOpenSuggestion={setOpenSuggestion}
            searchValue={searchValue}
            loadingAPI={loadingAPI}
            handleSearch={handleSearch}
            setSearchValue={setSearchValue}
            loading={loading}
            autoCompleteRecommend={autoCompleteRecommend}
          />
          <TrendingSearches
            trendingSearches={trendingSearches}
            handleTrendingSearchesClick={handleTrendingSearchesClick}
          />
          <TrendingHouses
            trendingHouses={trendingHouses}
            handleTrendingHouseClick={handleTrendingHouseClick}
          />
          <DrawerForFilter
            isDrawerOpen={isDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            bed={bed}
            handleBedChange={handleBedChange}
            sortOption={sortOption}
            handleSortOptionChange={handleSortOptionChange}
            handleClearFilters={handleClearFilters}
            category={category}
            handleCategoryChange={handleCategoryChange}
            bath={bath}
            handleBathChange={handleBathChange}
          />

          {/* "Do you mean" section */}
          <DoYouMean
            data={listOfRentals}
            doYouMean={autoCompleteRecommend}
            handleDoYouMeanClick={handleDoYouMeanClick}
          />

          {/* "Filter By Website" */}
          <FilterByWebsite
            listOfRentals={listOfRentals}
            searchFrequency={searchFrequency}
            filterDataByDomain={filterDataByDomain}
          />

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 4,
                height: "700px",
              }}
            >
              <div
                className="skeleton-wz5ujko6v7v"
                style={{ width: "100%" }}
              ></div>
            </Box>
          )}
          {/* Listing out property */}
          <ListProperty
            data={listOfRentals}
            startIndex={startIndex}
            endIndex={endIndex}
            handleRegexClickOnCityAndZipcode={handleRegexClickOnCityAndZipcode}
          />

          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pagesToShow={pagesToShow}
            handlePageChange={handlePageChange}
          />
        </Container>
      </main>
    </ThemeProvider>
  );
}
