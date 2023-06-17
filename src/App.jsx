import { useState, useEffect } from "react";
import Pagination from "./components/pagination";
import "./index.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [isOrder, setIsOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  function sortByOrderName() {
    if (isOrder === true) {
      const sorted = [...countries].sort((a, b) => (a > b ? 1 : -1));
      setCountries(sorted);
      setIsOrder(true);
    } else {
      setIsOrder(false);
    }
  }

  function sortByRegion() {
    const ocenia = [...countries].filter((item) => item.region === "Oceania");
    setCountries(ocenia);
  }

  function sortByArea() {
    const area = [...countries].filter((item) => item.area < 65300);
    setCountries(area);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = [...countries].slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <button className="btn btn-success" onClick={sortByArea}>
        Sort By Area
      </button>
      <button className="btn btn-primary" onClick={sortByRegion}>
        Sort By Region
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th onClick={sortByOrderName} className="headerName" scope="col">
              Name
            </th>
            <th scope="col">Region</th>
            <th scope="col">Area</th>
            <th scope="col">Independent</th>
          </tr>
        </thead>

        <tbody>
          {currentCountries.map((country, index) => {
            return (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td scope="row">{country.name}</td>
                <td scope="row">{country.region}</td>
                <td scope="row">{country.area}</td>
                <td scope="row">{country.independent ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalCountries={countries.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
