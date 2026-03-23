document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function scrollCarousel(direction) {
    const carousel = document.getElementById('personagensCarousel');
    const scrollAmount = 320; // Largura do card + gap
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

const fanartsData = [
    { src: 'assets/Teruhashi.jpg', autor: 'Artista 1', personagem: 'Teruhashi' },
    { src: 'assets/Sato.jpg', autor: 'Artista 2', personagem: 'Sato Atkins' },
    { src: 'assets/Asaki.jpg', autor: 'Artista 3', personagem: 'Asaki Verdion' },
    { src: 'assets/Lilith.jpg', autor: 'Artista 4', personagem: 'Lilith Jacob' },
    { src: 'assets/fanart5.jpg', autor: 'Artista 5', personagem: 'Capa Alternativa' },
    { src: 'assets/fanart6.jpg', autor: 'Artista 6', personagem: 'Cena da Explosão' },
];

function carregarGaleria() {
    const galeriaGrid = document.getElementById('galeriaGrid');
    if (!galeriaGrid) return;
    
    galeriaGrid.innerHTML = fanartsData.map((fanart, index) => `
        <div class="galeria-item" onclick="abrirLightbox(${index})">
            <img src="${fanart.src}" alt="Fanart de ${fanart.personagem} por ${fanart.autor}" class="galeria-img" onerror="this.src='https://placehold.co/400x400/2a2a2a/FFD700?text=${encodeURIComponent(fanart.personagem)}'">
            <div class="galeria-overlay">
                <p><i class="bi bi-palette"></i> ${fanart.personagem} • por ${fanart.autor}</p>
            </div>
        </div>
    `).join('');
}

function abrirLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const fanart = fanartsData[index];
    lightboxImg.src = fanart.src;
    lightboxImg.alt = `Fanart de ${fanart.personagem} por ${fanart.autor}`;
    lightbox.classList.add('active');
    
    // Adicionar legenda
    let caption = document.getElementById('lightboxCaption');
    if (!caption) {
        caption = document.createElement('div');
        caption.id = 'lightboxCaption';
        caption.style.cssText = 'position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; color: #FFD700; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 20px; width: fit-content; margin: 0 auto;';
        lightbox.appendChild(caption);
    }
    caption.innerHTML = `${fanart.personagem} • ilustração por ${fanart.autor}`;
}

function fecharLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharLightbox();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    carregarGaleria();
});

const personagensData = {
    teruhashi: {
        nome: 'TERUHASHI',
        familia: 'Família Wright',
        idade: 25,
        signo: 'Áries',
        descricao: 'Herdeira destemida que embarca em uma jornada para descobrir a verdade por trás dos incêndios que ameaçam o Império. Com um coração corajoso e uma mente inquisitiva, Teruhashi não descansa até encontrar respostas.',
        imagem: 'assets/personagem-teruhashi.jpg',
        traits: ['Determinada', 'Corajosa']
    },
    sato: {
        nome: 'SATO ATKINS',
        familia: 'Família Atkins',
        idade: 27,
        signo: 'Escorpião',
        descricao: 'Estrategista brilhante com um passado misterioso. Suas lealdades são tão complexas quanto o mundo em que vive. Ninguém sabe ao certo de que lado ele realmente está.',
        imagem: 'assets/personagem-sato.jpg',
        traits: ['Misterioso', 'Língua Afiada']
    },
    asaki: {
        nome: 'ASAKI VERDION',
        familia: 'Família Veridion',
        idade: 26,
        signo: 'Sagitário',
        descricao: 'Alma inquieta e coração leal, carrega o peso das expectativas enquanto busca seu próprio caminho. Sua jornada é marcada por descobertas sobre si mesmo e sobre o mundo.',
        imagem: 'assets/personagem-asaki.jpg',
        traits: ['Idealista', 'Aventureiro']
    },
    lilith: {
        nome: 'LILITH JACOB',
        familia: 'Família Jacob',
        idade: 25,
        signo: 'Leão',
        descricao: 'Visionária ambiciosa que enxerga além das chamas. Disposta a tudo para garantir o futuro do Império, mesmo que isso signifique tomar decisões difíceis.',
        imagem: 'assets/personagem-lilith.jpg',
        traits: ['Visionária', 'Determinada']
    },
    zack: {
        nome: 'ZACK LEVINE',
        familia: 'Família Levine',
        idade: 28,
        signo: 'Libra',
        descricao: 'Disiplinado, ele não vacila em nenhum momento em seu papel de proteger a herdeira dos Wright, mesmo ela não facilitando..',
        imagem: 'assets/personagem-zack.jpg',
        traits: ['Leal', 'Protetor']
    }
};

