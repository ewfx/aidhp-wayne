import React, { useState } from "react";
import Select from "react-select";
import { Box, useColorModeValue } from "@chakra-ui/react";

const options = [
  { value: "High risk", label: "High risk" },
  { value: "Low interest", label: "Low interest" },
  { value: "Flexible terms", label: "Flexible terms" },
  { value: "Long-term", label: "Long-term" },
  { value: "Government-backed", label: "Government-backed" },
  { value: "Short-term", label: "Short-term" },
  { value: "Moderate risk", label: "Moderate risk" },
  { value: "Fixed rate", label: "Fixed rate" },
  { value: "High return", label: "High return" },
  { value: "Government subsidy", label: "Government subsidy" },
  { value: "High growth", label: "High growth" },
  { value: "Leasing option", label: "Leasing option" },
  { value: "Collateral-backed", label: "Collateral-backed" },
  { value: "No collateral", label: "No collateral" },
  { value: "Revolving", label: "Revolving" },
  { value: "Sustainable projects", label: "Sustainable projects" },
];

function OrgPreferencesDropdown() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Define color values outside of customStyles
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const multiValueBgColor = useColorModeValue("blue.100", "blue.700");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: bgColor,
      borderColor: borderColor,
      padding: "4px",
      textAlign: "left",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: bgColor,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: multiValueBgColor,
    }),
  };

  return (
    <Box w="300px">
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={setSelectedOptions}
        styles={customStyles}
        placeholder="Preferences"
      />
    </Box>
  );
}

export default OrgPreferencesDropdown;
