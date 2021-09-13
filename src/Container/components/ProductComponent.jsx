import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { v4 } from "uuid";
import Row from "./Row";
import { setProducts } from "../../redux/action/productAction";
import { DialogTitle, DialogContent, DialogActions } from "./DialogItems";

function createData(id, name, prices) {
  return {
    id,
    name,
    prices,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      background: "blue",
    },
  },
}));

export default function CollapsibleTable() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const drugs = useSelector((state) => state.allProducts.drugs);
  const prices = useSelector((state) => state.allProducts.prices);
  const openAddDrugForm = () => {
    setOpen(true);
  };
  const handleValueChange = (e) => {
    e.preventDefault();
    const text = e.target.value;
    setValue(text);
  };

  const addDrugItem = () => {
    const id = v4();
    const newDrugList = { ...drugs, [id]: { id, name: value, prices: [] } };
    dispatch(setProducts({ drugs: newDrugList, prices }));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const rows = drugs
    ? Object.values(drugs).map((drug) => {
        const { id, name, prices } = drug;
        return createData(id, name, prices);
      })
    : [];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Drug</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      <div className={classes.root}>
        <Fab onClick={openAddDrugForm}>
          <AddIcon />
        </Fab>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Add Drug
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              type="text"
              name="drug"
              value={value}
              onChange={handleValueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={addDrugItem} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </TableContainer>
  );
}
