import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter, set} from 'lodash';

// import { sentenceCase } from 'change-case';
// import toast
import { ToastContainer, toast } from 'react-toastify';
// @mui
import { useTheme } from '@mui/material/styles';
import { NumericFormat } from 'react-number-format';
import LOGO from '../../../assets/images/Logo_big.png'

import { 
  Grid, 
  Container, 
  Typography,
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
  makeStyles,
  Backdrop,
  TextField,
  Box,
  InputAdornment,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputLabel,
  FormGroup, } from '@mui/material';
  import { DateRangePicker } from '@mui/lab';
  

import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import Iconify from '../components/iconify';
import {
  AppCurrentVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';

import { sentenceCase } from 'change-case';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'expenseName', label: 'Expense', alignRight: false },
  { id: 'expenseDes', label: 'Descrption', alignRight: false },
  { id: 'expenseAmount', label: 'Amount', alignRight: false },
  { id: 'expenseDate', label: 'Date', alignRight: false },
  { id: 'expenceStatus', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (expName) => expName.expenseName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



export default function DashboardAppPage() {

// -----------------------------------------------------------
  //add expense
  const [expenseName, setExpenseName] = useState('')
  const [expenseDes, setExpenseDes] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')

  const addNewExpense = async (e) =>{
    e.preventDefault()
    if(!expenseName || !expenseDes || !expenseAmount){
      return toast('Please fill all the fields!')
    }else if(expenseAmount < 0){
      return toast('Amount cannot be negative!')
    }else {
      const res = await fetch('http://localhost:4000/api/addexpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          expenseName,
          expenseDes,
          expenseAmount
        })
      })
      const data = await res.json()
      if(res.ok){
        toast('Expense Added Successfully!')
        setExpenses([...expenses, data])
        setbackdropOpen(false)
      }else{
        toast('Something went wrong!')
      }
      setExpenseName('')
      setExpenseDes('')
      setExpenseAmount('')
    }
    
  }



// -----------------------------------------------------------
  // get all expenses
  const [expenses, setExpenses] = useState([])
  useEffect(() => {
    const getExpenses = async () =>{
      const res = await fetch('http://localhost:4000/api/getallexpenses')
      const data = await res.json()

      if(res.ok){
        setExpenses(data)
      }
      
    }
    getExpenses()
  }, [])

// -----------------------------------------------------------
const deleteMSG = () => toast('Expense Deleted Successfully')
  // delete expense
  const deleteExpense = async (id) =>{
    const res = await fetch(`http://localhost:4000/api/deleteexpense/${id}`, {
      method: 'DELETE',
    })
    await res.json()
    const filteredExpenses = expenses.filter((expense) => expense._id !== id)
    if(res.ok){
      setOpen(null)
      deleteMSG()
      setExpenses(filteredExpenses)
    }
  }

// -----------------------------------------------------------

  //get ID
  const [id, setId] = useState('')

  console.log(id)
  // get single expense
  const [singleExpense, setSingleExpense] = useState([])
  const getSingleExpense = async (id) =>{
    const res = await fetch(`http://localhost:4000/api/getexpense/${id}`)
    const data = await res.json()
    setSingleExpense(data)
  }

// -----------------------------------------------------------
  // update expense
  const [upadateEXPForm, setupdateEXPForm] = useState({
    _id: '',
    expenseName: '',
    expenseDes: '',
    expenseAmount: '',
    expenceStatus: '',
  })
  const handleUpdateFieldChange = (e) =>{
    const {value, name} = e.target
    setupdateEXPForm({
      ...upadateEXPForm,
      [name]: value
    })
  }



  const toggleUpdateForm = () =>{
    setOpenUpdate(true)
    setOpen(null)
    
    setupdateEXPForm({ _id: singleExpense._id ,
      expenseName: singleExpense.expenseName, 
      expenseDes: singleExpense.expenseDes, 
      expenseAmount: singleExpense.expenseAmount, 
      expenceStatus: singleExpense.expenceStatus})
  }
  const UpdateExpense = async (e) =>{
    e.preventDefault()
    const {expenseName, expenseDes, expenseAmount} = upadateEXPForm
    const res = await axios.patch(`http://localhost:4000/api/updateexp/${upadateEXPForm._id}`, {
      expenseName,
      expenseDes,
      expenseAmount
    });
    
    res && setExpenses(expenses.map((expense) => expense._id === upadateEXPForm._id ? {...expense, expenseName, expenseDes, expenseAmount} : expense))
    toast('Expense Updated Successfully')
    setOpenUpdate(false)

  }

