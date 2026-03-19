document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('seletor-colaborador')) {
        const seletorColaborador = document.getElementById('seletor-colaborador');
        const divDetalhes = document.getElementById('detalhesColaborador');
        const spanNomeColaborador = document.getElementById('nomeColaborador');
        const spanFuncaoColaborador = document.getElementById('funcaoColaborador');
        const corpoTabelaPonto = document.getElementById('corpoTabelaPonto');
        
        const dadosColaborador = {
            1: {
                name: "Ana Lima Silva",
                role: "Desenvolvedora Web Júnior",
                registros: [
                    { status: 'Presente', day: 'Segunda, 10/11', p_in: '08:00', p_out: '12:00', r_in1: '08:02', r_out1: '12:05', r_in2: '13:00', r_out2: '17:01' },
                    { status: 'Falta', day: 'Terça, 11/11', p_in: '08:00', p_out: '12:00', r_in1: '-', r_out1: '-', r_in2: '-', r_out2: '-' },
                    { status: 'Presente', day: 'Hoje, 12/11', p_in: '08:00', p_out: '12:00', r_in1: '07:58', r_out1: '12:00', r_in2: '13:00', r_out2: '17:00' },
                ]
            },
            2: {
                name: "Bruno Costa",
                role: "Analista de Marketing Pleno",
                registros: [
                     { status: 'Presente', day: 'Segunda, 10/11', p_in: '09:00', p_out: '13:00', r_in1: '09:01', r_out1: '13:01', r_in2: '14:00', r_out2: '18:00' },
                ]
            },
        };

        window.buscarDadosColaborador = function() {
            const colaboradorID = seletorColaborador.value;

            if (!colaboradorID) {
                alert("Por favor, selecione um colaborador.");
                divDetalhes.style.display = 'none';
                return;
            }

            const dados = dadosColaborador[colaboradorID];
            
            spanNomeColaborador.textContent = dados.name;
            spanFuncaoColaborador.textContent = dados.role;

            renderTabelaRelatorio(dados.registros);
            divDetalhes.style.display = 'block';
        }

        function renderTabelaRelatorio(registros) {
            corpoTabelaPonto.innerHTML = '';

            registros.forEach((registro, index) => {
                const statusClass = registro.status === 'Presente' ? 'present-status' : 'falta-status';
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td class="status-cell ${statusClass}">${registro.status}</td>
                    <td>${registro.day}</td>
                    <td>${registro.p_in}</td>
                    <td>${registro.p_out}</td>
                    <td>${registro.r_in1}</td>
                    <td>${registro.r_out1}</td>
                    <td>${registro.r_in2}</td>
                    <td>${registro.r_out2}</td>
                    <td>
                        <button class="edit-btn" onclick="#">
                            <i class="fas fa-edit"></i> Alterar
                        </button>
                    </td>
                `;
                corpoTabelaPonto.appendChild(row);
            });
        }
    }
})