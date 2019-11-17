/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';

import { addTransfer } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },  
  row: {
    display: 'flex'
  },
  rowWidth50: {
    flex: '1 1 49%'
  }
}));

const transferDialog = React.memo((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();  
  const [ account, setAccount ] = useState({});                 // cannot set to null
  const [ formattedAmount, setFormattedAmount ] = useState(''); // cannot set to null
  const [ toAccounts, setToAccounts ] = useState(null);
  const [ toAccountId, setToAccountId ] = useState('');         // cannot set to null
  const [ amount, setAmount ] = useState(null);
  const [ amountError, setAmountError] = useState(null);    
  const [ disable, setDisable] = useState(true);
  const [ toCcy, setToCcy] = useState('');
  const [ rate, setRate] = useState(1);
  const [ rateError, setRateError] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let accountOptions = [];
   
  useEffect(() => {
    if (props.selectedAccount) {
      setAccount(props.selectedAccount);
      if (JSON.stringify(props.selectedAccount) !== '{}') {
        setFormattedAmount(`${(+props.selectedAccount.amount).toLocaleString()} ${props.selectedAccount.ccy.toUpperCase()}`);
      }
    }
  }, [props.selectedAccount]);

  useEffect(() => {
    if(props.accounts && props.accounts.length > 0) {      
      const filterToAccounts = props.accounts.filter(item => item.id !== account.id);
      setToAccounts(filterToAccounts);     
    }
  }, [props.accounts, account]);

  useEffect(() => {
    if (amount > account.amount) {
      setAmountError('Insufficient funds');
    } else if (amount <= 0) {
      setAmountError('Amount transfer must be greater than 0');
    } else {
      setAmountError(null);
    }
  }, [account.amount, amount]);

  useEffect(() => {
    const _disable = (account.amount <= 0 || toAccountId === '' || rateError !== null || amountError !==null);
    setDisable(_disable);
  }, [account.amount, toAccountId, rate, amount, amountError, rateError]);

  if (toAccounts && toAccounts.length > 0) {
    for (let i=0; i<toAccounts.length; i++) {
      accountOptions.push(
        <MenuItem key={i} value={toAccounts[i].id}>{toAccounts[i].accountName}<small>&nbsp;({toAccounts[i].accountNumber})</small></MenuItem>
      );
    }
  }
  const handleToAccountChange = event => {
    setToAccountId(event.target.value);
    const selectedCcy = toAccounts.find(account => account.id === event.target.value).ccy;    
    setToCcy(selectedCcy);
  };

  const handleAmountChange = event => {    
    setAmount(+event.target.value);    
  };

  const handleRateChange = event => {
    if (+event.target.value > 0) {
      setRate(+event.target.value);    
      setRateError(null);
    } else {
      setRateError('Rate must not be less than 0');
    }
  }

  const handleSubmit = event => {
    dispatch(addTransfer({
      fromId: account.id,
      toId: toAccountId,
      ccy: account.ccy,      
      amount,
      ccyInForeign: toCcy,
      amountInForeign: amount * rate,
      rate
    }));
    props.onClose();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Fund Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form className={classes.container} noValidate autoComplete="disable">
            <div className={classes.row}>
              <TextField
                margin="normal"
                id="name"
                name="name"
                label="From"
                type="text"
                InputProps={{
                  readOnly: true,                  
                }}
                style={{ marginRight: 8 }}
                value={ account.accountName }
                helperText={'(' + account.accountNumber + ')'}
              />
              <TextField
                margin="normal"
                id="availableBalance"
                name="availableBalance"
                label="Available Balance"
                type="text"
                inputProps={{
                  readOnly: true,
                  "data-testid": "amount", name: "amount"
                }}
                value={ formattedAmount}
                helperText="Available Balance"
              />
            </div>
            <div className={classes.row}>
              <FormControl required className={classes.textField} fullWidth
                style={{ marginTop: 16 }}>
                <InputLabel>To</InputLabel>
                <Select value={toAccountId} onChange={handleToAccountChange} 
                  displayEmpty className={classes.selectEmpty} autoFocus
                  inputProps={{ "data-testid": "toAccountId", name: "toAccountId" }}
                  name="toAccountId" id="toAccountId">
                  {accountOptions}                  
                </Select>
                <FormHelperText>Account To Transfer</FormHelperText>
              </FormControl>
              
            </div>
            <div className={classes.row}>
              <TextField required
                  className={[classes.textField, classes.rowWidth50].join(' ')}
                  autoFocus
                  margin="normal"
                  style={{ marginRight: 8 }}
                  id="transferAmount"
                  name="transferAmount"
                  label="Amount To Transfer"
                  type="number"
                  defaultValue="0.00"
                  helperText={amountError ?
                    amountError : (amount * rate).toLocaleString() + ' ' + toCcy.toUpperCase()}
                  error={amountError!==null}
                  onChange={handleAmountChange}
                  inputProps={{ "data-testid": "transferAmount", name: "transferAmount" }}
                />
                <TextField disabled={toCcy === account.ccy || toCcy === ''}
                  className={[classes.textField, classes.rowWidth50].join(' ')}
                  autoFocus
                  margin="normal"
                  id="rate"
                  name="rate"
                  label="Exchange Rate"
                  type="number"
                  defaultValue="1.00"
                  helperText={rateError ? rateError : 'Exchange Rate'}
                  onChange={handleRateChange}
                  inputProps={{ "data-testid": "rate", name: "rate"  }}
                  error={rateError!==null}
                />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="button" onClick={props.onClose} color="primary" 
            data-testid="cancel" id="cancel">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}
            type="submit" disabled={disable} className="btn-transfer" id="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default connect(null, null)(transferDialog)
