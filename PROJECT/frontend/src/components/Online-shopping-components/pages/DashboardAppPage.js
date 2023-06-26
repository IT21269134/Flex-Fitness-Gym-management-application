// import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography } from '@mui/material';
// // components
// import Iconify from '../components/iconify';
// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';
// import { useNavigate } from 'react-router-dom';
// import { useContext, useEffect, useReducer, useRef } from 'react';
// import { Store } from '../Store';
// import axios from 'axios';

// // ----------------------------------------------------------------------

export default function DashboardAppPage() {
  return <div>hiii</div>;
}
// export default function DashboardAppPage() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const chartRef = useRef(null);
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case 'FETCH_REQUEST':
//         return { ...state, loading: true };
//       case 'FETCH_SUCCESS':
//         return {
//           ...state,
//           summary: action.payload,
//           loading: false,
//         };
//       case 'FETCH_FAIL':
//         return { ...state, loading: false, error: action.payload };
//       default:
//         return state;
//     }
//   };
//   const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
//     loading: true,
//     error: '',
//   });
//   const { state } = useContext(Store);
//   const { userInfo } = state;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get('/api/getallexpenses', {

//         });
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (err) {
//         dispatch({
//           type: 'FETCH_FAIL',
//           payload: getError(err),
//         });
//       }
//     };
//     fetchData();
//   }, [userInfo]);
//   const [open, setOpen] = useState(null);

//   const [page, setPage] = useState(0);

//   const [order, setOrder] = useState('asc');

//   const [selected, setSelected] = useState([]);

//   const [orderBy, setOrderBy] = useState('name');

//   const [filterExpense, setfilterExpense] = useState('');

//   const [rowsPerPage, setRowsPerPage] = useState(3);

//   const handleOpenMenu = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setOpen(null);
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = expenses.map((n) => n._id);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, expenseName) => {
//     const selectedIndex = selected.indexOf(expenseName);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, expenseName);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setfilterExpense(event.target.value);
//   };
//   return (
//     <div>

//       <Helmet>
//         <title> Dashboard | Minimal UI </title>
//       </Helmet>

//       <Container maxWidth="xl">
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Hi, Welcome back
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppWebsiteVisits
//               title="Website Visits"
//               subheader="(+43%) than last year"
//               chartLabels={[
//                 '01/01/2003',
//                 '02/01/2003',
//                 '03/01/2003',
//                 '04/01/2003',
//                 '05/01/2003',
//                 '06/01/2003',
//                 '07/01/2003',
//                 '08/01/2003',
//                 '09/01/2003',
//                 '10/01/2003',
//                 '11/01/2003',
//               ]}
//               chartData={[
//                 {
//                   name: 'Team A',
//                   type: 'column',
//                   fill: 'solid',
//                   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//                 },
//                 {
//                   name: 'Team B',
//                   type: 'area',
//                   fill: 'gradient',
//                   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//                 },
//                 {
//                   name: 'Team C',
//                   type: 'line',
//                   fill: 'solid',
//                   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentVisits
//               title="Current Visits"
//               chartData={[
//                 { label: 'America', value: 4344 },
//                 { label: 'Asia', value: 5435 },
//                 { label: 'Europe', value: 1443 },
//                 { label: 'Africa', value: 4443 },
//               ]}
//               chartColors={[
//                 theme.palette.primary.main,
//                 theme.palette.info.main,
//                 theme.palette.warning.main,
//                 theme.palette.error.main,
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppConversionRates
//               title="Conversion Rates"
//               subheader="(+43%) than last year"
//               chartData={[
//                 { label: 'Italy', value: 400 },
//                 { label: 'Japan', value: 430 },
//                 { label: 'China', value: 448 },
//                 { label: 'Canada', value: 470 },
//                 { label: 'France', value: 540 },
//                 { label: 'Germany', value: 580 },
//                 { label: 'South Korea', value: 690 },
//                 { label: 'Netherlands', value: 1100 },
//                 { label: 'United States', value: 1200 },
//                 { label: 'United Kingdom', value: 1380 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentSubject
//               title="Current Subject"
//               chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
//               chartData={[
//                 { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
//                 { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
//                 { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
//               ]}
//               chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 {
//                   name: 'FaceBook',
//                   value: 323234,
//                   icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
//                 },
//                 {
//                   name: 'Google',
//                   value: 341212,
//                   icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
//                 },
//                 {
//                   name: 'Linkedin',
//                   value: 411213,
//                   icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
//                 },
//                 {
//                   name: 'Twitter',
//                   value: 443232,
//                   icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//       </div>
//   );
// }
