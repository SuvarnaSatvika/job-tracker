import React, {useState} from "react";
import ApplicationForm from './components/ApplicationForm';
import StatsCards from "./components/StatsCards";
import ApplicationTable from "./components/ApplicationTable";
import './App.css';
import Scratchpad from "./components/Scratchpad";

function App(){
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedApp, setSelectedApp] = useState(null);

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

                <Scratchpad selectedApp={selectedApp} onNotesSaved={handleAppAdded}
                />
            </main>

            <section className="table-section">
                <ApplicationTable refreshTrigger={refreshKey} onDataChange={handleAppAdded} onRowSelect={setSelectedApp} />
            </section>
        </div>
    );
};

export default App;