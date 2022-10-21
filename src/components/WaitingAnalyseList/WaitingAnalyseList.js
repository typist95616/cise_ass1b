import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../Styles.css';
import '../Tag/Tag.css';
import TagInput from '../Tag/Tag.js';
import { Button } from '@mui/material';

import axios from 'axios';
import { getValue } from '@testing-library/user-event/dist/utils';

class WaitingAnalyseList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            rows: []
        }
    }

    componentDidMount() {
        axios
            .get('https://csie-ass1b.herokuapp.com/getArticles')
            .then(this.setState({isLoading: true, label: false}))
            .then(res => {
                console.log(res)
            this.setState({rows: res.data});
            })
            .then(this.setState({isLoading: false}))
            .catch(err => {
            console.log(err);
            })
    };

    approveAnalyse(row){
        var index = -1;
        var newRows = this.state.rows;
        for(var i = 0; i < this.state.rows.length; i++){
            if(this.state.rows[i]._id === row._id){
                index = i;
            }
        }
        newRows.splice(index, 1);
        this.approveAnalyseRequest(row);
        this.setState({rows: newRows});
    }

    approveAnalyseRequest(row){
        let xhr = new XMLHttpRequest();
        var request = row;
        xhr.open("POST", "https://csie-ass1b.herokuapp.com/approveAnalyse");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        request.SEpractice = getPractice(request);
        request.claim = getClaim(request);
        let data = JSON.stringify(request);
        xhr.send(data);
        alert("Article Analyse Approved");
    }

    rejectAnalyse(row){
        console.log(row)
        var index = -1;
        var newRows = this.state.rows;
        for(var x = 0; x < this.state.rows.length; x++){
            if(this.state.rows[x]._id === row._id){
                index = x;
            }
        }
        newRows.splice(index, 1);
        this.rejectAnalyseRequest(row);
        this.setState({rows: newRows});
    }

    rejectAnalyseRequest(row){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://csie-ass1b.herokuapp.com/rejectAnalyse");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify(row);
        xhr.send(data);
        alert("Article Analyse Rejected");
    }

    render(){

        const {isLoading, rows, label} = this.state;
        return(
            <div>
                <TableContainer component={Paper} sx={{ width: 0.9, marginLeft: 9, marginRight: 9 }}>
                    <Table sx={{ maxWidth: 0.9 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Authors</TableCell>
                            <TableCell align="right">Journal</TableCell>
                            <TableCell align="right">Year Of Publication</TableCell>
                            <TableCell align="right">Volume</TableCell>
                            <TableCell align="right">Pages</TableCell>
                            <TableCell align="right">DOI</TableCell>
                            <TableCell align="right">SE Practice</TableCell>
                            <TableCell align="right">Claim</TableCell>
                            <TableCell align="right">Comment</TableCell>
                            <TableCell align="right">Analyse</TableCell>
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
                                <TableCell align="center">{row.authors}</TableCell>
                                <TableCell align="center">{row.journal}</TableCell>
                                <TableCell align="center">{row.yearOfPublication}</TableCell>
                                <TableCell align="center">{row.volume}</TableCell>
                                <TableCell align="center">{row.pages}</TableCell>
                                <TableCell align="center">{row.DOI}</TableCell>
                                <TableCell align="center">
                                    <select id={row._id}>
                                        <option> {row.SEpractice} </option>
                                        <option>TDD</option>
                                        <option>Mob Programming</option>
                                    </select>    
                                </TableCell>
                                <TableCell algin="center">
                                    <select id={row.claim}>
                                        <option> {row.claim} </option>
                                        <option>Agree Completely</option>
                                        <option>Strongly Agree</option>
                                        <option>Agree</option>
                                        <option>Disagree</option>
                                        <option>Strongly Disagree</option>
                                        <option>Disagree Completely</option>
                                    </select>
                                </TableCell>
                                <TableCell align="center">
                                    <input type="text"/>
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => this.approveAnalyse(row)}>Approve</Button>
                                    <Button onClick={() => this.rejectAnalyse(row)}>Decline</Button>
                                </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        )
    }
}

function getPractice(row){
    var selectElement = document.getElementById(row._id);
    var output = selectElement.options[selectElement.selectedIndex].value;
    return output;
}

function getClaim(row){
    var selectElement = document.getElementById(row.claim);
    var output = selectElement.option[selectElement.selectedIndex].value;
    return output;
}

export default WaitingAnalyseList;