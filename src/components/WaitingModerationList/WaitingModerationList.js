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
 
import axios from 'axios';

class WaitingModerationList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            rows: []
        }
    }

    approvePaper(row){
        var index = -1;
        var newRows = this.state.rows;
        for(var x = 0; x < this.state.rows.length; x++){
            if(this.state.rows[x]._id === row._id){
                index = x;
            }
        }
        newRows.splice(index, 1);
        this.approvePaperRequest(row);
        this.setState({rows: newRows});
    }

    approvePaperRequest(row){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://csie-ass1b.herokuapp.com/moderationList/approveArticle");
        // xhr.open("POST", "http://localhost:5001/moderationList/approveArticle");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify(row);
        xhr.send(data);
        alert("Article Approved");
    }

    rejectPaper(row){
        var index = -1;
        var newRows = this.state.rows;
        for(var x = 0; x < this.state.rows.length; x++){
            if(this.state.rows[x]._id === row._id){
                index = x;
            }
        }
        newRows.splice(index, 1);
        this.rejectPaperRequest(row);
        this.setState({rows: newRows});
    }

    rejectPaperRequest(row){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://csie-ass1b.herokuapp.com/moderationList/rejectArticle");
        // xhr.open("POST", "http://localhost:5001/moderationList/rejectArticle");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify(row);
        xhr.send(data);
        alert("Article Rejected");
    }

    componentDidMount() {
        this.setState({isLoading:true});
        axios
          .get('https://csie-ass1b.herokuapp.com/moderationList/articlesList')
        //   .get('http://localhost:5001/moderationList/articlesList')
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
                        <TableCell align="center">Result</TableCell>
                    </TableRow>
                    </ TableHead>
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
                        <TableCell align="center">Result</TableCell>
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
                            {returnTag(row.activeExisted, "Duplicate record found in Active Database")}
                            {returnTag(row.rejectExisted, "Duplicated record found in Rejected Database")}
                            {returnTag(row.processExisted, "Duplicated record found in Process Database")}
                        </TableCell>
                        <TableCell align="center">{row.authors}</TableCell>
                        <TableCell align="center">{row.journal}</TableCell>
                        <TableCell align="center">{row.yearOfPublication}</TableCell>
                        <TableCell align="center">{row.volume}</TableCell>
                        <TableCell align="center">{row.pages}</TableCell>
                        <TableCell align="center">{row.DOI}</TableCell>
                        <TableCell align="center">{row.SEpractice}</TableCell>
                        <TableCell align="center">{row.claims}</TableCell>
                        <TableCell align="center">
                            <StyledButton onClick={() => this.approvePaper(row)}>Approve</StyledButton>
                            <StyledButton onClick={() => this.rejectPaper(row)}>Decline</StyledButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        )
    }
}

function returnTag(existed, text){
    if(existed){
        return <TagInput name = {text}/>
    }
}

export default WaitingModerationList;