function abrirModalPersonagem(id) {
    const personagem = personagensData[id];
    if (!personagem) return;
    
    let modal = document.getElementById('personagemModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'personagemModal';
        modal.className = 'personagem-modal';
        modal.innerHTML = `
            <span class="modal-close" onclick="fecharModalPersonagem()">&times;</span>
            <div class="modal-content">
                <img class="modal-img" id="modalImg" src="" alt="">
                <div class="modal-info">
                    <h3 id="modalNome"></h3>
                    <p id="modalFamilia"></p>
                    <p id="modalDetalhes"></p>
                    <p id="modalDesc"></p>
                    <div id="modalTraits" style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) fecharModalPersonagem();
        });
    }
    
    document.getElementById('modalImg').src = personagem.imagem;
    document.getElementById('modalNome').textContent = personagem.nome;
    document.getElementById('modalFamilia').textContent = personagem.familia;
    document.getElementById('modalDetalhes').innerHTML = `<i class="bi bi-calendar"></i> ${personagem.idade} Anos  |  <i class="bi bi-star"></i> ${personagem.signo}`;
    document.getElementById('modalDesc').textContent = personagem.descricao;
    
    const traitsContainer = document.getElementById('modalTraits');
    traitsContainer.innerHTML = personagem.traits.map(trait => 
        `<span class="trait">${trait}</span>`
    ).join('');
    
    modal.classList.add('active');
}

function fecharModalPersonagem() {
    const modal = document.getElementById('personagemModal');
    if (modal) modal.classList.remove('active');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharModalPersonagem();
        fecharLightbox();
    }
});

const avaliacoesData = [
    {
        nome: 'Mariana S.',
        stars: 5,
        texto: 'Simplesmente incrível! A construção de mundo é fascinante e os personagens são muito bem desenvolvidos. Mal posso esperar por Cidadela de Vidro!',
        data: '15 de março, 2026',
        verified: true
    },
    {
        nome: 'Rafael L.',
        stars: 5,
        texto: 'Uma das melhores distopias que já li. A autora conseguiu criar uma atmosfera única e personagens que grudam na mente. Recomendo demais!',
        data: '10 de março, 2026',
        verified: true
    },
    {
        nome: 'Camila F.',
        stars: 4,
        texto: 'História envolvente com reviravoltas surpreendentes. A única coisa que me deixou ansiosa foi ter que esperar pela continuação!',
        data: '5 de março, 2026',
        verified: true
    },
    {
        nome: 'Lucas M.',
        stars: 5,
        texto: 'Terminei em dois dias. Não conseguia parar de ler! A Teruhashi é uma protagonista incrível e o plot twist no final me deixou sem palavras.',
        data: '28 de fevereiro, 2026',
        verified: true
    }
];

let avaliacoesVisiveis = 3;

function renderizarAvaliacoes() {
    const container = document.getElementById('avaliacoesGrid');
    if (!container) return;
    
    const avaliacoesExibir = avaliacoesData.slice(0, avaliacoesVisiveis);
    
    container.innerHTML = avaliacoesExibir.map(avaliacao => `
        <div class="avaliacao-card">
            <div class="avaliacao-header">
                <div class="avaliacao-avatar">
                    ${avaliacao.nome.charAt(0)}
                </div>
                <div>
                    <div class="avaliacao-nome">${avaliacao.nome}</div>
                    <div class="avaliacao-stars">
                        ${'<i class="bi bi-star-fill"></i>'.repeat(avaliacao.stars)}
                        ${'<i class="bi bi-star"></i>'.repeat(5 - avaliacao.stars)}
                        ${avaliacao.verified ? '<span style="color: #FFD700; font-size: 0.7rem;"><i class="bi bi-check-circle-fill"></i> Compra verificada</span>' : ''}
                    </div>
                </div>
            </div>
            <p class="avaliacao-texto">"${avaliacao.texto}"</p>
            <div class="avaliacao-data">
                <i class="bi bi-calendar"></i> ${avaliacao.data}
            </div>
        </div>
    `).join('');
    
    const verMaisBtn = document.getElementById('verMaisAvaliacoes');
    if (verMaisBtn) {
        if (avaliacoesVisiveis >= avaliacoesData.length) {
            verMaisBtn.style.display = 'none';
        } else {
            verMaisBtn.style.display = 'inline-flex';
        }
    }
}

function carregarMaisAvaliacoes() {
    avaliacoesVisiveis += 3;
    renderizarAvaliacoes();
}

function scrollCarousel(direction) {
    const carousel = document.getElementById('personagensCarousel');
    if (!carousel) return;
    const scrollAmount = 320;
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderizarAvaliacoes();
    
    const verMaisBtn = document.getElementById('verMaisAvaliacoes');
    if (verMaisBtn) {
        verMaisBtn.addEventListener('click', carregarMaisAvaliacoes);
    }
});