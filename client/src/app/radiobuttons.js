import React from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import theme from "./theme";

const RadioButtonGroup = (props) => {
  return (
    <form>
    <FormControl sx={{ m: 2 }} variant="standard">
      <FormLabel style={{ color: theme.palette.primary.dark }}>
        Join Existing or Enter Room Name
      </FormLabel>
      <RadioGroup
        name="rooms"
        value={props.radioStatus}
        onChange={(e) => {
          props.setState({
            radioStatus: e.target.value,
            roomName: e.target.value,
            roomStatus: "",
          });
        }}
        style={{ textAlign: "center" }}
      >
        {props.rooms.map((room, idx) => {
          //using idx property since the list has to have unique identifiers
          return (
            <FormControlLabel
              key={idx}
              value={room}
              control={<Radio />}
              label={room}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  </form>
  );
};
export default RadioButtonGroup;
