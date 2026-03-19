document.addEventListener('DOMContentLoaded', () => {
    
    //variáveis Globais Comuns
    const body = document.getElementById('body');
    const ModalSaida = document.getElementById('ModalSaida');
    const LinkSaida = document.getElementById('LinkSaida');
    const STORAGE_KEY_THEME = 'flowpoint_theme';

    // Lógica de Confirmação de Saída (Comum a todas as páginas)
    if (LinkSaida) {
        LinkSaida.addEventListener('click', (e) => {
            e.preventDefault();
            if (ModalSaida) {
                ModalSaida.style.display = 'flex';
                ModalSaida.style.alignItems = 'center';
                ModalSaida.style.justifyContent = 'center';
            } else {
                console.error("Modal de logout não encontrado.");
                confirmarSaida(); 
            }
        });
    }

    // Fechar o modal
    window.fecharModalSaida = function() {
        if (ModalSaida) {
            ModalSaida.style.display = 'none';
        }
    }

    // Confirma a saída e redireciona
    window.confirmarSaida = function() {
        console.log("Usuário confirmou a saída. Redirecionando para a tela de login...");
        window.location.href = "login.html"; 
    }

    // Fechar o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == ModalSaida) {
            fecharModalSaida();
        }
    }
    
});