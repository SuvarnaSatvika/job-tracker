import React, {useState} from "react";
import ApplicationForm from './components/ApplicationForm';
import StatsCards from "./components/StatsCards";
import ApplicationTable from "./components/ApplicationTable";
import './App.css';

function App(){
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAppAdded = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return(
        <div className="app-container">
            <header className="header-section">
                <div className="header-text">
                    <div className="eyebrow-text">Job Tracker</div>
                    <h1 className="main-title">Stay on track for <br />every application</h1>
                    <p className="subtitle">Track company, role, date and status in one place.</p>
                </div>

                <div className="header-stats">
                    <StatsCards refreshTrigger={refreshKey} />
                </div>
            </header>

            <main className="content-grid">
                <ApplicationForm onAppAdded={handleAppAdded} />

                <div className="placeholder-box">
                    <div className="eyebrow-text">Trend Summary</div>
                    <h3>What the data says</h3>

                    <div className="placeholder-text">
                        Start adding applications to see personalized trend analysis
                    </div>

                    <div className="placeholder-text">
                        You will get summaries for rejection rate, pipeline health and monthly volume
                    </div>
                </div>
            </main>

            <section className="table-section">
                <ApplicationTable refreshTrigger={refreshKey} />
            </section>
        </div>
    );
};

export default App;