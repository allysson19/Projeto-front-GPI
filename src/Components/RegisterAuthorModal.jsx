import React, { useState } from 'react';
import './AuthorModal.css'; // O CSS compartilhado para os modais

export default function RegisterAuthorModal({ onClose, onRegisterSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bond, setBond] = useState(''); // Vínculo: Docente, Discente Graduação, Técnico, Discente Pós-Graduação
    const [department, setDepartment] = useState('');
    const [campus, setCampus] = useState('');
    const [university, setUniversity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para registrar o novo autor
        const newAuthorData = {
            name,
            email,
            bond,
            department,
            campus,
            university,
        };
        console.log("Novo autor cadastrado:", newAuthorData);
        // Aqui você faria a chamada API para o backend para cadastrar o autor

        // Supondo que o cadastro foi bem-sucedido:
        if (onRegisterSuccess) {
            onRegisterSuccess(newAuthorData); // Passa os dados do novo autor de volta (opcional)
        }
        onClose(); // Fecha o modal após o cadastro
        alert("Autor cadastrado com sucesso!"); // Feedback ao usuário
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-author">
                <div className="modal-header-author">
                    <h2>Cadastrar Novo Autor</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-subtitle">Informações do Autor</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome completo</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome completo"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@email.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Vínculo</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="bond"
                                    value="Docente"
                                    checked={bond === 'Docente'}
                                    onChange={(e) => setBond(e.target.value)}
                                    required
                                /> Docente
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="bond"
                                    value="Discente Graduação"
                                    checked={bond === 'Discente Graduação'}
                                    onChange={(e) => setBond(e.target.value)}
                                /> Discente Graduação
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="bond"
                                    value="Técnico"
                                    checked={bond === 'Técnico'}
                                    onChange={(e) => setBond(e.target.value)}
                                /> Técnico
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="bond"
                                    value="Discente Pós-Graduação"
                                    checked={bond === 'Discente Pós-Graduação'}
                                    onChange={(e) => setBond(e.target.value)}
                                /> Discente Pós-Graduação
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Departamento</label>
                        <input
                            type="text"
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="Ex.: Departamento de Informática"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="campus">Campus</label>
                        <input
                            type="text"
                            id="campus"
                            value={campus}
                            onChange={(e) => setCampus(e.target.value)}
                            placeholder="Campus"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="university">Universidade</label>
                        <input
                            type="text"
                            id="university"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            placeholder="Universidade"
                        />
                    </div>
                    <div className="modal-actions-author">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="save-button">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}