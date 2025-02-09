import { useState, useEffect } from 'react'
import { Typography, Card, CardActionArea, CardActions, Grid2 as Grid, Stack, CardContent, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { API_BASE, BASE_PATH } from '../Const'


interface Experiment {
    id: string
    name: string
    status: string
    step: number
}


const Experiments = () => {
    const [experiments, setExperiments] = useState<Experiment[]>([])

    const getExperiments = async () => {
        const response = await fetch(`${API_BASE}/experiments`)
        const data = await response.json()
        console.log(data)
        setExperiments(data.data || [])
    }

    const deleteExperiment = async (id: string) => {
        await fetch(`${API_BASE}/experiments/${id}`, {
            method: 'DELETE'
        })

        getExperiments()
    }

    useEffect(() => {
        getExperiments();
    }, []);

    return (
        <Grid container spacing={2} p={4} >

            {/* TODO: make the grids same height (flex?) */}

            {experiments.map(experiment => (
                <Grid size={3} key={experiment.id}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="h4">{experiment.name}</Typography>
                            <Typography variant="body1">Status: {experiment.status}</Typography>
                            <Typography variant="body1">Step: {experiment.step}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant='contained' href={`${BASE_PATH}/wizard?id=${experiment.id}`}>Wizard</Button>
                            <Button size="small" variant='outlined' color="error" onClick={() => {deleteExperiment(experiment.id)}}>Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}

            <Grid size={3}>
                <Card>
                    <CardActionArea href={`${BASE_PATH}/new`}>
                        <Stack alignItems="center" justifyContent="center" spacing={2} p={4}>
                            <Add sx={{ width: 75, height: 75 }} />
                            <Typography variant="h4" textAlign="center">New Experiment</Typography>
                        </Stack>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Experiments
