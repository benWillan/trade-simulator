import React, { useState, useCallback, useRef } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import { Stock } from "../../types/AutocompleteInput";

interface StockOption {
  value: string;
  label: string;
}

interface tickerSecNameCombination {
  ticker: string;
  securityName: string;
}

function AutocompleteInput() {

  const [selectedOption, setSelectedOption] = useState<StockOption | null>(null);
  const timingRef = useRef<ReturnType<typeof setTimeout>>(null);

  async function fetchOptions(inputValue: string): Promise<StockOption[]> {

    if (!inputValue) return [];

    try {

      const response = await fetch(`https://localhost:7133/api/stock/search?securityName=${inputValue}`);
      
      const data: tickerSecNameCombination[] = await response.json();

      const securityTickerCombinations: StockOption[] = data.map((item) => 
        ({value: item.ticker,label: item.securityName})
      );

      return securityTickerCombinations;

    } catch (error) {

      console.error("Error fetching options:", error);
      return [];

    }
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
    <div style={{ width: 420 }}>
      <AsyncSelect
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
        onChange={setSelectedOption}
        styles={{
          option: (provided) => ({
            ...provided,
            fontSize: "14px", // dropdown items font size
          }),
          input: (provided) => ({
            ...provided,
            fontSize: "14px", // text typed in input
          }),
          singleValue: (provided) => ({
            ...provided,
            fontSize: "14px", // selected value display
          }),
        }}
        placeholder="Security name..."
      />
      {selectedOption && (
        <div>
          <span style={{fontWeight: "bold"}}>Selected:</span>{selectedOption.label}
          <br />
          <span style={{fontWeight: "bold"}}>Value:</span>{selectedOption.value}
        </div>
      )}
    </div>
  );
}

export default AutocompleteInput;