import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { setProducts } from "../../redux/action/productAction";
import { DialogTitle, DialogContent, DialogActions } from "./DialogItems";

const DRUG_DELETE = 1;
const DRUG_EDIT = 2;
const PRICE_EDIT = 4;
export const ADD_DRUG = 5;
const ADD_PRICE = 6;
export const CONTENT = {
  [DRUG_DELETE]: {
    content: "Are you sure you want to delete this Drug?",
    title: "Delete Drug",
  },
  [DRUG_EDIT]: {
    content: "",
    title: "Edit Drug",
  },

  [PRICE_EDIT]: {
    content: "",
    title: "Edit Price",
  },
  [ADD_DRUG]: {
    content: "",
    title: "Add New Drug",
  },
  [ADD_PRICE]: {
    content: "",
    title: "Add New Drug",
  },
};
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(undefined);
  const [mPrice, setMPrice] = useState("");
  const [mDrug, setMDrug] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState(undefined);
  const [selectedDrugId, setSelectedDrugId] = useState(undefined);
  const classes = useRowStyles();
  const prices = useSelector((state) => state.allProducts.prices);
  const drugs = useSelector((state) => state.allProducts.drugs);

  const handlePriceEdit = (id) => (e) => {
    e.preventDefault();
    setSelectedPriceId(id);
    setType(PRICE_EDIT);
    setOpenEdit(true);
  };

  const handleDrugEdit = (id) => (e) => {
    e.preventDefault();
    setSelectedDrugId(id);
    setType(DRUG_EDIT);
    setOpenEdit(true);
  };

  const handleDrugDelete = () => {
    const newDrugList = { ...drugs };
    delete newDrugList[selectedDrugId];
    dispatch(setProducts({ drugs: newDrugList, prices }));
  };

  const openDeleteDialogBox = (id) => (e) => {
    e.preventDefault();
    setSelectedDrugId(id);
    setOpenDelete(true);
    setType(DRUG_DELETE);
  };
  const closeEditDialog = () => {
    setOpenEdit(false);
  };

  const handleDrugNameChange = (e) => {
    e.preventDefault();
    setMDrug(e.target.value);
  };
  const handlePriceChange = (e) => {
    e.preventDefault();
    setMPrice(e.target.value);
  };
  const closeDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleSave = () => {
    const newDrugList = { ...drugs };
    const newPriceList = { ...prices };
    switch (type) {
      case PRICE_EDIT:
        newPriceList[selectedPriceId] = {
          ...prices[selectedPriceId],
          price: mPrice,
        };
        break;
      case DRUG_EDIT:
        newDrugList[selectedDrugId] = { ...drugs[selectedDrugId], name: mDrug };
        break;

      default:
    }
    dispatch(setProducts({ drugs: newDrugList, prices: newPriceList }));
    setOpenEdit(false);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleDrugEdit(row.id)}>
            <EditIcon fontSize="large" />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={openDeleteDialogBox(row.id)}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.prices?.map((id, position) => (
                    <TableRow key={`${prices[id].date}-${position}`}>
                      <TableCell component="th" scope="row">
                        {moment(prices[id].date).format("LLLL")}
                      </TableCell>
                      <TableCell align="right">{prices[id].price}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={handlePriceEdit(id)}>
                          <EditIcon fontSize="large" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <div>
        <Dialog
          onClose={closeEditDialog}
          aria-labelledby="customized-dialog-title"
          open={openEdit}
        >
          <DialogTitle id="customized-dialog-title" onClose={closeEditDialog}>
            {CONTENT[type]?.title}
          </DialogTitle>
          <DialogContent dividers>
            {type === DRUG_EDIT ? (
              <TextField
                type="text"
                onChange={handleDrugNameChange}
                value={mDrug || drugs[selectedDrugId]?.name}
              />
            ) : (
              <TextField
                type="number"
                onChange={handlePriceChange}
                value={mPrice || prices[selectedPriceId]?.price}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleSave} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={closeDeleteDialog}
          aria-labelledby="customized-dialog-title"
          open={openDelete}
        >
          <DialogTitle id="customized-dialog-title" onClose={closeDeleteDialog}>
            {CONTENT[type]?.title}
          </DialogTitle>
          <DialogContent dividers>
            Are you sure you want to delete {drugs[selectedDrugId]?.name}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDrugDelete} color="primary">
              Delete Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

export default Row;
