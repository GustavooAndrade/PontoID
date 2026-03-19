document.addEventListener ('DOMContentLoaded', () => {
    if (document.getElementById('corpoTabela')) {
        const corpoTabela = document.getElementById('corpoTabela');
        const modalAjuste = document.getElementById('modalAjuste');
        const formAjuste = document.getElementById('formAjuste');
        
        const registrosmarcados = [
            { day: '01/Set', status: 'Presente', p_in: '08:00', p_out: '17:00', horasmarcadas: ['08:02', '12:00', '13:00', '17:05'], total: '08:03', ajuste: false },
            { day: '02/Set', status: 'Presente', p_in: '08:00', p_out: '17:00', horasmarcadas: ['07:59', '12:05', '13:05', '17:00'], total: '08:01', ajuste: false },
            { day: '03/Set', status: 'Falta', p_in: '08:00', p_out: '17:00', horasmarcadas: ['-'], total: '00:00', ajuste: false },
            { day: '04/Set', status: 'Presente', p_in: '08:00', p_out: '17:00', horasmarcadas: ['08:00', '12:00', '13:00'], total: '07:00', ajuste: true },
            { day: '05/Set', status: 'Atestado', p_in: '08:00', p_out: '17:00', horasmarcadas: ['Atestado Médico'], total: '08:00', ajuste: true },
        ];

        function renderTabela(registros) {
            corpoTabela.innerHTML = '';
            registros.forEach(registro => {
                const statusClass = registro.status === 'Presente' || registro.status === 'Atestado' ? 'present-status' : 'falta-status';
                const statusDisplay = registro.status === 'Atestado' ? `<span style="color:var(--blue-info);">Atestado</span>` : registro.status;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${registro.day}</td>
                    <td class="status-cell ${statusClass}">${statusDisplay}</td>
                    <td>${registro.p_in} - ${registro.p_out}</td>
                    <td>${registro.horasmarcadas.join(', ')}</td>
                    <td>${registro.total}</td>
                    <td>${registro.ajuste ? 'Sim' : 'Não'}</td>
                `;
                corpoTabela.appendChild(row);
            });
        }
        
        window.abrirModalAjuste = function() {
            if (modalAjuste) {
                modalAjuste.style.display = 'flex';
                modalAjuste.style.alignItems = 'center';
                modalAjuste.style.justifyContent = 'center';
            }
        }

        window.fecharModalAjuste = function() {
            if (modalAjuste) {
                modalAjuste.style.display = 'none';
            }
        }
        
        if (formAjuste) {
            formAjuste.addEventListener('submit', function(e) {
                e.preventDefault();
                const data = document.getElementById('dataAjuste').value;
                const tipo = document.getElementById('tipoAjuste').value;
                const motivo = document.getElementById('motivoAjuste').value;

                if (!data || !tipo || !motivo) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }

                alert(`Solicitação de ajuste para ${data} (${tipo}) enviada com sucesso ao gestor!`);
                formAjuste.reset();
                fecharModalAjuste();
            });
        }
        
        renderTabela(registrosmarcados);
    }
})