import React, { useState, useMemo } from "react";
import { useTable } from 'react-table';
import './Table.css';


const Table = ({columns, data}) => {
  //const tableColumns = useMemo(() => columns, []);
  const tableData = useMemo(() => data, []);

  const tableInstance = useTable({
    columns: columns, data: data
  });

  console.log(data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups?.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      headerGroups?.headers?.map(column => (
                        <th {...column.getHeaderGroupProps()}>{column.render('Header')}</th>
                      ))}
                  </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows?.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {
                        row?.cells?.map((cell) => {
                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                  )})}
            </tbody>
          </table>
        </div>
  )
}

export default Table;
