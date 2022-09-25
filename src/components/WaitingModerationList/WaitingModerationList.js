import React, { Component } from 'react';
import './WaitingModerationList.css';
import '../Styles.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
 
const axios = require("axios");


class WaitingModerationList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            rows: []
        }
    }

    componentDidMount() {
        axios
          .get('http://localhost:5001/ModerationList/Test')
          .then(this.setState({isLoading: true}))
          .then(res => {
            this.setState({rows: res.data.moderationList});
          })
          .then(this.setState({isLoading: false}))
          .catch(err => {
            console.log(err);
          })
      };

    render(){
        const {isLoading, rows} = this.state;
        if(isLoading){
            return(
                <div>It's just loading</div>
            )
        }


        return(
            <TableContainer className='table container'component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Authors</TableCell>
                        <TableCell align="right">Journal</TableCell>
                        <TableCell align="right">Year Of Publication</TableCell>
                        <TableCell align="right">Volume</TableCell>
                        <TableCell align="right">Pages</TableCell>
                        <TableCell align="right">DOI</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.title}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.title}
                        </TableCell>
                        <TableCell align="right">{row.authors}</TableCell>
                        <TableCell align="right">{row.journal}</TableCell>
                        <TableCell align="right">{row.yearOfPublication}</TableCell>
                        <TableCell align="right">{row.volume}</TableCell>
                        <TableCell align="right">{row.pages}</TableCell>
                        <TableCell align="right">{row.DOI}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        )
    }
}

export default WaitingModerationList;
