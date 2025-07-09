import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Paginas/Tela2.css';

function Dashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const handleLogout = () => {
    navigate("/login");
  };

  // Fecha popup se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showProfile &&
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        event.target.id !== 'icon-profile'
      ) {
        setShowProfile(false);
      }
      if (
        showNotifications &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        event.target.id !== 'icon-notifications'
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile, showNotifications]);

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src="imagens/Sistema-Logo.png" alt="UERN inova" width="150" />
        <nav className="nav">
          <button onClick={() => navigate("/dashboard")}>Inicio</button>
          <button onClick={() => navigate("/propriedade-intelectual")}>Propriedade Intelectual</button>
          <button onClick={() => navigate("/autores")}>Autores</button>
          <button onClick={() => navigate("/pagamentos")}>Pagamentos</button>
          <button>Configurações</button>
        </nav>
        <img src="imagens/Inova-Rodape.png" alt="Rodapé" width="150" />
      </div>

      {/* Conteúdo principal */}
      <div className="main">
        <header className="topbar">
          <h2>Processos de Registro</h2>

          {/* Ícones no topo */}
          <div className="topbar-icons">
            <button
              id="icon-notifications"
              className="icon-button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (showProfile) setShowProfile(false);
              }}
              aria-label="Notificações"
            >
              🔔
            </button>
            <button
              id="icon-profile"
              className="icon-button"
              onClick={() => {
                setShowProfile(!showProfile);
                if (showNotifications) setShowNotifications(false);
              }}
              aria-label="Perfil"
            >
              👤
            </button>
          </div>
        </header>

        <div className="cards">
          <div className="card" style={{ backgroundColor: '#d0f1a8', color: 'black' }}>
            Ativos<br /><strong>70</strong>
          </div>
          <div className="card" style={{ backgroundColor: '#fef7a6', color: 'black' }}>
            Em processo<br /><strong>50</strong>
          </div>
          <div className="card" style={{ backgroundColor: '#ffb3b3', color: 'black' }}>
            Pendentes<br /><strong>0</strong>
          </div>
          <div className="card" style={{ backgroundColor: '#b7ddf4', color: 'black' }}>
            Total<br /><strong>120</strong>
          </div>
        </div>

        <div className="graficos">
          <div className="grafico">Indicadores<br /><div className="grafico-pizza"></div></div>
          <div className="grafico">Indicadores<br /><div className="grafico-barra"></div></div>
        </div>
      </div>

      {/* Popups flutuantes */}

      {/* Popup Perfil */}
      {showProfile && (
        <div ref={profileRef} className="popup perfil-popup">
          <div><span>👤</span> Administrador</div>
          <small>email@email.com</small>
          <button className="sair" onClick={handleLogout}>Sair</button>
        </div>
      )}

      {/* Popup Notificações */}
      {showNotifications && (
        <div ref={notificationsRef} className="popup notificacoes-popup">
          <div className="topo-notificacoes">
            <h4>🔔 Notificações</h4>
            <a href="#">Marcar todas como lidas</a>
          </div>
          <ul>
            <li className="nova">
              <strong>Prazo se aproximando</strong><br />
              O prazo para submissão do documento do PI 123456 vence em 3 dias.<br />
              <span>⏱️ Há 2 horas</span>
            </li>
            <li className="nova-pi">
              <strong>Nova PI cadastrada</strong><br />
              A patente Sistema de Reconhecimento Facial foi cadastrada com sucesso.<br />
              <span>🕒 Há 6 horas</span>
            </li>
            <li className="status">
              <strong>Status atualizado</strong><br />
              A PI cadastrada teve seu status alterado para "Em análise".<br />
              <span>📅 Há 1 dia</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
