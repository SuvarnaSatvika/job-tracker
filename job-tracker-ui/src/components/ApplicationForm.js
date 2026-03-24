import React, {useState} from "react";
import axios from 'axios';
import styles from './ApplicationForm.module.css';

const ApplicationForm = ({onAppAdded}) => {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        appliedDate: '',
        status: 'Applied'
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post('http://localhost:8080/api/applications', formData);
            alert("Application Added");
            onAppAdded();
        }
        catch(error){
            console.error("Error saving application", error);
        }
    };

    return(
        <div className={styles.formContainer}>
            <p className={styles.entryLabel}>New Entry</p>
            <h2 className={styles.mainHeading}>Add an application</h2>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
                {/* Company */}
                <div className={styles.inputGroup}>
                    <label htmlFor="company" className={styles.inputLabel}>Company</label>
                    <input 
                        type = "text"
                        id = "company"
                        name = "company"
                        value = {formData.company}
                        placeholder = "Amazon"
                        onChange={handleChange}
                        className={styles.inputField}
                        required
                    />
                </div>

                {/* Role */}
                <div className={styles.inputGroup}>
                    <label htmlFor="role" className={styles.inputLabel}>Role</label>
                    <input 
                        type = "text"
                        id = "role"
                        name = "role"
                        value = {formData.role}
                        placeholder = "Software Engineer Intern"
                        onChange={handleChange}
                        className={styles.inputField}
                        required
                    />
                </div>

                {/* Applied date */}
                <div className={styles.inputGroup}>
                    <label htmlFor="appliedDate" className={styles.inputLabel}>Applied Date</label>
                    <input 
                        type = "date"
                        id = "appliedDate"
                        name = "appliedDate"
                        value = {formData.appliedDate}
                        onChange={handleChange}
                        className={styles.inputField}
                        required
                    />
                </div>

                {/* Status */}
                <div className={styles.inputGroup}>
                    <label htmlFor="status" className={styles.inputLabel}>Status</label>
                    <select 
                        id = "status"
                        name = "status"
                        value = {formData.status}
                        onChange={handleChange}
                        className={styles.inputField}
                        required
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Ghosted">Ghosted</option>
                    </select>
                </div>

                <div className={styles.submitGroup}>
                    <button type="submit" className={styles.saveButton}>Save Application</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;