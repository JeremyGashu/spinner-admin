// import { DashboardOutlined } from '@mui/icons-material'
import { Delete, } from '@mui/icons-material'
import { IconButton, Typography, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '..'
import FullPageLoading from '../components/FullPageLoading'
import { deleteUser, getAllUsers } from '../controllers/users'
import { mainColor } from '../themes/colors'

const CashiersPage = () => {

    const { data, isLoading } = useQuery(['users'], () => getAllUsers())
    const [id, setId] = useState('')
    const navigate = useNavigate()
    console.log(data)

    const [open, setOpen] = useState(false);
    const handleClickOpen = (id) => {
        setId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { mutate } = useMutation(deleteUser, {
        onError: (error, variables, context) => {
            console.log(error)
            console.log(variables)
            console.log(context)
        },
        onSuccess: (data, variables, context) => {
            // toast('Deleted company successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            // navigate('/technical-admin')
            queryClient.invalidateQueries(['users'])


        },
    })


    let columns = [
        {
            field: 'id',
            headerName: 'User ID',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, cursor: 'pointer' }}>{cellValue['row']['id']}</Typography>

                )
            }
        },

        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 170,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['createdAt']).toLocaleDateString()} at ${new Date(cellValue['row']['createdAt']).toLocaleTimeString()}`}</Typography>

                )
            }
        },


        {
            field: 'name',
            headerName: 'Name',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, }}>
                        <Typography sx={{ fontSize: 13 }}>{cellValue['row']['name']}</Typography>
                    </Box>

                )
            }
        },


        {
            field: 'phone',
            headerName: 'Phone',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['phone']}</Typography>

                )
            }
        },

        {
            field: 'username',
            headerName: 'Username',
            width: 130,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['username']}</Typography>
                )
            }
        },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (cellValue) => {

                return (
                    <Tooltip title='Delete'>
                        <IconButton onClick={() => {
                            handleClickOpen(cellValue.id)
                        }}>
                            <Delete sx={{ fontSize: 13, color: 'red' }} />
                        </IconButton>
                    </Tooltip>
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

                    <Button onClick={() => {
                        navigate('create-user')
                    }} sx={{
                        borderRadius: 1, backgroundColor: mainColor, color: 'white', fontWeight: 'bold', mb: 3, '&:hover': {
                            backgroundColor: mainColor
                        }
                    }}>
                        Add Cashier
                    </Button>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Delete?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete user?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{ color: 'black' }} onClick={handleClose}>Cancel</Button>
                            <Button sx={{
                                backgroundColor: 'red', color: 'white', '&:hover': {
                                    backgroundColor: 'red'
                                }
                            }} onClick={() => {
                                mutate(id)
                                handleClose()
                            }} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <DataGrid
                        disableSelectionOnClick={true}
                        rows={(data && data.filter(user => user.type === 'CASHIER')) || []}
                        columns={columns}
                        // pagination={false}
                        // hideFooterPagination={true}
                        pageSize={6}
                        rowsPerPageOptions={[10]}
                        disableColumnSelector
                    />
                </>
            }


        </Box>
    )
}

export default CashiersPage