import React, { useEffect, useState, useContext } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import {
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Box,
} from "@mui/material";
import { getSubscriptionsByMonthAndYear } from "../../../services/playMovie";
import { COLORS } from "../../../utils/Constants";
import { ContextPlans } from "../../../context/PlanProvider";
const exchangeRateToUSD = 0.000042;

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { planName, totalPriceUSD } = payload[0].payload;
        return (
            <Box
                sx={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    padding: 1,
                    borderRadius: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="body2" fontWeight="medium" color={payload[0].fill}>
                    Gói: {planName}
                </Typography>
                <Typography variant="body2">Total: ${totalPriceUSD.toFixed(2)}</Typography>
            </Box>
        );
    }
    return null;
};

// Custom Legend
const CustomLegend = ({ data }) => {
    if (!data || !data.length) return null;
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2}>
            {data.map((entry, index) => (
                <Box
                    key={`item-${index}`}
                    display="flex"
                    alignItems="center"
                    mr={2}
                    mb={1}
                >
                    <Box
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: COLORS[index % COLORS.length],
                            mr: 1,
                        }}
                    />
                    <Typography variant="body2">Gói: {entry.planName}</Typography>
                </Box>
            ))}
        </Box>
    );
};

const PlanSubscriptionBarChart = () => {
    const [data, setData] = useState([]);
    const plans = useContext(ContextPlans);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [listYear,setListYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const subscriptions = await getSubscriptionsByMonthAndYear(
                    selectedMonth,
                    selectedYear
                );

                const result = plans.map((plan) => ({
                    planId: plan.id,
                    planName: plan.title,
                    totalPrice: 0,
                    totalPriceUSD: 0,
                }));

                subscriptions.forEach((subscription) => {
                    const planId = subscription.data.id_plan;
                    const planIndex = result.findIndex((r) => r.planId === planId);
                    if (planIndex >= 0) {
                        result[planIndex].totalPrice += subscription.data.price;
                        result[planIndex].totalPriceUSD =
                            result[planIndex].totalPrice * exchangeRateToUSD;
                    }
                });

                const filteredResult = result.filter((item) => item.totalPriceUSD > 0);
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
    }, []);
    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <Card>
            <CardContent sx={{ padding: "8px" }}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    <Grid item xs={12} md={7}>
                        <Typography variant="h6">
                            Tổng tiền gói đăng ký (USD)
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Month</InputLabel>
                            <Select
                                value={selectedMonth}
                                label="Month"
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            >
                                {monthOptions.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        Tháng {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Year</InputLabel>
                            <Select
                                value={selectedYear}
                                label="Year"
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                            >
                                {listYear.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey="planName" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend data={data} />} />
                        <Bar dataKey="totalPriceUSD">
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default PlanSubscriptionBarChart;