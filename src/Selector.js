import React, { useEffect, useState } from "react";
import { useData } from "./util/useData";

export const Selector = () => {
  let currentCarMake = "";
  const {
    years,
    carMakes,
    carModels,
    setCarModels,
    fetchYears,
    fetchCarMakes,
    fetchCarModels,
  } = useData();

  //State
  const [isSwitched, setIsSwitched] = useState(false);
  const [isYearDisabled, setIsYearDisabled] = useState(true);
  const [isMakeDisabled, setIsMakeDisabled] = useState(true);
  const [isModelDisabled, setIsModelDisabled] = useState(true);

  //Functions

  //Switches UI from YMM to MMY
  const switchUi = () => {
    console.log("isSwitched: ", isSwitched);
    setIsSwitched(!isSwitched);
    setCarModels([]);
    if (isSwitched === true) {
      setIsYearDisabled(true);
      setIsModelDisabled(true);
    }
    console.log("isSwitched: ", isSwitched);
    console.log("isYearDisabled: ", isYearDisabled);
  };

  const changeIsYearDisabled = () => {
    setIsYearDisabled(false);
  };

  //Changes the Make select tag to enabled
  const changeIsMakeDisabled = () => {
    setIsMakeDisabled(false);
  };

  //Changes the Model select tag to enabled
  const changeIsModelDisabled = () => {
    setIsModelDisabled(false);
  };

  //Fills the Model select tag with the model data based on the current Make selected
  const fillCarModels = async (e) => {
    currentCarMake = e.target.value;
    await fetchCarModels(currentCarMake);
    changeIsModelDisabled();
    setTimeout(() => {
      changeIsYearDisabled();
    }, 3000);
  };

  //Fetches the Years and Car Manufacturers
  useEffect(() => {
    console.log(isSwitched);
    fetchYears();
    fetchCarMakes();
  }, []);

  /* 
    Checks whether the model array contains only 1 element. If so then it auto selects the model of vehicle.
    If not then it will just show the models of the vehicle make chosen.
  */
  const modelLength =
    carModels.length === 1 ? (
      <select className="w-40 border-2 border-gray-400 py-2 rounded-lg mx-5">
        <option defaultValue hidden>
          Model
        </option>
        {carModels.map((m) => (
          <option key={m.id} value={m.id} selected>
            {m.name}
          </option>
        ))}
      </select>
    ) : (
      <select
        disabled={isModelDisabled}
        className="w-40 border-2 border-gray-400 py-2 rounded-lg mx-5"
      >
        <option defaultValue hidden>
          Model
        </option>
        {carModels.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    );

  /*
    Displays the UI as YMM or MMY depending on the truthy value 'isSwitched'
  */
  const switchedUI = isSwitched ? (
    <div>
      <select
        onChange={changeIsMakeDisabled}
        className="w-40 border-2 border-gray-400 py-2 rounded-lg mx-5"
      >
        <option defaultValue hidden>
          Year
        </option>
        {years.map((y) => (
          <option key={y.id}>{y.id}</option>
        ))}
      </select>
      <select
        disabled={isMakeDisabled}
        onChange={(e) => fillCarModels(e)}
        className="w-40 border-2 border-gray-400 py-2 rounded-lg mx-5"
      >
        <option hidden>Make</option>
        {carMakes.map((m) => (
          <option value={m.id} key={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      {modelLength}
    </div>
  ) : (
    <div>
      <select
        onChange={(e) => fillCarModels(e)}
        className="w-40 border-2 border-gray-400 py-2 rounded-lg mx-5"
      >
        <option hidden>Make</option>
        {carMakes.map((m) => (
          <option value={m.id} key={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      {modelLength}
      <select
        disabled={isYearDisabled}
        className="w-40 border-2 border-gray-400 py-2 rounded-lg mx-5"
      >
        <option defaultValue hidden>
          Year
        </option>
        {years.map((y) => (
          <option key={y.id}>{y.id}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <h1 className="flex justify-center mb-20 text-5xl">
        🔍 MMY/YMM Vehicle Selector
      </h1>
      <div className="ml-5">
        <h1 className="mb-5 font-bold text-xl">Choose your vehicle</h1>
      </div>
      <div className="flex">
        {switchedUI}
        <button
          onClick={switchUi}
          className="bg-indigo-700 text-white px-3 py-2 rounded-lg hover:bg-indigo-600 transition-all"
        >
          Switch
        </button>
      </div>
    </div>
  );
};
