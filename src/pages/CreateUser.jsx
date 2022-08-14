import { Typography, Box, Grid, Button } from "@mui/material"

import { backgroundColor, dashboardColor1, mainColor } from "../themes/colors";
import { useForm } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
// import { getAllCompanies } from "../../controller/company";
// import { createUser } from "../../controller/user";
// import { ROLES } from "../../configs/roles";
// import { validatePhoneNumber } from "../../configs/phone_validator";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "..";
import { addCashier } from "../controllers/users";

const CreateUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    // const { data: companies } = useQuery('company', getAllCompanies)


    const navigate = useNavigate()

    const { mutate } = useMutation(addCashier, {
        onError: (error, variables, context) => {
            error.response.data && error.response.data.errors && error.response.data.errors.forEach(error => {
                // toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, })
            })
        },
        onSuccess: (data, variables, context) => {
            // toast('Added user successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/home')
            queryClient.invalidateQueries(['users'])
        },
    })

    const handleAddCashier = async (data) => {
        console.log({ ...data, type: 'CASHIER', active: true })
        mutate({ ...data, type: 'CASHIER', active: true })

    }

    const FontWeight = 600
    return (
        <>


            <Box sx={{ backgroundColor: backgroundColor, p: 4, borderRadius: 1 }}>
                <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1 }}>

                    <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                        Add Cashier
                    </Typography>
                    <Box marginY={2}>
                        <Box padding={2} marginX={2}>
                            <form autoComplete='false' onSubmit={handleSubmit(handleAddCashier)}>

                                <Box padding={2}>
                                    <Grid container justifyContent='space-between' alignItems='center'>
                                        <Grid item sm={12} lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Name</Typography>
                                            <input {...register('name', { required: true })} type="text" placeholder='Name'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.name && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter name.</Typography>}

                                        </Grid>
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Email</Typography>
                                            <input {...register('phone', { required: true })} type="tel" placeholder='Phone'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.email && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter Phone.</Typography>}

                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Username</Typography>
                                            <input {...register('username', { required: true })} type="text" placeholder='Username'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.username && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter username.</Typography>}

                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Password</Typography>
                                            <input {...register('password', { required: true })} type="password" placeholder='Password'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.password && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter password.</Typography>}

                                        </Grid>

                                        {/* <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Confirm Password</Typography>
                                            <input {...register('confirmPassword', { required: true })} type="password" placeholder='Confirm Password'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.confirmPassword && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter password.</Typography>}
                                        </Grid> */}

                                    </Grid>


                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                    <Button type='submit' variant="contained" size="large" sx={{ backgroundColor: dashboardColor1, marginLeft: 2 }}>
                                        Save
                                    </Button>
                                </Box>

                            </form>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </>)
}
export default CreateUser