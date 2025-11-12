import React, { useState } from "react";
import "./CreateAlert.css"

export default function CreateAlert({onCreateTask, onClose}) {
    const [taskNome, setTaskNome] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskNome.trim() === "") {
            alert("Por favor insira um nome para a tarefa");
            return;
        }

        onCreateTask(taskNome.trim(), taskDescription.trim());

        setTaskNome("");
        setTaskDescription("");
        onClose();
    };

    const handleCancel = () => {
        setTaskNome("");
        setTaskDescription("");
        onClose();
    };

    return (
        <div className="alert-overlay">
            <div className="alert-container">
                <div className="alert-header">
                    <h2>Criar uma nova tarefa</h2>
                    <button className="close-btn" onClick={handleCancel}>×</button>
                </div>
                <form onSubmit={handleSubmit} className="alert-form">
                    <div className="form-group">
                        <label htmlFor="taskName">Nome da Tarefa</label>
                        <input
                            type="text"
                            id="taskName"
                            value={taskNome}
                            onChange={(e) => setTaskNome(e.target.value)}
                            placeholder="Digite o nome da tarefa"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDescription">Descrição(Opcional)</label>
                        <textarea
                            id="taskDescription"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Digite a descrição da tarefa"
                            rows="4"
                        />
                    </div>
                    <div className="alert-actions">
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                        <button type="submit" className="create-btn" onClick={handleSubmit} disabled={!taskNome.trim()}>Criar nova tarefa</button>
                    </div>
                </form>
            </div>
        </div>
    )
}