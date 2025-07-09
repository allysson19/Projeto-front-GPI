import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import RegisterAuthorModal from '../Components/RegisterAuthorModal';
import UpdateAuthorModal from '../Components/UpdateAuthorModal';
import './Autor.css';

export default function Autor() {
    const [termoBusca, setTermoBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const autoresPorPagina = 4;

    const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
    const [autorSelecionado, setAutorSelecionado] = useState(null);

    const [todosAutores, setTodosAutores] = useState([
        { id: '01', nome: 'Fulano de Tal', email: 'email@email.com', universidade: 'Universidade do Estado do Rio Grande do Norte', pisRegistradas: 2, vinculo: 'Docente', departamento: 'Departamento de Informática', campus: 'Mossoró', siglaUniversidade: 'UERN' },
        { id: '02', nome: 'Beltrano da Silva', email: 'beltrano@email.com', universidade: 'Universidade Federal Rural do Semi-Árido', pisRegistradas: 3, vinculo: 'Discente Graduação', departamento: 'Engenharia Civil', campus: 'Caraúbas', siglaUniversidade: 'UFERSA' },
        { id: '03', nome: 'Cicrano Santos', email: 'cicrano@email.com', universidade: 'Universidade Federal do Rio Grande do Norte', pisRegistradas: 4, vinculo: 'Técnico', departamento: 'Biblioteca Central', campus: 'Natal', siglaUniversidade: 'UFRN' },
        { id: '04', nome: 'Maria Oliveira', email: 'maria@email.com', universidade: 'Universidade do Estado do Rio Grande do Norte', pisRegistradas: 2, vinculo: 'Discente Pós-Graduação', departamento: 'Ciência da Computação', campus: 'Mossoró', siglaUniversidade: 'UERN' },
        { id: '05', nome: 'João Batista', email: 'joao@email.com', universidade: 'Instituto Federal do Rio Grande do Norte', pisRegistradas: 1, vinculo: 'Docente', departamento: 'Engenharia de Software', campus: 'Macau', siglaUniversidade: 'IFRN' },
        { id: '06', nome: 'Ana Costa', email: 'ana@email.com', universidade: 'Universidade do Estado do Rio Grande do Norte', pisRegistradas: 5, vinculo: 'Discente Graduação', departamento: 'Pedagogia', campus: 'Pau dos Ferros', siglaUniversidade: 'UERN' },
        { id: '07', nome: 'Pedro Souza', email: 'pedro@email.com', universidade: 'Universidade Federal Rural do Semi-Árido', pisRegistradas: 3, vinculo: 'Técnico', departamento: 'Contabilidade', campus: 'Mossoró', siglaUniversidade: 'UFERSA' },
        { id: '08', nome: 'Mariana Lima', email: 'mariana@email.com', universidade: 'Universidade Federal do Rio Grande do Norte', pisRegistradas: 2, vinculo: 'Docente', departamento: 'Artes', campus: 'Natal', siglaUniversidade: 'UFRN' },
        { id: '09', nome: 'Lucas Pereira', email: 'lucas@email.com', universidade: 'Universidade do Estado do Rio Grande do Norte', pisRegistradas: 6, vinculo: 'Discente Pós-Graduação', departamento: 'Química', campus: 'Assu', siglaUniversidade: 'UERN' },
        { id: '10', nome: 'Carla Nunes', email: 'carla@email.com', universidade: 'Instituto Federal do Rio Grande do Norte', pisRegistradas: 1, vinculo: 'Docente', departamento: 'Mecatrônica', campus: 'Apodi', siglaUniversidade: 'IFRN' },
    ]);

    const autoresFiltrados = todosAutores.filter(autor =>
        autor.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        autor.email.toLowerCase().includes(termoBusca.toLowerCase()) ||
        autor.universidade.toLowerCase().includes(termoBusca.toLowerCase())
    );

    const indiceUltimoAutor = paginaAtual * autoresPorPagina;
    const indicePrimeiroAutor = indiceUltimoAutor - autoresPorPagina;
    const autoresAtuais = autoresFiltrados.slice(indicePrimeiroAutor, indiceUltimoAutor);
    const totalPaginas = Math.ceil(autoresFiltrados.length / autoresPorPagina);

    const paginar = (numeroPagina) => setPaginaAtual(numeroPagina);

    const numerosPaginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        numerosPaginas.push(i);
    }

    const abrirModalCadastro = () => setMostrarModalCadastro(true);
    const fecharModalCadastro = () => setMostrarModalCadastro(false);

    const abrirModalEdicao = (autor) => {
        setAutorSelecionado(autor);
        setMostrarModalEdicao(true);
    };
    const fecharModalEdicao = () => setMostrarModalEdicao(false);

    const aoCadastrarSucesso = (novoAutor) => {
        const novoId = (parseInt(todosAutores[todosAutores.length - 1].id) + 1).toString().padStart(2, '0');
        setTodosAutores([...todosAutores, { ...novoAutor, id: novoId }]);
        setPaginaAtual(1);
    };

    const aoEditarSucesso = (autorEditado) => {
        setTodosAutores(todosAutores.map(autor =>
            autor.id === autorEditado.id ? autorEditado : autor
        ));
    };

    return (
        <div className="authors-container">
            <Sidebar />
            <div className="authors-content">
                <h1 className="authors-title">Autores</h1>

                <div className="authors-header">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar por nome, e-mail, universidade, etc."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                    <div className="header-buttons">
                        <button className="filter-button">
                            <span className="filter-icon">⚙️</span> Filtros
                        </button>
                        <button className="add-author-button" onClick={abrirModalCadastro}>
                            <span className="plus-icon">+</span> Cadastrar Autor
                        </button>
                    </div>
                </div>

                <div className="authors-table-wrapper">
                    <table className="authors-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Universidade</th>
                                <th>PIs Registradas</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {autoresAtuais.map(autor => (
                                <tr key={autor.id}>
                                    <td>{autor.id}</td>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                    <td>{autor.universidade}</td>
                                    <td>
                                        <span className="registered-pis-badge">
                                            {autor.pisRegistradas}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="edit-author-button" onClick={() => abrirModalEdicao(autor)}>
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="authors-pagination">
                    <span className="pagination-info">
                        Exibindo {indicePrimeiroAutor + 1} de {Math.min(indiceUltimoAutor, autoresFiltrados.length)} de {autoresFiltrados.length} autores
                    </span>
                    <div className="pagination-controls">
                        <button
                            onClick={() => paginar(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                            className="pagination-button"
                        >
                            Anterior
                        </button>
                        {numerosPaginas.map(numero => (
                            <button
                                key={numero}
                                onClick={() => paginar(numero)}
                                className={`pagination-button ${paginaAtual === numero ? 'active' : ''}`}
                            >
                                {numero}
                            </button>
                        ))}
                        <button
                            onClick={() => paginar(paginaAtual + 1)}
                            disabled={paginaAtual === totalPaginas}
                            className="pagination-button"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </div>

            {mostrarModalCadastro && (
                <RegisterAuthorModal
                    onClose={fecharModalCadastro}
                    onRegisterSuccess={aoCadastrarSucesso}
                />
            )}

            {mostrarModalEdicao && autorSelecionado && (
                <UpdateAuthorModal
                    onClose={fecharModalEdicao}
                    author={autorSelecionado}
                    onUpdateSuccess={aoEditarSucesso}
                />
            )}
        </div>
    );
}
