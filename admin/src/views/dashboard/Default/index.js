/* eslint-disable */
import { useEffect, useState } from 'react';

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
