document.addEventListener('DOMContentLoaded', () => {
    // --- Código anterior do Livro 3D (Mantenha-o) ---
    const book = document.getElementById('bookCover');
    const container = document.querySelector('.hero-section');
    if(container && book) {
        container.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX) / 50;
            const y = (window.innerHeight - e.pageY) / 50;
            book.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
        container.addEventListener('mouseleave', () => {
            book.style.transform = `translateX(0px) translateY(0px)`;
        });
    }

    // --- NOVO CÓDIGO: Lógica do Carrossel ---
    const track = document.querySelector('.carousel-track');
    
    // Se não houver carrossel na página, para por aqui para não dar erro
    if (!track) return; 

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Tamanho do card + o espaço (gap) definido no CSS
    // 280px card + 30px gap = 310px por movimento
    const cardWidth = 310; 

    nextBtn.addEventListener('click', () => {
        // Move para a esquerda (scroll right)
        track.style.transform = `translateX(-${cardWidth}px)`;
        
        // Truque para carrossel infinito simples:
        // Pega o primeiro item e joga pro final da lista
        // setTimeout espera a transição visual acabar (500ms)
        setTimeout(() => {
            track.appendChild(track.firstElementChild);
            track.style.transition = 'none'; // Tira animação para resetar posição
            track.style.transform = 'translateX(0)'; // Reseta posição visual
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out'; // Devolve animação
            }, 50);
        }, 500);
    });

    prevBtn.addEventListener('click', () => {
        // Lógica inversa: Pega o último e joga pro começo antes de animar
        track.style.transition = 'none';
        track.prepend(track.lastElementChild);
        track.style.transform = `translateX(-${cardWidth}px)`;
        
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = 'translateX(0)';
        }, 50);
    });
});


const dialog = document.getElementById('imageDialog');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementById('closeModal');
    
    // Seleciona todas as imagens que têm a classe 'zoomable'
    const zoomableImages = document.querySelectorAll('.zoomable');

    // Adiciona evento de clique em cada imagem
    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src; // Copia o SRC da imagem clicada para o modal
            dialog.showModal(); // Método nativo para abrir como modal (com backdrop)
        });
    });

    // Fechar ao clicar no botão X
    closeBtn.addEventListener('click', () => {
        dialog.close(); // Método nativo para fechar
    });

    // Fechar ao clicar fora da imagem (no backdrop escuro)
    dialog.addEventListener('click', (event) => {
        // Verifica se o clique foi no elemento dialog (que ocupa a tela toda com o backdrop)
        // Se o clique for exatamente no 'dialog', significa que foi fora da imagem/wrapper
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
          && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        
        // No caso do <dialog>, clicar no backdrop dispara o evento no próprio dialog.
        // Vamos usar uma verificação simples: se o alvo for o próprio dialog, fecha.
        if (event.target === dialog) {
            dialog.close();
        }
    });