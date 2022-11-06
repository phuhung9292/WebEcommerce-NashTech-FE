import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductService from "../../Services/ProductService";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function Variations() {
  const { id } = useParams();
  const [variationOption, setVariationOption] = useState([]);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await ProductService.getVariationOptionByVariationId(id).then((res) => {
        setVariationOption(res.data);
        setContent(res.data[0].tblVariationByVariationId.name);
        console.log(res);
      });
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1>{content}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variationOption.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.value}
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        aria-label="contacts"
      >
        {variationOption.map((item) => (
          <ListItem>
            <ListItemButton>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem>
          <ListItemButton />
        </ListItem>
      </List> */}
    </div>
  );
}

export default Variations;
