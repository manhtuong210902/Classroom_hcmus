/* eslint-disable */
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './SpendingCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './EarningCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 className="text-center">DASHBOARD ADMIN</h1>
        </div>

    );
};

export default Dashboard;
