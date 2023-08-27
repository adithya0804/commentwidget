import React, { useState } from "react";

const Dropdown = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleSelect = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    setSelectedValue(selectedOption.value);
    onSelect(selectedOption.value);
  };

  return (
    <select value={selectedValue} onChange={handleSelect}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;