import React, { ChangeEvent } from "react";

interface FormRowSelectProps {
  name: string;
  labelText?: string;
  list: string[];
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}) => {
  // Capitalize first letter of each word
  const capitalize = (str: string): string => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {capitalize(itemValue)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
