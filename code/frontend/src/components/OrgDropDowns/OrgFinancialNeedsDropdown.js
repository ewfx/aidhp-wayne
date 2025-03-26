import React, { useState } from "react";
import Select from "react-select";
import { Box, useColorModeValue } from "@chakra-ui/react";

const options = [
  { value: "Investment", label: "Investment" },
  { value: "Loan", label: "Loan" },
  { value: "Credit Line", label: "Credit Line" },
  { value: "Equipment Financing", label: "Equipment Financing" },
  { value: "Grant", label: "Grant" },
  { value: "Working Capital", label: "Working Capital" },
  { value: "Venture Capital", label: "Venture Capital" },

];

function OrgFinancialNeessDropdown() {
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
        placeholder="Financial Needs"
      />
    </Box>
  );
}

export default OrgFinancialNeessDropdown;
