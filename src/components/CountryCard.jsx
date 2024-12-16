import React from "react";
import { NavLink } from "react-router-dom";

export default function CountryCard({ country }) {
  return (
    <div className="shadow-2xl rounded-lg w-full max-md:w-[264px] max-[400px]:w-56 overflow-hidden">
      <NavLink to={`/country/${country.name}`}>
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-full h-40 object-cover"
        />
      </NavLink>
      <div className="p-6 font-['Nunito_Sans'] space-y-2">
        <h2 className="text-xl font-semibold mb-4">{country.name}</h2>
        <p>
          <b>Population:</b> {country.population.toLocaleString()}
        </p>
        <p>
          <b>Region:</b> {country.region}
        </p>
        <p>
          <b>Capital:</b> {country.capital}
        </p>
      </div>
    </div>
  );
}
