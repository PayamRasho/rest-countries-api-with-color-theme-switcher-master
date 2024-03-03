import React, { useEffect, useState } from "react";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async () => {
    const response = await fetch(url);

    const countriesData = await response.json();
    setCountries(countriesData);
    console.log(countriesData);
  };
  useEffect(() => {
    fetchCountryData();
  }, []);
  return (
    <>
      <section className="grid">
        {countries.map((country) => {
          const { name, population, region, capital, flags } = country;
          return (
            <article key={country.cca3}>
              <div>
                <img src={flags.png} alt={name} />
                <div className="details">
                  <h3>{name.common}</h3>
                  <h4>
                    Population : <span>{population}</span>
                  </h4>
                  <h4>
                    Region : <span>{region}</span>
                  </h4>
                  <h4>
                    Capital : <span>{capital}</span>
                  </h4>
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