// -----------------------------------------------------------
  //change status
  const toggleStatus = () =>{
    setupdateEXPForm({ _id: singleExpense._id ,expenseName: singleExpense.expenseName, expenseDes: singleExpense.expenseDes, expenseAmount: singleExpense.expenseAmount})
    changeStatus()
  }
  const changeStatus = async () =>{
    const {expenceStatus} = upadateEXPForm
    
    const res = await axios.patch(`http://localhost:4000/api/updateexp/${upadateEXPForm._id}`, {
      expenceStatus: 'Paid'
    })
    res && setExpenses(expenses.map((expense) => expense._id === upadateEXPForm._id ? {...expense, expenceStatus} : expense))
    toast('Status Updated Successfully')

  }





// -----------------------------------------------------------
  //pdf generator
  const styles = StyleSheet.create({
    table: {
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCellHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: '#000',
      backgroundColor: '#f2f2f2',
      padding: 15,
      textAlign: 'center',
    },
    tableCell: {
      fontSize: 13,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: '#000',
      padding: 15,
      textAlign: 'center',
    },
  });


const ExpensesPDF = ({ expenses }) => (
  <Document>
    <Page>
      <Image src={LOGO} style={{width:500, marginLeft:50}}/>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Expense Name</Text>
          <Text style={styles.tableCellHeader}>Description</Text>
          <Text style={styles.tableCellHeader}>Amount</Text>
          <Text style={styles.tableCellHeader}>Date</Text>
          <Text style={styles.tableCellHeader}>Status</Text>
        </View>
        {expenses.map((expense) => (
          <View key={expense._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{expense.expenseName}</Text>
            <Text style={styles.tableCell}>{expense.expenseDes}</Text>
            <Text style={styles.tableCell}>${expense.expenseAmount}</Text>
            <Text style={styles.tableCell}>{new Date(expense.expenseDate).toDateString()}</Text>
            <Text style={styles.tableCell}>{expense.expenceStatus}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
  

// -----------------------------------------------------------
  // validation checker



  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterExpense, setfilterExpense] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleOpenMenu = (event, _id) => {
    setOpen(event.currentTarget);
    setId(_id)
    getSingleExpense(_id)
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = expenses.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, expenseName) => {
    const selectedIndex = selected.indexOf(expenseName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, expenseName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setfilterExpense(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenses.length) : 0;


  const filteredExpenses = applySortFilter(expenses, getComparator(order, orderBy), filterExpense);

  const isNotFound = !filteredExpenses.length && !!filterExpense;
  console.log(filteredExpenses)

  const theme = useTheme();
// -----------------------------------------------------------
  const [backdropOpen, setbackdropOpen] = useState(false);
  const [openUpadte, setOpenUpdate] = useState(false);
  const handleDate = (date) => {
    console.log(date)
  };

  const selelectRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0)
  

  return (
    <>
    <DateRangePicker ranges = {[selelectRange]} onChange={handleDate}/>
      
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Finance Dashboard
        </Typography>

        <Grid container spacing={4}>


          <Grid item xs={12} md={6} lg={10}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Expenses
                </Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => {setbackdropOpen(!backdropOpen)}}>
                  Add New Expense
                </Button>
              </Stack>

              <Card>
              <UserListToolbar numSelected={selected.length} filterName={filterExpense} onFilterName={handleFilterByName} />
                
                
                

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <ToastContainer/>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={expenses.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />

                      <Backdrop
        
                        open={backdropOpen}
                        onSubmit ={() => {
                          setbackdropOpen(false);
                        }}
                      >

                        <Box sx={{ display: 'flex', flexWrap: 'wrap',width: 400,height: 300, backgroundColor: 'white' }}>
                          <form onSubmit={addNewExpense}>

                            <FormControl  sx={{ m: 1,width:350 }}>
                              <InputLabel htmlFor="outlined-adornment-amount" >Expense Name</InputLabel>
                              <OutlinedInput
                                onChange={(e) => setExpenseName(e.target.value)} value={expenseName}
                                id="outlined-adornment-amount"
                                required
                                label="Expense Name"
                              />
                            </FormControl>

                            <FormControl  sx={{ m: 1 , width:350}}  required>
                              <InputLabel htmlFor="outlined-adornment-amount" >Descrption</InputLabel>
                              <OutlinedInput
                                onChange={(e) => setExpenseDes(e.target.value)} value={expenseDes}
                                id="outlined-adornment-amount"
                                
                                required
                                label="Description"
                              />
                            </FormControl>

                            <FormControl  sx={{ m: 1}}>
                              <InputLabel htmlFor="outlined-adornment-amount" >Amount</InputLabel>
                              <OutlinedInput
                              onChange={(e) => setExpenseAmount(e.target.value)} value={expenseAmount}
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                                
                                pattern="[0-9]*"
                                required
                              />
                            </FormControl>
                            
                           
                            <Button type='submit' variant="contained" sx={{marginLeft:11}} startIcon={<Iconify icon="eva:plus-fill" />}>
                              Add New Expense
                            </Button>
                            <br/>
                            <Button onClick ={() => {setbackdropOpen(false);}}  sx={{marginLeft:19 , marginTop:1, color:"red"}} >
                              Cancel
                            </Button>
                          </form>
                        </Box> 
                      </Backdrop>

                      <Backdrop
                          open={openUpadte}
                        >
                          <Box sx={{ display: 'flex', flexWrap: 'wrap',width: 400,height: 300, backgroundColor: 'white' }}>
                          <form onSubmit={UpdateExpense}>

                            <FormControl  sx={{ m: 1,width:350 }}>
                              <InputLabel htmlFor="outlined-adornment-amount" >Expense Name</InputLabel>
                              <OutlinedInput
                              onChange={handleUpdateFieldChange}
                              value={upadateEXPForm.expenseName}
                              name='expenseName'
                                id="outlined-adornment-amount"
                                required
                                
                              />
                            </FormControl>

                            <FormControl  sx={{ m: 1 , width:350}}  required>
                              <InputLabel htmlFor="outlined-adornment-amount" >Descrption</InputLabel>
                              <OutlinedInput
                                
                                id="outlined-adornment-amount"
                                value={upadateEXPForm.expenseDes}
                                onChange={handleUpdateFieldChange}
                                name='expenseDes'
                                required
                                label="Description"
                              />
                            </FormControl>

                            <FormControl  sx={{ m: 1}}>
                              <InputLabel htmlFor="outlined-adornment-amount" >Amount</InputLabel>
                              <OutlinedInput
                               
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                                onChange={handleUpdateFieldChange}
                                value={upadateEXPForm.expenseAmount}
                                name='expenseAmount'
                                pattern="[0-9]*"
                                required
                              />
                            </FormControl>
                            
                           
                            <Button type='submit' variant="contained" sx={{marginLeft:11}} startIcon={<Iconify icon="eva:plus-fill" />}>
                              Update Expense
                            </Button>
                            <br/>
                            <Button onClick ={() => {setOpenUpdate(false);}}  sx={{marginLeft:19 , marginTop:1, color:"red"}} >
                              Cancel
                            </Button>
                          </form>
                          </Box>
                      </Backdrop>
                      <TableBody>
                        {

                          filteredExpenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { _id, expenseName, expenseDes, expenseAmount, expenseDate, expenceStatus } = row;
                            const date = new Date(expenseDate);
                            const ExpenseSelected = selected.indexOf(_id) !== -1;
                            
                            

                            return (
                              <TableRow  hover key={_id} tabIndex={-1} role="checkbox" selected={ExpenseSelected}>
                                <TableCell padding="checkbox">
                                  <Checkbox checked={ExpenseSelected} onChange={(event) => handleClick(event, _id)} />
                                </TableCell>

                                <TableCell component="th" scope="row" padding="none">
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="subtitle2" noWrap>
                                      {expenseName}
                                    </Typography>
                                  </Stack>
                                </TableCell>

                                <TableCell align="left">{expenseDes}</TableCell>

                                <TableCell align="left">${expenseAmount}</TableCell>

                               <TableCell align="left">{date.toDateString()}</TableCell>

                                <TableCell align="left">
                                <Label color={(expenceStatus === 'Not paid' && 'error') || 'success'}>{sentenceCase(expenceStatus)}</Label>
                                </TableCell>

                                <TableCell align="right">
                                  <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event,_id)}>
                                    <Iconify icon={'eva:more-vertical-fill'} />
                                  </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                  <Popover
                                  open={Boolean(open)}
                                  anchorEl={open}
                                  onClose={handleCloseMenu}
                                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                  PaperProps={{
                                    sx: {
                                      p: 1,
                                      width: 140,
                                      '& .MuiMenuItem-root': {
                                        px: 1,
                                        typography: 'body2',
                                        borderRadius: 0.75,
                                      },
                                    },
                                  }}
                                >
                                  <MenuItem  onClick={() => toggleUpdateForm()}>
                                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                    Edit
                                  </MenuItem>

                                  <MenuItem sx={{ color: 'error.main' }}  onClick={() => deleteExpense(id)}>
                                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                                    Delete
                                  </MenuItem>

                                  <MenuItem onClick={() => toggleStatus()} >
                                    <Iconify icon={'mdi:contactless-payment-circle'} sx={{ mr: 2 }} />
                                    Pay Now
                                  </MenuItem>
                                </Popover>
                                </TableCell>
                                
                              </TableRow>
                              
                            );
                          })
                        }
                        
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      

                      {isNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              <Paper
                                sx={{
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="h6" paragraph>
                                  Not found
                                </Typography>

                                <Typography variant="body2">
                                  No results found for &nbsp;
                                  <strong>&quot;{filterExpense}&quot;</strong>.
                                  <br /> Try checking for typos or using complete words.
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={expenses.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Container>
            <PDFDownloadLink document={<ExpensesPDF expenses={filteredExpenses} />} fileName="expenses.pdf">
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
            

          </Grid>

 

          {/* <Grid item xs={12} md={6} lg={10}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  User
                </Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  New User
                </Button>
              </Stack>

              <Card>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={USERLIST.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { id, name, role, status, company, avatarUrl, isVerified } = row;
                          const selectedUser = selected.indexOf(name) !== -1;

                          return (
                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                              <TableCell padding="checkbox">
                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                              </TableCell>

                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={name} src={avatarUrl} />
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left">{company}</TableCell>

                              <TableCell align="left">{role}</TableCell>

                              <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                              <TableCell align="left">
                                <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                              </TableCell>

                              <TableCell align="right">
                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                  <Iconify icon={'eva:more-vertical-fill'} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>

                      {isNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              <Paper
                                sx={{
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="h6" paragraph>
                                  Not found
                                </Typography>

                                <Typography variant="body2">
                                  No results found for &nbsp;
                                  <strong>&quot;{filterName}&quot;</strong>.
                                  <br /> Try checking for typos or using complete words.
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={USERLIST.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Container>

            <Popover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 140,
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <MenuItem>
                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                Edit
              </MenuItem>

              <MenuItem sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
              </MenuItem>
            </Popover>

          </Grid> */}

          {/* //------------------------------------------------------------------------------------------- */}
                    {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid> */}

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid> */}

       

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

  
          {/* {
            expenses.map((row) => () => {
              const { _id, expenseName, expenseDes, expenseAmount, expenseDate, expenceStatus } = row;
              const totalExpenseAmount = expenses.reduce((total, expense) => total + expense.expenseAmount, 0);
              setTotalExpenseAmount(totalExpenseAmount)
              console.log(totalExpenseAmount);


              return(
                <>
                </>
              )
            })
          }
          <Grid item xs={12} md={6} lg={5}>
                <AppCurrentVisits
                  title="Current Visits"
                  chartData={[
                    { label: 'Savings', value: 4344 },
                    { label: 'Expenses', value: totalExpenseAmount },
                    { label: 'Orders', value: 1443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.warning.main,
                    // theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid> */}
          {/* <Grid item xs={12} md={6} lg={5}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'Savings', value: 4344 },
                { label: 'Expenses', value: 5435 },
                { label: 'Orders', value: 1443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.warning.main,
                // theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={1.5}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
