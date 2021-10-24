import { useState } from "react";
import { getApi } from "./api";

export const useData = () => {
  //Data
  const [years, setYears] = useState([]);
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);

  //Fetches the Years from the graphql API
  const fetchYears = () => {
    getApi(`query {
      uvdb {
        search_uvdb_years {
          items {
            id
          }
        }
      }
    }`).then((data) => {
      setYears(data.data.uvdb.search_uvdb_years.items);
    });
  };

  //Fetches the car makes from the graphql API
  const fetchCarMakes = () => {
    getApi(`query {
      uvdb {
        search_uvdb_makes(limit: 534) {
          items {
            id
            name
          }
        }
      }
    }`).then((data) => {
      setCarMakes(data.data.uvdb.search_uvdb_makes.items);
    });
  };

  //Fetches the car models from the graphql API dpending on the car make ID passed in as a parameter
  const fetchCarModels = (makeId) => {
    getApi(
      `  query getModels($makeId: ID!) {
      uvdb {
        search_uvdb_models(uvdb_make_id: $makeId ) {
          items {
            id
            name
          }
        }
      }
    }`,
      { makeId: makeId }
    ).then((data) => {
      setCarModels(data.data.uvdb.search_uvdb_models.items);
    });
  };

  return {
    years,
    carMakes,
    carModels,
    setCarModels,
    fetchYears,
    fetchCarMakes,
    fetchCarModels,
  };
};
