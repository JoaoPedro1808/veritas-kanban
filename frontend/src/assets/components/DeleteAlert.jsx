import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Tasks";
import "./DeleteAlert.css"

export default function CreateAlert({onConfirmDelete, onClose}) {
    const handleConfirm = () => {
        onConfirmDelete();
        onClose();
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <div className="overlay">
            <div className="container">
                <div className="header">
                    <h2>Comfirma</h2>
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>
                <div className="content">
                    <p>Certeza que deseja eliminar esta Tarefa?</p>
                    <p className="text">Esta ação não pode ser revertida.</p>
                </div>
                <div className="action">
                    <button type="button" className="cancel-btn" onClick={handleClose}>Cancelar</button>
                    <button type="button" className="confirm-btn" onClick={handleConfirm}>Excluir</button>
                </div>
            </div>
        </div>
    )
    
}