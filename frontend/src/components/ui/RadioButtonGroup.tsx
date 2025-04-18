import { FormControlLabel, Radio } from "@mui/material";

type communicationOptionsType = {
  value: string;
  label: string;
};
function RadioButtonGroup({
  options,
  checkedOption,
}: {
  options: communicationOptionsType[];
  checkedOption?: string;
}) {
  return options.map((cur: communicationOptionsType) => {
    return (
      <FormControlLabel
        value={cur.value}
        control={<Radio />}
        label={cur.label}
        checked={checkedOption === cur.value}
      />
    );
  });
}

export default RadioButtonGroup;
