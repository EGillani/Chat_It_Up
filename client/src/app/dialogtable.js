import { ThemeProvider } from "@mui/material/styles";
import React, {  Fragment } from "react";
import theme from "./theme";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import "./App.css"; 
const DialogTable = (props) => {
  let users = props.users;

  const tableStyle = {
    border: "none",
    boxShadow: "none",
    borderStyle: "none",
    borderWidth: "0px"
  };
  
  return (
    <ThemeProvider theme={theme}>
    <TableContainer component={Paper} sx={{ maxHeight: 400}}>
    <Table stickyHeader sx={{ minWidth: 150, tableStyle}} aria-label="sticky table">
      <TableBody>
        {users?.map((item, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row" color="text.primary" style={{border: "none" }}>
            <PersonIcon style={{color: item.colour}}></PersonIcon>
            </TableCell>
            <TableCell align="inherit" style={{border: "none" }}>
              <Fragment>
                <Typography
                  sx={{ display: "block" }}
                  component="span"
                  variant="body2"
                  color={theme.palette.text.secondary}
                  style={{fontWeight: "bold"}}
                >
                 {item.chatName} is in room {item.roomName}
                </Typography>
              </Fragment>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </ThemeProvider>
  );
};
export default DialogTable;
