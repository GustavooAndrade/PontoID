document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('botaoPonto')) {
        const horaAtual = document.getElementById('horaAtual');
        const dataAtual = document.getElementById('dataAtual');
        const dataSistema = document.getElementById('dataSistema');
        const caixaStatus = document.getElementById('caixaStatus');
        const statusAtual = document.getElementById('statusAtual');
        const botaoPonto = document.getElementById('botaoPonto');
        const ultimoPonto = document.getElementById('ultimoPonto');
        
        const STORAGE_KEY_STATUS = 'pontoID_status';
        const STORAGE_KEY_LAST_PUNCH = 'pontoID_last_punch';
        
        const TIPO_PONTO = {
            OUT: { text: "Entrada", next: "IN", status: "Em Trabalho", buttonText: "ENTRADA", statusClass: "status-work" },
            IN: { text: "Início do Intervalo", next: "BREAK_START", status: "Em Intervalo", buttonText: "INÍCIO INTERVALO", statusClass: "status-break" },
            BREAK_START: { text: "Fim do Intervalo", next: "BREAK_END", status: "Em Trabalho", buttonText: "FIM INTERVALO", statusClass: "status-work" },
            BREAK_END: { text: "Saída", next: "OUT", status: "Fora do expediente", buttonText: "SAÍDA", statusClass: "" }
        };

        let statusPontoAtual = TIPO_PONTO.OUT; 
        
        function atualizarDataHora() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('pt-BR', { hour12: false });
            horaAtual.textContent = timeString;
            const dateString = now.toLocaleDateString('pt-BR', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            });
            dataAtual.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
            dataSistema.textContent = now.toISOString().slice(0, 19).replace('T', ' ');
        }

        function iniciarStatusPonto() {
            const pontoArmazenado = localStorage.getItem(STORAGE_KEY_STATUS);
            const ultimoPontoArmazenado = localStorage.getItem(STORAGE_KEY_LAST_PUNCH);
            
            if (pontoArmazenado && TIPO_PONTO[pontoArmazenado]) {
                statusPontoAtual = TIPO_PONTO[pontoArmazenado];
            } else {
                statusPontoAtual = TIPO_PONTO.OUT;
                localStorage.setItem(STORAGE_KEY_STATUS, 'OUT');
            }

            if (ultimoPontoArmazenado) {
                ultimoPonto.textContent = ultimoPontoArmazenado;
            }

            atualizarInterface();
        }

        function atualizarInterface() {
            const statusProximaChave = statusPontoAtual.next;
            const proximoStatus = TIPO_PONTO[statusProximaChave];
            
            botaoPonto.textContent = proximoStatus.buttonText;
            statusAtual.textContent = statusPontoAtual.status;
            caixaStatus.className = `status-atual ${statusPontoAtual.statusClass}`;
        }
        
        window.registrarPonto = function() {
            const now = new Date();
            const statusProximaChave = statusPontoAtual.next;
            const proximoStatus = TIPO_PONTO[statusProximaChave];
            
            const tipoPonto = proximoStatus.text;
            
            const dadosPonto = {
                matricula: document.getElementById('matricula').textContent,
                data: now.toLocaleDateString('pt-BR'),
                hora: now.toLocaleTimeString('pt-BR', { hour12: false }),
                tipo: tipoPonto
            };

            console.log('Registro de Ponto Enviado:', dadosPonto);
            alert(`Ponto registrado com sucesso: ${tipoPonto} às ${dadosPonto.hora}`);
            
            statusPontoAtual = proximoStatus;
            localStorage.setItem(STORAGE_KEY_STATUS, statusProximaChave);
            localStorage.setItem(STORAGE_KEY_LAST_PUNCH, `${tipoPonto} em ${dadosPonto.data} às ${dadosPonto.hora}`);
            
            ultimoPonto.textContent = ` ${tipoPonto} em ${dadosPonto.data} às ${dadosPonto.hora}`;
            atualizarInterface();
        }

        setInterval(atualizarDataHora, 1000); 
        atualizarDataHora(); 
        iniciarStatusPonto();
    }
});