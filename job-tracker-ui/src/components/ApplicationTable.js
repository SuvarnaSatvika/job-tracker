import React, {useEffect, useState} from "react";
import axios from "axios";
import {Trash2, Edit2, Check, X} from 'lucide-react';
import styles from './ApplicationTable.module.css'

const ApplicationTable = ({refreshTrigger, onDataChange}) => {
    const [applications, setApplications] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        fetchApplications();

    }, [refreshTrigger]);

    useEffect(() => {
        const fetchApplications = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/applications');
                const sortedData = response.data.sort((a,b) => b.id - a.id);
                setApplications(sortedData)
            }
            catch(error){
                console.error('Error fetching applications: ', error);
            }
        };
        fetchApplications();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this application?")){
            try{
                await axios.delete(`http://localhost:8080/api/applications/${id}`);
                onDataChange();
            }
            catch(error){
                console.error("Error deleting: ", error);
            }
        }
    };

    const handleEditClick = (app) => {
        setEditingId(app.id);
        setEditFormData(app);
    };

    const handleEditFormChange = (e) => {
        setEditFormData({...editFormData, [e.target.name]: e.target.value});
    };

    const handleSaveEdit = async () => {
        try{
            await axios.put(`http://localhost:8080/api/applications/${editingId}`, editFormData);
            setEditingId(null);
            onDataChange();
        }
        catch(error){
            console.error("Error updating:", error);
        }
    };

    return(
        <div className={styles.tableContainer}>
            <div className={styles.eyebrow}>Applications</div>
            <h2 className={styles.title}>Manage your Jobs</h2>

            {applications.length === 0 ? (
                <div className={styles.emptyState}>
                    No applications yet. Add your first job to start tracking
                </div>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Company</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Applied Date</th>
                            <th className={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key = {app.id}>
                                <td className={styles.td}>{app.company}</td>
                                <td className={styles.td}>{app.role}</td>
                                <td className={styles.td}>{app.appliedDate}</td>
                                <td className={`${styles.td} ${styles.statusCell}`}>{app.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ApplicationTable;