import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Loader from "./Loader";
import CountryCard from "./CountryCard"; // Yangi komponentni import qildik

export default function Main() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const fetchCountries = async () => {
    try {
      let url = "https://restcountries.com/v3.1/all";

      if (regionFilter) {
        url = `https://restcountries.com/v3.1/region/${regionFilter}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      const filteredData = search
        ? data.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
        : data;

      const specificData = filteredData.map((country) => ({
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital ? country.capital[0] : "Unknown :/",
        flag: country.flags.svg,
      }));

      setCountries(specificData);
    } catch (error) {
      console.error("Error fetching countries: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [regionFilter, search]);

  return (
    <>
      <Hero
        search={search}
        setSearch={setSearch}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />
      <div className="pt-12 px-20 container mx-auto">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-20">
            {countries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
