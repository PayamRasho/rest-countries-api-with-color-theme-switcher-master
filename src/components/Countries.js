import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async () => {
    const response = await fetch(url);

    const countriesData = await response.json();
    setCountries(countriesData);
    // console.log(countriesData);
  };
  useEffect(() => {
    fetchCountryData();
  }, []);

  const removeCountry = (cca3) => {
    const newCountry = countries.filter((country) => country.cca3 !== cca3);
    setCountries(newCountry);
    console.log();
  };
  return (
    <>
      <section className="grid">
        {countries.map((country) => {
          const {name, population, region, capital, flags } = country;
          return (
            <article key={country.cca3}>
              <div>
                <img src={flags.png} alt={name.common} />
                <div className="details">
                  <h3>{name.common}</h3>
                  <h4>
                    Population : <span>{population.toLocaleString()}</span>
                  </h4>
                  <h4>
                    Region : <span>{region}</span>
                  </h4>
                  <h4>
                    Capital : <span>{capital}</span>
                  </h4>
                  <div className="buttons">
                    <Link to={`/countries/${name.common}`}  className="btn">
                      Learn More
                    </Link>
                    <button
                      className="btn"
                      onClick={() => removeCountry(country.cca3)}
                    >
                      Remove Country
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Countries;
