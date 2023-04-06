import { useCallback, useEffect, useRef, useState } from "react";
import styles from './MultiSelect.module.css'
import chevronSvg from '@/assets/svgs/chevron-up.svg'
import closeSvg from '@/assets/svgs/close-circle.svg'
const MultiSelect = ({ options, onChange }) => {
  const MultiSelectRef = useRef(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
   useEffect(() => {
        const handleClickOutside = (event) => {
            if (!MultiSelectRef.current.contains(event.target)) {
                setIsOptionOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleOption = useCallback((option) => {
      const optionIndex = selectedOptions.findIndex(v => v.id === option.id);
      let newSelectedOptions;
      
      if (optionIndex === -1) {
        newSelectedOptions = [...selectedOptions, option];
        if(newSelectedOptions.length > 5) return
        setSelectedOptions(newSelectedOptions);
        } else {
        newSelectedOptions = [...selectedOptions];
        newSelectedOptions.splice(optionIndex, 1);
        setSelectedOptions(newSelectedOptions);
      }
      const filtered = newSelectedOptions.map((v) => {
        return v.value;
      })
      onChange(filtered.join('+'));
    },[selectedOptions, onChange])

    const clearSelection = () => {
        setSelectedOptions([]);
        onChange([]);
    }

  return (
    <div className={styles.multiSelect} ref={MultiSelectRef}>
      <div className={styles.header}>
        <div className={styles.chips}>
          {selectedOptions.length > 0 ? selectedOptions.map((option) => (
            <div key={option.id} className={styles.chip}>
              {option.text}
              <div
                className={styles.closeButton}
                onClick={() => toggleOption(option)}
              >
                X
              </div>
            </div>
          )) : <div className={ styles.statement } onClick={() => setIsOptionOpen(!isOptionOpen)}>
              Can select up to 5 languages.
          </div>}
        </div>
        <div className={ styles.buttonContainer}>
          {selectedOptions.length > 0 && (
            <div className={styles.clearButton} onClick={clearSelection}>
              <img src={closeSvg} width="24" alt="" />
            </div>
          )}
          <div className={styles.optionToggleBtn} onClick={() => setIsOptionOpen(!isOptionOpen)}>
            <img src={chevronSvg} width="24" className={`${isOptionOpen ? styles['option-toggle-btn-on'] : styles['option-toggle-btn-off']}`} alt=""/>
          </div>
        </div>
      </div>
      <hr/>
      <div className={styles.options}>
        {isOptionOpen && options.map((option) => (
          <div key={option.id} className={styles.option} onClick={() => toggleOption(option)}>
            <input
              type="checkbox"
              key={option.value}
              checked={selectedOptions.findIndex(v => v.id === option.id) !== -1}
              onChange={() => toggleOption(option)}
            />
            <div>
              {option.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiSelect