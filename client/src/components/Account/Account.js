/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TransferDialog from './TransferDialog/TransferDialog';
import { connect } from 'react-redux';
import { format } from './../../helper/formats';

import Transactions from '../Transactions/Transactions';
import * as actions from '../../store/actions';

import useIsomorphicLayoutEffect from './../../use-isomorphic-layout-effect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fabButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '2rem 2rem 2rem 0',
  },
  row: {
    display: 'flex'
  },
  rowWidth50: {
    flex: '1 1 49%'
  },
  accountNotSelected: {
    marginLeft: '0.5rem'
  }
}));

const account = (props) => {
  const classes = useStyles();
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('')
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState(null);
  const [open, setOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    props.onAccountsFetch();    
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (props.accounts && props.accounts.length >0) {
      setAccounts(props.accounts);
    }
  }, [props.accounts]);

  const accountOptions = useMemo(() => {
    return accounts.map((item, i) => {
      return <MenuItem key={i} value={item.id}>{item.accountName}<small>&nbsp;({item.accountNumber})</small></MenuItem>
    });    
  }, [accounts]);

  const handleChange = (event) => {
    setAccountId(event.target.value);
    const account = accounts.find(item => item.id === event.target.value);
    if (account) {
      setAccount(account);
      setAmount(`${format(+account.amount, 2)} ${account.ccy.toUpperCase()}`);           
    }
  };

  const handleTransferOpen = () => {
    setOpen(true);
  };

  const handleTransferClosed = () => {
    setOpen(false);
  }; 
   
  return (    
    <div className="container">      
      <div className={ classes.row}>
        <FormControl className={[classes.formControl, classes.rowWidth50].join(' ')}>
          <Select id="accountSelect" name="accountSelect" value={accountId} onChange={handleChange} 
            displayEmpty className={classes.selectEmpty} aria-labelledby="account"
            inputProps= {{ "data-testid": "accountSelect"}}>
            <MenuItem value={""} disabled>
              Account
            </MenuItem>
            {accountOptions}
          </Select>
          <FormHelperText>Account</FormHelperText>
        </FormControl>
        <TextField
            id="balance"
            className={[classes.textField, classes.rowWidth50].join(' ')}
            style={{ marginTop: 24, marginRight: 8 }}           
            margin="normal"
            InputProps={{
              readOnly: true,
              id: 'balance'
            }}
            value={amount}
            placeholder="Available Balance"
            helperText="Available Balance"
          />
        </div>
        { accountId === '' ? 
          <Typography variant="body1" className={classes.accountNotSelected} id="accountNotSelected">
            Account not selected
          </Typography>
          :
          <div>            
            <Transactions accountId={accountId} />
            <Fab size="small" color="primary" aria-label="add" className={classes.fabButton} 
              onClick={handleTransferOpen} disabled={accountId === ''}>
              <SyncAltIcon />
            </Fab>
            <TransferDialog selectedAccount={account} open={open} accounts={accounts}
              onClose={handleTransferClosed} />
          </div>
        }
    </div>
  );
};

const mapStateToProps = (state) => {  
  return {
    accounts: state.account ? state.account.accounts : null
  };
}

const mapDispatchToProps = (dispatch) => {  
  return {
    onAccountsFetch: () => dispatch(actions.fetchAccounts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(account);