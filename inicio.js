// Dados simulados (Mock Data)
const dashboardData = {
    curso: {
        nome: "ADS SE4",
        imagemUrl: "./IMG/dev.jpg", 
        reservas: 5,
        alunos: 12
    },
    // Adicionando um aviso para fins de demonstração (se quiser que apareça)
    avisos: [
        // { id: 1, titulo: "Novo Horário", conteudo: "A sala A-102 terá manutenção na quinta-feira.", data: "2025-12-05" }
    ], 
    reservas: [
        { 
            id: 101, // ID ÚNICO ADICIONADO
            nome: "Programação Mobile", 
            local: "Sala de Informática", 
            turno: "Manhã", 
            data: new Date(2025, 9, 26), 
            diasRestantes: "4d"
        },
        { 
            id: 102, // ID ÚNICO ADICIONADO
            nome: "Eletrotécnica", 
            local: "Laboratório 3", 
            turno: "Tarde", 
            data: new Date(2025, 10, 10), 
            diasRestantes: "18d"
        }
    ]
};

// Mapeamento de meses para exibição
const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

/**
 * 1. Funcionalidade do Curso
 */
function renderizarCurso() {
    const curso = dashboardData.curso;
    const container = document.getElementById('cursos-container');
    const nomeSelecionado = document.getElementById('curso-selecionado-nome');
    
    // Atualiza o subtítulo
    nomeSelecionado.textContent = curso.nome;

    // Cria o card do curso
    const cursoCard = `
        <div class="course-card">
            <img src="${curso.imagemUrl}" alt="${curso.nome}" class="course-image">
            <div class="course-details">
                <h3>${curso.nome}</h3>
                <p>Reservas: ${curso.reservas}</p>
                <p>Alunos: ${curso.alunos}</p>
            </div>
        </div>
    `;
    
    container.innerHTML = cursoCard;
}

/**
 * 2. Funcionalidade de Avisos
 */
function renderizarAvisos() {
    const avisos = dashboardData.avisos;
    const container = document.getElementById('avisos-container');

    if (avisos.length === 0) {
        // Exibe o estado "Nenhum Aviso"
        container.innerHTML = `
            <div class="announcement-card empty-state">
                Nenhum Aviso
            </div>
        `;
    } else {
        // Exibe os avisos reais (inclui título e conteúdo)
        container.innerHTML = avisos.map(aviso => `
            <div class="announcement-card has-content">
                <h4>${aviso.titulo}</h4>
                <p>${aviso.conteudo}</p>
            </div>
        `).join('');
    }
}

/**
 * 3. Funcionalidade de Reservas (Com correção para o botão Mais Detalhes)
 */
function renderizarReservas() {
    const reservas = dashboardData.reservas;
    const container = document.getElementById('reservas-container');
    
    container.innerHTML = reservas.map(reserva => {
        const mes = meses[reserva.data.getMonth()];
        const dia = reserva.data.getDate();
        
        return `
            <div class="reservation-card">
                <div class="reservation-date">
                    <span class="month">${mes}</span>
                    <span class="day">${dia}</span>
                </div>
                <div class="reservation-details">
                    <h3>${reserva.nome}</h3>
                    <span class="time-left">${reserva.diasRestantes}</span>
                    <p><i class="fas fa-map-marker-alt"></i> ${reserva.local}</p>
                    <p><i class="fas fa-clock"></i> ${reserva.turno}</p>
                    <button class="details-btn" data-reserva-id="${reserva.id}">Mais Detalhes</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Adiciona evento de clique para o botão 'Mais Detalhes'
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            // Obtém o ID da reserva a partir do atributo 'data-reserva-id' do botão
            const reservaId = parseInt(event.currentTarget.getAttribute('data-reserva-id'));
            
            // Procura a reserva nos dados simulados
            const reservaDetalhe = dashboardData.reservas.find(r => r.id === reservaId);
            
            if (reservaDetalhe) {
                // Exemplo de ação: Exibir um alerta com os detalhes
                alert(`Detalhes da Reserva:\n\nCurso: ${reservaDetalhe.nome}\nLocal: ${reservaDetalhe.local}\nTurno: ${reservaDetalhe.turno}\nData: ${reservaDetalhe.data.toLocaleDateString('pt-BR')}`);
                
                // Em um projeto real, você abriria um modal (como o de Nova Reserva) 
                // preenchido com esses detalhes ou navegaria para a página de detalhe.
            } else {
                alert('Detalhes da reserva não encontrados.');
            }
        });
    });
}

// Inicialização: Carrega todas as funcionalidades ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarCurso();
    renderizarAvisos();
    renderizarReservas();
});