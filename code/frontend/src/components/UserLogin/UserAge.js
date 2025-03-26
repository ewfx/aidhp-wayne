import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Input, Text } from "@chakra-ui/react";
import { differenceInYears } from "date-fns";

function AgeInput() {
  const [birthdate, setBirthdate] = useState(null);
  const [age, setAge] = useState("");

  const handleDateChange = (date) => {
    setBirthdate(date);
    if (date) {
      setAge(differenceInYears(new Date(), date)); // Calculate age
    } else {
      setAge("");
    }
  };

  // Custom Input for DatePicker
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Input
      ref={ref}
      onClick={onClick}
      value={value}
      placeholder="Select your birthdate" // Placeholder is shown when no date is selected
      textAlign="left"
      readOnly // Prevent manual typing
    />
  ));

  return (
    <Box w="300px" textAlign="left">
      <DatePicker
        selected={birthdate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100} // Allows scrolling years
        maxDate={new Date()} // Prevents selecting future dates
        customInput={<CustomInput />}
      />
      {age && <Text mt={2}>Your Age: {age} years</Text>}
    </Box>
  );
}

export default AgeInput;
