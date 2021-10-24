import { useState } from "react";
import { useData } from "./useData";

export const useBool = () => {
  //const { setCarModels } = useData();

  const [isSwitched, setIsSwitched] = useState(true);
  const [isYearDisabled, setIsYearDisabled] = useState(false);
  const [isMakeDisabled, setIsMakeDisabled] = useState(true);
  const [isModelDisabled, setIsModelDisabled] = useState(true);

  const switchUI = () => {
    setIsSwitched(!isSwitched);
    if (isSwitched) {
      setIsYearDisabled(true);
      setIsModelDisabled(true);
      setIsMakeDisabled(false);
      //setCarModels([]);
    }
  };

  const changeIsYearDisabled = () => {
    setIsYearDisabled(false);
  };

  const changeIsMakeDisabled = () => {
    setIsMakeDisabled(false);
  };

  const changeIsModelDisabled = () => {
    setIsModelDisabled(false);
  };

  return {
    isSwitched,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    setIsSwitched,
    setIsYearDisabled,
    setIsMakeDisabled,
    setIsModelDisabled,
    switchUI,
    changeIsYearDisabled,
    changeIsMakeDisabled,
    changeIsModelDisabled,
  };
};
