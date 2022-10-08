import React, { Component } from 'react';
import './WaitingModerationList.css';
import '../Styles.css';
import '../Tag/Tag.css';

import StyledButton from '../Button/StyledButton.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TagInput from '../Tag/Tag.js';
 
const axios = require("axios");



class WaitingModerationList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            rows: []
        }
    }

    insertRecord(row){
        var index = -1;
        var newRows = this.state.rows;
        for(var x = 0; x < this.state.rows.length; x++){
            if(this.state.rows[x].id === row.id){
                index = x;
            }
        }
        newRows.splice(index, 1);
        this.sendRequest(row);
        this.setState({rows: newRows});
    }

    sendRequest(row){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5051/moderationList/insertArticle");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify(row);
        xhr.send(data);
    }

    componentDidMount() {
        axios
          .get('http://localhost:5051/moderationList/articlesList')
          .then(this.setState({isLoading: true, label: false}))
          .then(res => {
            this.setState({rows: res.data});
          })
          .then(this.setState({isLoading: false}))
          .catch(err => {
            console.log(err);
          })
      };

    render(){
        const {isLoading, rows, label} = this.state;
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
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Authors</TableCell>
                        <TableCell align="center">Journal</TableCell>
                        <TableCell align="center">Year Of Publication</TableCell>
                        <TableCell align="center">Volume</TableCell>
                        <TableCell align="center">Pages</TableCell>
                        <TableCell align="center">DOI</TableCell>
                        <TableCell align="center">SE practice</TableCell>
                        <TableCell align="center">Claims</TableCell>
                        <TableCell align="center">Result</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.title}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                            {row.title}
                            <TagInput name="Existed" />
                        </TableCell>
                        <TableCell align="center">{rednerAuthors(row.authors)}</TableCell>
                        <TableCell align="center">{row.journal}</TableCell>
                        <TableCell align="center">{row.yearOfPublication}</TableCell>
                        <TableCell align="center">{row.volume}</TableCell>
                        <TableCell align="center">{row.pages}</TableCell>
                        <TableCell align="center">{row.DOI}</TableCell>
                        <TableCell align="center">{row.SEpractice}</TableCell>
                        <TableCell align="center">{row.claims}</TableCell>
                        <TableCell align="center">
                            <StyledButton onClick={() => this.insertRecord(row)}>Approve</StyledButton>
                            <StyledButton onClick={() => this.insertRecord(row)}>Decline</StyledButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        )
    }
}

function rednerAuthors(authors){
    var output = "";
    for(let i = 0; i < authors.length - 2; i++){
        output += authors[i] + ", ";
    }
    output += authors[authors.length - 1];
    return output;
}

function returnTag(title){
    axios
    .get('http://localhost:5051/moderationList/checkExist/'+title)
    .then(res => {
        if(res.data){
            console.log(res.data);
            return <TagInput name="Existed"/>
        }
    })
}

export default WaitingModerationList;

