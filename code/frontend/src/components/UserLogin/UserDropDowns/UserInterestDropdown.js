import React, { useState } from "react";
import Select from "react-select";
import { Box, useColorModeValue } from "@chakra-ui/react";

const options = [
  { value: "Technology", label: "Technology" },
  { value: "Fitness", label: "Fitness" },
  { value: "Movies", label: "Movies" },
  { value: "Home Decor", label: "Home Decor" },
  { value: "Coding", label: "Coding" },
  { value: "Theme Parks", label: "Theme Parks" },
  { value: "Gaming", label: "Gaming" },
  { value: "Dancing", label: "Dancing" },
  { value: "Volunteering", label: "Volunteering" },
  { value: "Automobiles", label: "Automobiles" },
  { value: "Sustainability", label: "Sustainability" },
  { value: "Photography", label: "Photography" },
  { value: "Politics", label: "Politics" },
  { value: "Cooking", label: "Cooking" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  { value: "Reading", label: "Reading" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Travel", label: "Travel" },
  { value: "Sports", label: "Sports" },
  { value: "Fashion", label: "Fashion" },
  { value: "Finance", label: "Finance" },
];

function UserInterestDropdown() {
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
        placeholder="Interests"
      />
    </Box>
  );
}

export default UserInterestDropdown;
