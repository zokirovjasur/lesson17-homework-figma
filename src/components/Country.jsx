import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Country() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const url = `https://restcountries.com/v3.1/name/${name}`;
        const response = await fetch(url);
        const data = await response.json();
        const selectedCountry = data[0];

        setCountry({
          name: selectedCountry.name.common,
          nativeName: Object.values(selectedCountry.name.nativeName)[0].common,
          population: selectedCountry.population,
          region: selectedCountry.region,
          subRegion: selectedCountry.subregion,
          capital: selectedCountry.capital
            ? selectedCountry.capital[0]
            : "Unknown",
          flag: selectedCountry.flags.svg,
          topLevelDomain: selectedCountry.tld,
          currencies: Object.values(selectedCountry.currencies).map(
            (currency) => currency.name
          ),
          languages: Object.values(selectedCountry.languages),
          borderCountries: selectedCountry.borders || [],
        });
      } catch (error) {
        console.error("Error fetching country: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!country) {
    return <div className="p-5">Country not found</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <div className="mb-5">
        <Link to="/" className="text-decoration-none">
          <button className="flex items-center gap-2 px-5 py-2 border border-gray-800 rounded-md bg-transparent cursor-pointer font-NunitoSans">
            <ArrowLeft size={15} />
            Back
          </button>
        </Link>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2">
        <div className="aspect-w-3 aspect-h-2 relative">
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            className="w-full h-full object-cover rounded-md shadow-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-5">{country.name}</h1>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
            <div>
              <p>
                <span className="font-bold">Native Name:</span>{" "}
                {country.nativeName}
              </p>
              <p>
                <span className="font-bold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-bold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-bold">Sub Region:</span>{" "}
                {country.subRegion}
              </p>
              <p>
                <span className="font-bold">Capital:</span> {country.capital}
              </p>
            </div>

            <div>
              <p>
                <span className="font-bold">Top Level Domain:</span>{" "}
                {country.topLevelDomain.join(", ")}
              </p>
              <p>
                <span className="font-bold">Currencies:</span>{" "}
                {country.currencies.join(", ")}
              </p>
              <p>
                <span className="font-bold">Languages:</span>{" "}
                {country.languages.join(", ")}
              </p>
            </div>
          </div>

          {country.borderCountries.length > 0 && (
            <div className="mt-5">
              <h2 className="font-bold mb-2">Border Countries:</h2>
              <div className="flex flex-wrap gap-3">
                {country.borderCountries.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border.toLowerCase()}`}
                    className="text-decoration-none"
                  >
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-transparent cursor-pointer">
                      {border}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
