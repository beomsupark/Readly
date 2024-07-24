const CustomRadioButton = ({ options, selectedOption, onChange }) => {
  return (
    <div className="radio-inputs">
      {options.map((option) => (
        <label className="radio" key={option}>
          <input 
            type="radio" 
            name="radio" 
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
          />
          <span className="name">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadioButton;