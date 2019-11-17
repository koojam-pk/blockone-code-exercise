/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { format } from './../../helper/formats';

import * as actions from '../../store/actions';

const columns = [
  { id: 'createdAt', label: 'Date', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 200 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 150,
    align: 'right',
    format: value => format(+value, 2),
  },
  { id: 'ccy', label: 'Currency', minWidth: 50 },
  { id: 'action', label: 'Action', minWidth: 70 },
];

function createData(item) {      
  return {
          createdAt: item.createdAt, 
          description: item.description, 
          amount: item.amount, 
          ccy: item.ccy, 
          action: item.action
        };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
  subtitle: {
    margin: '1rem 0'
  },
  detail: {
    margin: '1rem'
  }
});

const transactions = React.memo((props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState(null);

  useEffect(() => {
    if (props.accountId) {
      props.onTransactionsFetch(props.accountId);
    }
  }, [props.accountId]);

  useEffect(() => {
    if (props.transactions && props.transactions.length > 0) {
      const transactionRows = props.transactions.map(item => {
        return createData(item);
      });
      setRows(transactionRows);
    }
  }, [props.transactions]);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);
      
  return (
    <div className={classes.detail}>
    { rows ? 
      <div>
        <Typography variant="h5" className={classes.subtitle}>
          Transactions Detail</Typography>     
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map(column => {
                        const value = row[column.id];                                                                
                        return (
                          <TableCell key={column.id} align={column.align} style={{ textTransform: 'uppercase'}}>
                            {column.format && typeof +value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );                    
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      : null }
    </div>
  );
});

const mapStateToProps = state => (
  {
    transactions: state.transaction ? state.transaction.transactions : null
  }
);

const mapDispatchToProps = dispatch => {    
  return {
    onTransactionsFetch: (accountId) => dispatch(actions.fetchTransactions(accountId))
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(transactions);
