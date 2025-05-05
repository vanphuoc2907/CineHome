import React, { useEffect, useState, useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    Box
} from '@mui/material';
import { getSubscriptionsByMonthAndYear } from '../../../services/playMovie';
import { COLORS } from '../../../utils/Constants';
import { ContextPlans } from '../../../context/PlanProvider';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { planName, subscriptionCount } = payload[0].payload;
        return (
            <Box sx={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: 1, borderRadius: 1 }}>
                <Typography color={payload[0].fill}>Gói: {planName}</Typography>
                <Typography>Số lượng: {subscriptionCount}</Typography>
            </Box>
        );
    }
    return null;
};

// Custom Legend Component
const CustomLegend = ({ payload }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', mt: 2 }}>
            {payload.map((entry, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', m: 1 }}>
                    <Box
                        sx={{
                            backgroundColor: entry.color,
                            borderRadius: '50%',
                            width: 12,
                            height: 12,
                            mr: 1
                        }}
                    />
                    <Typography variant="body2">Gói: {entry.payload.planName}</Typography>
                </Box>
            ))}
        </Box>
    );
};

const PlanSubscriptionChart = () => {
    const [data, setData] = useState([]);
    const plans = useContext(ContextPlans);
    const [listYear,setListYear] = useState([]);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    useEffect(() => {
        const fetchSubscriptions = async () => { 
            try {
                const subscriptions = await getSubscriptionsByMonthAndYear(selectedMonth, selectedYear);
                     console.log(subscriptions);
                     
                const result = plans.map(plan => ({
                    planId: plan.id,
                    planName: plan.title,
                    subscriptionCount: 0,
                }));         
                subscriptions.forEach(subscription => {
                    const planId = subscription.data.id_plan;
                    const planIndex = result.findIndex(r => r.planId === planId);
                    if (planIndex >= 0) {
                        result[planIndex].subscriptionCount++;
                    }
                });
                const filteredResult = result.filter(item => item.subscriptionCount > 0);         
                setData(filteredResult);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        };

        if (plans.length > 0) {
            fetchSubscriptions();
        }
    }, [selectedYear, selectedMonth, plans]);
   
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      years.push(i);
    } 
   setListYear(years);
  },[])
    const handleYearChange = (e) => setSelectedYear(e.target.value);
    const handleMonthChange = (e) => setSelectedMonth(e.target.value);

    return (
        <Card sx={{ padding: 2 }}>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h6">Số lượng người đăng ký theo gói</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Tháng</InputLabel>
                        <Select  value={selectedMonth} label="Tháng" onChange={handleMonthChange}>
                            {Array.from({ length: 12 }, (_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>Tháng {i + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Năm</InputLabel>
                        <Select value={selectedYear} label="Năm" onChange={handleYearChange}>
                            {listYear.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ planName, percent }) => `${planName}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="subscriptionCount"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PlanSubscriptionChart;