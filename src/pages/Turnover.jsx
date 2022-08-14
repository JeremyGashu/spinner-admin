// import { DashboardOutlined } from '@mui/icons-material'
import { SkipNext, SkipPrevious } from '@mui/icons-material'
import { Grid, IconButton, Select, Typography, FormControl, InputLabel, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { queryClient } from '..'
import FullPageLoading from '../components/FullPageLoading'
import { getTurnOver } from '../controllers/spinner_ticket'

const Turnover = () => {
    const [page, setPage] = useState(1)

    const [filter, setFilter] = React.useState('');
    const handleFilterChange = (event) => {
        setPage(1)
        setFilter(event.target.value);
    };

    const handleNextPage = () => {
        if (data.data && (data.last <= page)) return
        setPage(page + 1)
    }

    const handlePreviousPage = () => {
        if (page === 1) return
        setPage(page - 1)
    }
    const { data, isLoading } = useQuery(['turnover', filter], () => getTurnOver(filter))
    console.log(data)
    useEffect(() => {
        queryClient.invalidateQueries(['turnover'])
        return () => {
        }
    }, [filter])

    let columns = [
        {
            field: 'totalTickets',
            headerName: 'Total Tickets',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, }}>
                        <Typography sx={{ fontSize: 13 }}>{cellValue['row']['totalTicket']}</Typography>
                    </Box>

                )
            }
        },

        {
            field: 'confirmedStake',
            headerName: 'Confirmed Stake',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>{cellValue['row']['confirmedStake']}</Typography>

                )
            }
        },
        {
            field: 'paidOut',
            headerName: 'Paid Out',
            width: 100,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>{cellValue['row']['paidOut']}</Typography>

                )
            }
        },

        {
            field: 'paidOutInPercent',
            headerName: 'Paidout in %',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['paidOutInPercent'] || 0}`}</Typography>

                )
            }
        },

        {
            field: 'cashBalance',
            headerName: 'Cash Balance',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['cashBalance']}`}</Typography>

                )
            }
        },

        {
            field: 'cashBalanceInPercent',
            headerName: 'Cash Balance %',
            width: 180,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['cashBalanceInPercent'] || 0}`}</Typography>

                )
            }
        },

        {
            field: 'openWin',
            headerName: 'Open Win',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['openWin'] || 0}`}</Typography>

                )
            }
        },

        {
            field: 'openWinInPercent',
            headerName: 'Open Win %',
            width: 200,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['openWinInPercent'] || 0}`}</Typography>

                )
            }
        },
    ]

    return (

        <Box height={500} sx={{ fontSize: 12, p: 3 }}>
            {
                isLoading && <FullPageLoading />
            }
            {
                data && <>
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
                    <DataGrid
                        disableSelectionOnClick={true}
                        rows={[{ ...data, id: Math.random() }]}
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

export default Turnover