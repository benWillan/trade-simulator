import React, { useState, useCallback, useRef, ChangeEvent, useEffect } from "react";
import AsyncSelect from "react-select/async";
import {StockOption, TickerSecNameCombination} from '../../types/charting/types';

type Props = {
  onAutoCompleteSelect: (stock: StockOption | null) => void;
  clearInput?: boolean;
}

function AutocompleteInput({onAutoCompleteSelect, clearInput = false} : Props) {

  const [selectedOption, setSelectedOption] = useState<StockOption | null>(null);
  const timingRef = useRef<ReturnType<typeof setTimeout>>(null);
  
  useEffect(() => {

    onAutoCompleteSelect(selectedOption);

  }, [selectedOption]);

  useEffect(() => {

    if (clearInput === true) {
      setSelectedOption(null);
    }

  }, [clearInput]);

  async function fetchOptions(inputValue: string): Promise<StockOption[]> {

    if (!inputValue) return [];

    try {

      const response = await fetch(`https://localhost:7133/api/stock/search?securitySearch=${inputValue}`);
      
      const data: TickerSecNameCombination[] = await response.json() as TickerSecNameCombination[];

      const securityTickerCombinations: StockOption[] = data.map((item) => 
        ({value: item.ticker,label: item.securityName})
      );

      return securityTickerCombinations;

    } catch (error) {

      console.error("Error fetching options:", error);
      return [];

    }
  }

  const handleSecuritySelect = (e: StockOption | null) => {

    setSelectedOption(e);

  }

  const loadOptions = (inputValue: string) : Promise<StockOption[]> => {

    if(timingRef.current) {

      clearTimeout(timingRef.current);

    }

    return new Promise<StockOption[]>((resolve) => {

      setTimeout(() => {

        resolve(fetchOptions(inputValue));

      }, 450);

    });

  }

  return (
    <AsyncSelect
      autoFocus
      isClearable
      cacheOptions
      onKeyDown={(e) => {
        const input = e.target as HTMLInputElement; // cast to HTMLInputElement
        if (e.shiftKey && e.key === 'Home') {
          input.setSelectionRange(0, input.value.length);
          e.preventDefault();
        }

        // Optional: support Ctrl+A / Cmd+A
        if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
          input.setSelectionRange(0, input.value.length);
          e.preventDefault();
        }
      }}
      defaultOptions={false}
      loadOptions={loadOptions}
      value={selectedOption}
      onChange={handleSecuritySelect}
      styles={{
        control: (provided: any) => ({
          ...provided,
          backgroundColor: "#212529", // Bootstrap dark background
          color: "#fff",
          borderColor: "#495057",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#6c757d",
          },
        }),
        menu: (provided: any) => ({
          ...provided,
          backgroundColor: "#212529",
          color: "#fff",
        }),
        menuList: (provided: any) => ({
          ...provided,
          backgroundColor: "#212529",
          color: "#fff",
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          fontSize: "14px", // dropdown items font size
          backgroundColor: state.isFocused ? "#495057" : "#212529",
          color: "#fff",
          "&:active": {
            backgroundColor: "#343a40",
          },
        }),
        singleValue: (provided: any) => ({
          ...provided,
          fontSize: "14px", // dropdown items font size
          color: "#fff",
        }),
        input: (provided: any) => ({
          ...provided,
          fontSize: "14px", // dropdown items font size
          color: "#fff",
        }),
        placeholder: (provided: any) => ({
          ...provided,
          color: "#adb5bd",
        }),
      }}
      placeholder="Ticker | Security name"
    />
  );
}

export default AutocompleteInput;