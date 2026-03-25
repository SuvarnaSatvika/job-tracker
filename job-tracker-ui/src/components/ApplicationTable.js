import React, {useEffect, useState} from "react";
import axios from "axios";
import {Trash2, Edit2, Check, X} from 'lucide-react';
import styles from './ApplicationTable.module.css'

const ApplicationTable = ({refreshTrigger, onDataChange, onRowSelect}) => {
    const [applications, setApplications] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

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
        
        useEffect(() => {
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
                            <tr key = {app.id} onClick={() => onRowSelect(app)} style={{cursor:'pointer'}}>
                                {editingId === app.id ? (
                                    <>
                                        <td className={styles.td}>
                                            <input name = "company" value={editFormData.company} onChange={handleEditFormChange} className={styles.editInput} />
                                        </td>
                                        <td className={styles.td}>
                                            <input name="role" value={editFormData.role} onChange={handleEditFormChange} className={styles.editInput} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="date" name="appliedDate" value={editFormData.appliedDate} onChange={handleEditFormChange} className={styles.editInput} />
                                        </td>
                                        <td className={styles.td}>
                                            <select name="status" value={editFormData.status} onChange={handleEditFormChange} className={styles.editSelect}>
                                                <option value="Applied">Applied</option>
                                                <option value="Interviewing">Interviewing</option>
                                                <option value="Offer">Offer</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Ghosted">Ghosted</option>
                                            </select>
                                        </td>
                                        <td className={`${styles.td} ${styles.actionsCell}`}>
                                            <button onClick={handleSaveEdit} className={styles.actionBtn} title="Save"><Check size={18} color="#A04F2B" /></button>
                                            <button onClick={() => setEditingId(null)} className={styles.actionBtn} title="Cancel"><X size={18} /></button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                    <td className={styles.td}>{app.company}</td>
                                    <td className={styles.td}>{app.role}</td>
                                    <td className={styles.td}>{app.appliedDate}</td>
                                    <td className={`${styles.td} ${styles.statusCell}`}>{app.status}</td>
                                    <td className={`${styles.td} ${styles.actionsCell}`}>
                                        <button onClick={() => handleEditClick(app)} className={styles.actionBtn} title="Edit"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(app.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete"><Trash2 size={16} /></button>
                                    </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
    </div>
  );
};

export default ApplicationTable;