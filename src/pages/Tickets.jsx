// import { DashboardOutlined } from '@mui/icons-material'
import { SkipNext, SkipPrevious } from '@mui/icons-material'
import { Grid, IconButton, Select, Typography, FormControl, InputLabel, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { queryClient } from '..'
import FullPageLoading from '../components/FullPageLoading'
import { getAllTickets } from '../controllers/spinner_ticket'
import { getAllUsers } from '../controllers/users'

const Tickets = () => {
    const [page, setPage] = useState(1)
    const { data: usersData } = useQuery(['users'], () => getAllUsers())
    const [user, setUser] = useState('')
    console.log(usersData)

    const [filter, setFilter] = React.useState('');
    const handleFilterChange = (event) => {
        setPage(1)
        setFilter(event.target.value);
    };

    const handleUserChange = (event) => {
        // setPage(1)
        // setFilter(event.target.value);
        setUser(event.target.value)
    };

    const limit = 20

    const padNumbers = (num, size) => {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    const handleNextPage = () => {
        if (data.data && (data.last <= page)) return
        setPage(page + 1)
    }

    const handlePreviousPage = () => {
        if (page === 1) return
        setPage(page - 1)
    }

    const getBackgroudColorFromStatus = (status) => {
        switch (status && status.toUpperCase()) {
            case 'LOST':
                return '#F62459'

            case 'WON':
                return '#5B8930'

            case 'PAID':
                return '#26C281'

            default:
                return '#FFB61E'
        }
    }

    const { data, isLoading } = useQuery(['tickets', page, limit, filter], () => getAllTickets(page, limit, filter))
    console.log(isLoading)
    useEffect(() => {
        queryClient.invalidateQueries(['tickets'])
        return () => {
        }
    }, [page])

    let columns = [


        {
            field: 'id',
            headerName: 'Ticket ID',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, cursor: 'pointer' }}>{padNumbers(cellValue['row']['id'], 9)}</Typography>

                )
            }
        },

        {
            field: 'createdAt',
            headerName: 'Printed At',
            width: 170,
            renderCell: (cellValue) => {
                // let a = new Date()
                // a.toLocaleTimeString
                // a.toLocaleString
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['createdAt']).toLocaleDateString()} at ${new Date(cellValue['row']['createdAt']).toLocaleTimeString()}`}</Typography>

                )
            }
        },


        {
            field: 'Game',
            headerName: 'Game',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, }}>
                        <Typography sx={{ fontSize: 13 }}>Spin 2 Win</Typography>
                    </Box>

                )
            }
        },

        {
            field: 'Cashier',
            headerName: 'Cashier',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, }}>
                        <Typography sx={{ fontSize: 13 }}>{cellValue['row']['cashier']}</Typography>
                    </Box>

                )
            }
        },


        {
            field: 'stake',
            headerName: 'Stake',
            width: 80,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>{cellValue['row']['money']}</Typography>

                )
            }
        },

        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ borderRadius: 1.2, fontSize: 13, px: 2, py: 0.5, backgroundColor: getBackgroudColorFromStatus(cellValue['row']['status']), color: 'white', fontWeight: 'bold' }}>{cellValue['row']['status'] || 'Open'}</Typography>

                )
            }
        },

        {
            field: 'won',
            headerName: 'Won',
            width: 80,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>{cellValue['row']['payable']}</Typography>

                )
            }
        },

        {
            field: 'Is Test',
            headerName: 'Is Test',
            width: 100,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['isTest'] || false}`}</Typography>

                )
            }
        },


        // {
        //     field: 'createdAt',
        //     headerName: 'Printed At',
        //     width: 240,
        //     renderCell: (cellValue) => {
        //         let a = new Date()
        // a.toLocaleTimeString
        // a.toLocaleString
        //         return (
        //             <Typography sx={{ fontSize: 13, }}>{cellValue['row']['createdAt']}</Typography>

        //         )
        //     }
        // },
    ]

    return (

        <Box height={500} sx={{ fontSize: 12, p: 3 }}>
            {
                isLoading && <FullPageLoading />
            }
            {
                (data && data.data) && <>
                    <FormControl sx={{ m: 1, minWidth: 120, mb: 2 }} size="small">
                        <InputLabel id="demo-select-small">Filter</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={filter}
                            label="Age"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'today'}>Today</MenuItem>
                            <MenuItem value={'yesterday'}>Yesterday</MenuItem>
                            <MenuItem value={'this_week'}>This Week</MenuItem>
                            <MenuItem value={'last_week'}>Last Week</MenuItem>
                            <MenuItem value={'this_month'}>This Month</MenuItem>
                            <MenuItem value={'last_month'}>Last Month</MenuItem>
                            <MenuItem value={'this_year'}>This Year</MenuItem>
                            <MenuItem value={'last_year'}>Last Year</MenuItem>
                        </Select>


                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120, mb: 2 }} size="small">
                        <InputLabel id="demo-select-small">User</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={user}
                            label="Age"
                            onChange={handleUserChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                usersData && usersData.filter(u => u.type === 'CASHIER').map(user => {
                                    return <MenuItem value={user.name}>{user.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>


                    <DataGrid
                        disableSelectionOnClick={true}
                        rows={(data.data && user === '' ? data.data : data.data.filter(t => t.cashier === user)) || []}
                        columns={columns}
                        // pagination={false}
                        hideFooterPagination={true}
                        // pageSize={5}
                        rowsPerPageOptions={[10]}
                        disableColumnSelector
                    />

                    <Grid container direction='row' alignItems='center' justifyContent='flex-end'>
                        <Grid item>
                            <IconButton onClick={handlePreviousPage}>
                                <SkipPrevious sx={{ color: page !== 1 ? 'black' : '#4444' }} />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Typography sx={{ fontSize: 13, fontWeight: 'bold', mx: 1 }}>{page} - {data.last}</Typography>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={handleNextPage}>
                                <SkipNext sx={{ color: page < data.last ? 'black' : '#4444' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </>
            }


        </Box>
    )
}

export default Tickets