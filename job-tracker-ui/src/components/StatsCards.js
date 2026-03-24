import React, {useState, useEffect} from "react";
import axios from 'axios';
import styles from './StatsCards.module.css';

const StatsCards = ({refreshTrigger}) => {
    const [stats, setStats] = useState({
        total:0,
        active:0,
        rejected:0,
        responseRate:0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/applications/stats');
                setStats(response.data);
            }
            catch(error){
                console.error('Error fetching stats', error);
            }
        };
        fetchStats();

    }, [refreshTrigger]);

    return(
        <div className={styles.statsContainer}>
            <div className={styles.card}>
                <span className={styles.title}>Applications</span>
                <span className={styles.number}>{stats.total}</span>
                <span className={styles.subtitle}>Total roles tracked</span>
            </div>

            <div className={styles.card}>
                <span className={styles.title}>Active pipeline</span>
                <span className={styles.number}>{stats.active}</span>
                <span className={styles.subtitle}>Applied, Interviewing or Offer</span>
            </div>

            <div className={styles.card}>
                <span className={styles.title}>Rejected</span>
                <span className={styles.number}>{stats.rejected}</span>
                <span className={styles.subtitle}>Rejections</span>
            </div>

            <div className={styles.card}>
                <span className={styles.title}>Response Rate</span>
                <span className={styles.number}>{stats.responseRate}</span>
                <span className={styles.subtitle}>Rough Engagement Signal</span>
            </div>


        </div>
    );
};

export default StatsCards;