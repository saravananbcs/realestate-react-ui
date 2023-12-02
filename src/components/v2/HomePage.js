import BackToTopButton from "./BackToTopButton";
import Category from "./Category";
import Header from "./Header";
import Navbar from "./Navbar";
import SearchBar from "../SearchBar";
import PropertyGrid from "./PropertyGrid";
import Team from "./Team";
import About from "./About";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar />
      <Category />
      <About />
      <PropertyGrid />
      <Team />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default HomePage;
