import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import Cookies from "js-cookie";

export default function TransactionList({ transactions,fetchTransactions,setEditTransactions }) {
  const token=Cookies.get('token');
  async function remove(_id) {
    const token = Cookies.get("token");
    if (!window.confirm("Are you sure")) return;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transactions/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      fetchTransactions();
      window.alert("Deleted Successfully");
    }
  }

    const formatDate=(date)=>{
      return dayjs(date).format('DD-MMM-YYYY');
    }

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        List of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.desc}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <EditSharpIcon onClick={()=>{setEditTransactions(row)}} />
                  </IconButton>
                  <IconButton color="warning" aria-label="upload picture" component="label" onClick={()=>{remove(row._id)}}>
                  <DeleteSharpIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
