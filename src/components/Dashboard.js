import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  // Typography,
  createTheme,
} from "@mui/material";
// import CottageIcon from "@mui/icons-material/Cottage";
import DrawerForFilter from "./DrawerForFilter";
import DoYouMean from "./DoYouMean";
import ListProperty from "./ListProperty";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterByWebsite from "./FilterByWebsite";
import Pagination from "./Pagination";
import TrendingHouses from "./TrendingHouses";
import TrendingSearches from "./TrendingSearches";

import SpellChecking from "./SpellChecking";

import BackToTopButton from "./v2/BackToTopButton";
import Category from "./v2/Category";
import Team from "./v2/Team";
import About from "./v2/About";
import Footer from "./v2/Footer";

import Header from "./v2/Header";
import Navbar from "./v2/Navbar";
import axios from "axios";
const defaultTheme = createTheme();
const itemsPerPage = 12; // Number of items to display per page
const pagesToShow = 3; // Number of pagination buttons to show on each side of the current page

export default function Dashboard() {
  const { city } = useParams();

  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [listSuggestions, setListSuggestions] = useState([]);

  const [listOfRentals, setListOfRentals] = useState([]);
  const [jsonData, setJsonDataBk] = useState([]);

  const [searchPerformed, setSearchPerformed] = useState(false);

  const [trendingHouses, setTrendingHouses] = React.useState([]);

  const [trendingSearches, setTrendingSearches] = React.useState([]);

  const [autoCompleteRecommend, setAutoCompleteRecommend] = useState([]);
  const [spellCheckingWords, setSpellCheckingWords] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchFrequency, setSearchFrequency] = React.useState({});

  const [loading, setLoading] = useState(false);
  const loadingAPI = openSuggestion && listSuggestions.length === 0;

  const [countryChange, setCountryChange] = useState("canada");

  const [currentPage, setCurrentPage] = useState(1);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [category, setCategory] = React.useState([
    "individual_house",
    "townhouse",
    "apartment",
  ]);
  const [bed, setBed] = React.useState("");
  const [bath, setBath] = React.useState("");
  const [sortOption, setSortOption] = React.useState("low_price");

  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(9000000);

  const totalItems =
    typeof listOfRentals !== "undefined"
      ? listOfRentals.length > 0
        ? listOfRentals.length
        : 0
      : 0;
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
  const handleFromPriceChange = (event) => {
    setFromPrice(event.target.value);
  };

  const handleToPriceChange = (event) => {
    setToPrice(event.target.value);
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
          `https://aitalk.in/api-search.php?query=${searchValue}&country=${countryChange}&bed=${bed}&bath=${bath}&type=${category}&sort=${sortOption}&fromPrice=${fromPrice}&toPrice=${toPrice}`
        );
        const data = await response.json();
        setListOfRentals(data.data);
        setJsonDataBk(data.data);
        setSearchFrequency(data.freq_in_sites);
        setAutoCompleteRecommend(data.autoComplete);
        setSpellCheckingWords(data.spellChecked);

        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setSearchPerformed(true);

        fetchTrendingSearches();
        fetchTrendingHouses();
        handleDrawerClose();
      }
    }
  };
  const handleSearchOnRegexClicks = async (searchValue) => {
    setLoading(true);
    try {
      incrementSearchCount(searchValue);
      const response = await fetch(
        `https://aitalk.in/api-search.php?query=${searchValue}&country=${countryChange}&bed=${bed}&bath=${bath}&type=${category}&sort=${sortOption}&fromPrice=${fromPrice}&toPrice=${toPrice}`
      );
      const data = await response.json();
      setListOfRentals(data.data);

      setJsonDataBk(data.data);
      setSearchFrequency(data.freq_in_sites);
      setAutoCompleteRecommend(data.autoComplete);

      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);

      setSearchPerformed(true);
      fetchTrendingSearches();
      fetchTrendingHouses();
      handleDrawerClose();
    }
  };

  const handleCategoryTypeClick = async (searchValueType) => {
    if (searchValueType) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://aitalk.in/api-search.php?query=${searchValue}&country=${countryChange}&bed=${bed}&bath=${bath}&type=${category}&sort=${searchValueType}&fromPrice=${fromPrice}&toPrice=${toPrice}`
        );
        const data = await response.json();
        setListOfRentals(data.data);

        setJsonDataBk(data.data);
        setSearchFrequency(data.freq_in_sites);
        setAutoCompleteRecommend(data.autoComplete);

        setSearchPerformed(true);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        handleDrawerClose();
      }
    }
  };

  const incrementSearchCount = async (searchValue) => {
    try {
      await fetch(
        `https://aitalk.in/api-add-term.php?term=${searchValue}&country=${countryChange}`
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
    fetchTrendingSearches();
    fetchTrendingHouses();
  }, [countryChange]);
  React.useEffect(() => {
    if (searchValue) {
      const fetchData = async () => {
        try {
          incrementSearchCount(searchValue);
          const response = await fetch(
            `https://aitalk.in/api-search.php?query=${searchValue}&country=${countryChange}&bed=${bed}&bath=${bath}&type=${category}&sort=${sortOption}&fromPrice=${fromPrice}&toPrice=${toPrice}`
          );
          const data = await response.json();
          setListOfRentals(data.data);
          setJsonDataBk(data.data);
          setSearchFrequency(data.freq_in_sites);
          setAutoCompleteRecommend(data.autoComplete);

          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);

          setSearchPerformed(true);
          handleDrawerClose();
        }
      };

      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, bed, bath, category, sortOption, fromPrice, toPrice]);

  const fetchTrendingHouses = async () => {
    try {
      const response = await fetch(
        `https://aitalk.in/api-top-10.php?country=${countryChange}`
      );
      const data = await response.json();
      setTrendingHouses(data);
    } catch (error) {
      console.error("Error fetching trending houses data:", error);
    }
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setOpenSuggestion(value.length > 0); // Show suggestions when there is input
    if (value === "") {
      setAutoCompleteRecommend([]);
    } else {
      callAPIForAutoSuggest(value);
    }
  };

  const fetchTrendingSearches = async () => {
    try {
      const response = await fetch(
        `https://aitalk.in/api-top-terms.php?country=${countryChange}`
      );
      const data = await response.json();
      console.log(data);
      setTrendingSearches(data);
    } catch (error) {
      console.error("Error fetching trending houses data:", error);
    }
  };

  // useEffect(() => {
  //   let active = true;
  //   let timeoutId;

  //   if (!loadingAPI) {
  //     return undefined;
  //   }
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `http://aitalk.in:8080/api/real-estate/autosuggest-search?q=${searchValue}`
  //     );

  //     if (active && response.data && response.data.matchingDocuments) {
  //       setListSuggestions(response.data.matchingDocuments);
  //       setAutoCompleteRecommend(response.data.autoComplete);
  //     }
  //   };

  //   // Introduce a delay of 200ms before making the API call
  //   timeoutId = setTimeout(fetchData, 200);

  //   return () => {
  //     active = false;
  //     clearTimeout(timeoutId); // Clear the timeout if the component unmounts or the input changes
  //   };
  // }, [searchValue]);
  const callAPIForAutoSuggest = async (searchWord) => {
    let active = true;
    let timeoutId;

    try {
      const response = await axios.get(
        `https://aitalk.in/api-auto-suggest.php?q=${searchWord}&country=${countryChange}`
      );

      if (active && response.data && response.data.matchingDocuments) {
        setListSuggestions(response.data.matchingDocuments);
        setAutoCompleteRecommend(response.data.autoComplete);
      }
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
    } finally {
      active = false;
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts or the input changes
    }
  };

  const handlePageChange = (newPage) => {
    setLoading(true); // Set loading to true when pagination button is clicked

    setTimeout(() => {
      setLoading(false);
    }, 750);
    setCurrentPage(newPage);
  };
  const handleCountryChange = (event) => {
    setCountryChange(event.target.value);
  };

  const filterDataByDomain = (domain) => {
    const filteredData = jsonData.filter((property) => {
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
      <Navbar id="homeSection" listOfRentals={listOfRentals} />

      {listOfRentals.length == 0 && <Header />}
      <main>
        <Container>
          <div className="bg-primary" style={{ padding: "5px 40px" }}>
            <SearchBar
              style={{ marginTop: "10px" }}
              setIsDrawerOpen={setIsDrawerOpen}
              listSuggestions={listSuggestions}
              openSuggestion={openSuggestion}
              setOpenSuggestion={setOpenSuggestion}
              searchValue={searchValue}
              loadingAPI={loadingAPI}
              handleSearch={handleSearch}
              handleInputChange={handleInputChange}
              setSearchValue={setSearchValue}
              loading={loading}
              autoCompleteRecommend={autoCompleteRecommend}
              countryChange={countryChange}
              handleCountryChange={handleCountryChange}
            />
          </div>

          <TrendingSearches
            trendingSearches={trendingSearches}
            handleTrendingSearchesClick={handleTrendingSearchesClick}
          />
          <TrendingHouses trendingHouses={trendingHouses} />
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
            fromPrice={fromPrice}
            toPrice={toPrice}
            handleFromPriceChange={handleFromPriceChange}
            handleToPriceChange={handleToPriceChange}
            handleBathChange={handleBathChange}
          />

          <SpellChecking
            data={listOfRentals}
            spellCheckingWords={spellCheckingWords}
            handleDoYouMeanClick={handleDoYouMeanClick}
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

          {listOfRentals.length == 0 && searchPerformed && (
            <div style={{ textAlign: "-webkit-center", margin: "20px" }}>
              <img src="img/placeholder.jpg" style={{ width: "40%" }} />
              <Typography style={{ margin: "10px", fontSize: "24px" }}>
                No Results Found
              </Typography>
            </div>
          )}
          {listOfRentals.length == 0 && (
            <>
              <Category handleCategoryTypeClick={handleCategoryTypeClick} />
              <About />
            </>
          )}

          {/* Listing out property */}
          <ListProperty
            data={listOfRentals}
            startIndex={startIndex}
            endIndex={endIndex}
            country={countryChange}
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
        {listOfRentals.length == 0 && <Team />}
        <BackToTopButton />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
