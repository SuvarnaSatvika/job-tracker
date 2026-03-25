import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from './Scratchpad.module.css';

const Scratchpad = ({selectedApp, onNotesSaved}) =>{
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (selectedApp){
            setNotes(selectedApp.notes || '');
        }
    }, [selectedApp]);

    const handleSave = async () => {
        if(!selectedApp) return;
        setIsSaving(true);

        try{
            const updatedApp = {...selectedApp, notes:notes};
            await axios.put(`http://localhost:8080/api/applications/${selectedApp.id}`, updatedApp);
            onNotesSaved();
        }
        catch(error){
            console.error("Error saving notes: ", error);
            alert("Failed to save notes");
        }
        finally{
            setIsSaving(false);
        }
    };
    if(!selectedApp){
        return(
            <div className={styles.scratchpadContainer}>
                <div className={styles.emptyState}>
                    <p>Select an application from the table <br/>below to view and edit notes</p>
                </div>
            </div>
        );
    }

    return(
        <div className={styles.scratchpadContainer}>
            <div className={styles.header}>
                <h3 className={styles.companyName}>{selectedApp.company}</h3>
            </div>
            <textarea className={styles.textArea} placeholder="Drop notes here..." value = {notes} onChange={(e) => setNotes(e.target.value)}
            />

            <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Notes'}
            </button>
        </div>
    );
};

export default Scratchpad;