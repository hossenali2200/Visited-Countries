import React, { useEffect, useState } from "react";

const About = ({ searchQuery }) => {
  const [countries, setCountries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [viewedCountries, setViewedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 20);
  };

  const handleViewCountry = (country) => {
    setViewedCountries([...viewedCountries, country]);
  };

  const handleOpenModal = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="country">
      <div className="flex">
        <div className="flex-grow mt-10 mb-10">
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-6xl">Countries</h2>
          </div>
          <div className="flex justify-center items-center">
            Countries: {filteredCountries.length}
          </div>
          <div className="mt-20 grid grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-8">
            {filteredCountries.slice(0, visibleCount).map((item, index) => {
              const isViewed = viewedCountries.includes(item.name.common);

              return (
                <div key={index}>
                  <a
                    className="p-3 max-w-lg h-[400px] border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
                    href="#"
                  >
                    <img
                      src={item.flags.png}
                      className="shadow h-48 w-2/3 rounded-lg overflow-hidden border"
                      alt={`Flag of ${item.name.common}`}
                    />
                    <div className="mt-8 mb-8">
                      <div className="grid grid-cols-2">
                        <h4 className="font-bold text-xl">{item.name.common}</h4>
                        <button
                          className="text-white font-semibold px-4 py-2 bg-slate-500 rounded-xl"
                          onClick={() => handleOpenModal(item)}
                        >
                          Details
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <h4 className="font-semibold text-blue-500 text-lg">
                          Population: {item.population}
                        </h4>
                        <h4 className="font-semibold text-emerald-600 text-lg">
                          Capital: {item.capital}
                        </h4>
                      </div>
                      <p className="mt-2 text-gray-600">
                        {isViewed ? "I visited this country" : "Click to view"}
                      </p>
                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => handleViewCountry(item.name.common)}
                          disabled={isViewed}
                          className={`inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm ${
                            isViewed
                              ? "bg-red-500 text-black font-semibold cursor-not-allowed"
                              : "bg-gray-800 hover:bg-gray-900"
                          }`}
                        >
                          {isViewed ? "Viewed" : "View"}
                        </button>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          {visibleCount < filteredCountries.length && (
            <div className="flex justify-center items-center mt-10">
              <button
                onClick={handleShowMore}
                className="px-6 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-700"
              >
                See More
              </button>
            </div>
          )}
        </div>

        {/* Sidebar to display viewed countries */}
        <div className="w-1/4 p-4 bg-gray-100 border-l border-gray-300">
          <h3 className="font-bold text-xl mb-4">
            Viewed Countries: {viewedCountries.length}
          </h3>
          <ul>
            {viewedCountries.length > 0 ? (
              viewedCountries.map((country, index) => (
                <li key={index} className="mb-2">
                  {country}
                </li>
              ))
            ) : (
              <p>No countries viewed yet.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Modal for displaying country details */}
      {isModalOpen && selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedCountry.name.common}</h2>
            <img
              src={selectedCountry.flags.png}
              className="w-48 h-32 mx-auto mb-4"
              alt={`Flag of ${selectedCountry.name.common}`}
            />
            <p>
              <strong>Population:</strong> {selectedCountry.population}
            </p>
            <p>
              <strong>Capital:</strong> {selectedCountry.capital}
            </p>
            <p>
              <strong>Region:</strong> {selectedCountry.region}
            </p>
            <p>
              <strong>Subregion:</strong> {selectedCountry.subregion}
            </p>
            <p>
              <strong>Area:</strong> {selectedCountry.area} km²
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
