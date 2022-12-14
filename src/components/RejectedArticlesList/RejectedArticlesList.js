import React, { Component } from 'react';
import './RejectedArticlesList.css';
import '../Styles.css';
import '../Tag/Tag.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
 
import axios from 'axios';

class RejectedArticlesList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            rows: []
        }
    }

    componentDidMount() {
        this.setState({isLoading:true});
        axios
          .get('rejectArticlesList/rejectedList')
          .then(res => {
            console.log(res.data)
            this.setState({rows: res.data})})
          .then(()=>{this.setState({isLoading: false})})
          .catch(err => {
            console.log(err);
          })
      };

    render(){
        const {isLoading, rows} = this.state;
        if(isLoading){
            return(
                <TableContainer className='table container'component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Authors</TableCell>
                        <TableCell align="center">Journal</TableCell>
                        <TableCell align="center">Year Of Publication</TableCell>
                        <TableCell align="center">Volume</TableCell>
                        <TableCell align="center">Pages</TableCell>
                        <TableCell align="center">DOI</TableCell>
                        <TableCell align="center">SE practice</TableCell>
                        <TableCell align="center">Claims</TableCell>
                        <TableCell align="center">Comment</TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                </TableContainer>
            )
        }


        return(
            <TableContainer className='table container'component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Authors</TableCell>
                        <TableCell align="center">Journal</TableCell>
                        <TableCell align="center">Year Of Publication</TableCell>
                        <TableCell align="center">Volume</TableCell>
                        <TableCell align="center">Pages</TableCell>
                        <TableCell align="center">DOI</TableCell>
                        <TableCell align="center">SE practice</TableCell>
                        <TableCell align="center">Claims</TableCell>
                        <TableCell align="center">Comment</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                            {row.title}
                        </TableCell>
                        <TableCell align="center">{row.authors}</TableCell>
                        <TableCell align="center">{row.journal}</TableCell>
                        <TableCell align="center">{row.yearOfPublication}</TableCell>
                        <TableCell align="center">{row.volume}</TableCell>
                        <TableCell align="center">{row.pages}</TableCell>
                        <TableCell align="center">{row.DOI}</TableCell>
                        <TableCell align="center">{row.SEpractice}</TableCell>
                        <TableCell align="center">{row.claims}</TableCell>
                        <TableCell align="center">{row.comment}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        )
    }
}


export default RejectedArticlesList;