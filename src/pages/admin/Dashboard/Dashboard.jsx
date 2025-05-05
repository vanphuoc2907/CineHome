import React from 'react';
import { Grid } from '@mui/material';
import PlanSubscriptionChart from './PlanSubscriptionChart';
import PlanSubscriptionBarChart from './PlanSubscriptionBarChart';

function Dashboard(props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <PlanSubscriptionChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <PlanSubscriptionBarChart />
            </Grid>
        </Grid>
    );
}

export default Dashboard;