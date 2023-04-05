import { useState } from "react";
import styles from './MultiSelect.module.css'

const MultiSelect = ({ options, onChange }) => {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (option) => {
        const optionIndex = selectedOptions.indexOf(v => v.id === option.id);
        console.log(optionIndex);

        if (optionIndex === -1) {
        setSelectedOptions([...selectedOptions, option]);
        } else {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions.splice(optionIndex, 1);
        setSelectedOptions(newSelectedOptions);
        }

        onChange(selectedOptions);
    }

    const clearSelection = () => {
        setSelectedOptions([]);
        onChange([]);
    }

  return (
    <div className={styles.multiSelect}>
      <div className={styles.chips}>
        {selectedOptions.length > 0 ? selectedOptions.map((option) => (
          <div key={option.id} className={styles.chip}>
            {option.value}
            <div
              className={styles.closeButton}
              onClick={() => toggleOption(option)}
            >
              X
            </div>
          </div>
        )) : <div onClick={()=>setIsOptionOpen(true)}>
                      Open it
              </div>}
      </div>
      <div className={styles.options}>
        {isOptionOpen && options.map((option) => (
          <div key={option.id} className={styles.option}>
            <input
              type="checkbox"
              id={option.id}
              checked={selectedOptions.includes(v => v.id === option.id)}
              onChange={() => toggleOption(option)}
            />
            <label htmlFor={option.id}>{option.value}</label>
          </div>
        ))}
      </div>
      {selectedOptions.length > 0 && (
        <div className={styles.clearButton} onClick={clearSelection}>
          Clear
        </div>
      )}
    </div>
  );
}

export default MultiSelect