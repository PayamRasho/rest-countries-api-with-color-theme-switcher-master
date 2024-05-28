import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../country.css";

const Country = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const countryData = await response.json();
        if (countryData.status === 404) {
          throw new Error(`Country not found: ${name}`);
        }
        setCountry(countryData);
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error.message);
      }
    };

    fetchCountryData();
  }, [name]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section className="country">
        <Link to="/" className="btn btn-light">
          <i className="fas fa-arrow-left"> </i> Back Home
        </Link>
        {country.map((c) => {
          const {
            cca3,
            flags,
            name,
            population,
            region,
            subregion,
            capital,
            currencies,
            languages,
            borders,
          } = c;

          const nativeNames = name.nativeName
            ? Object.values(name.nativeName)
                .map((native) => native.common)
                .join(", ")
            : "N/A";

          return (
            <article key={cca3}>
              <div className="country-inner">
                <div className="flag">
                  <img src={flags?.png} alt={name?.common} />
                </div>

                <div className="one-col">
                  <h2>{name?.common}</h2>
                  <div className="country-details">
                    <div>
                      <h5>
                        Native Name: <span>{nativeNames || "N/A"}</span>
                      </h5>
                      <h5>
                        Population:
                        <span>{population?.toLocaleString() || "N/A"}</span>
                      </h5>
                      <h5>
                        Region: <span>{region || "N/A"}</span>
                      </h5>
                      <h5>
                        Sub Region: <span>{subregion || "N/A"}</span>
                      </h5>
                      <h5>
                        Capital: <span>{capital ? capital[0] : "N/A"}</span>
                      </h5>
                    </div>
                    <div>
                      <h5>
                        Currencies:{" "}
                        <span>
                          {currencies
                            ? Object.values(currencies)[0].name
                            : "N/A"}
                        </span>
                      </h5>
                      <h5>
                        Language:{" "}
                        <span>
                          {languages ? Object.values(languages)[0] : "N/A"}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div>
                    <h3>Border Countries: </h3>
                    <div className="borders">
                      {borders ? (
                        borders.map((border) => (
                          <ul key={border}>
                            <li>{border}</li>
                          </ul>
                        ))
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
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

export default Country;
