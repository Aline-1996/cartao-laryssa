document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const profileImg = document.getElementById('profileImg');
    const photoInput = document.getElementById('photoInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const themeToggle = document.getElementById('themeToggle');
    const fontSelect = document.getElementById('fontSelect');
    const printBtn = document.getElementById('printBtn');
    const phrases = document.querySelectorAll('.phrase');

    // ------------------------------------------
    // 1. Efeito de Revelação Sequencial das Frases
    // ------------------------------------------
    const revealPhrases = () => {
        phrases.forEach((phrase, index) => {
            // Atraso: 500ms inicial + 400ms para cada frase seguinte
            setTimeout(() => {
                phrase.classList.add('is-visible');
            }, 500 + (index * 400));
        });
    };

    revealPhrases(); // Inicia o efeito ao carregar a página

    // ------------------------------------------
    // 2. Troca de Tema (com Transição CSS)
    // ------------------------------------------
    themeToggle.addEventListener('click', () => {
        // Alterna entre as classes de tema definidas no CSS
        if (body.classList.contains('theme-rose')) {
            body.classList.remove('theme-rose');
            body.classList.add('theme-dark');
        } else {
            body.classList.remove('theme-dark');
            body.classList.add('theme-rose');
        }
    });

    // ------------------------------------------
    // 3. Troca de Fonte
    // ------------------------------------------
    fontSelect.addEventListener('change', (e) => {
        // Remove todas as classes de fonte existentes
        body.classList.remove('font-great-vibes', 'font-playfair', 'font-poppins');
        
        // Adiciona a classe de fonte selecionada
        const selectedFont = e.target.value;
        body.classList.add(`font-${selectedFont}`);
    });

    // ------------------------------------------
    // 4. Upload de Foto AJAX (Melhoria de UX)
    // ------------------------------------------
    uploadBtn.addEventListener('click', () => {
        photoInput.click(); // Simula o clique no input file escondido
    });

    photoInput.addEventListener('change', () => {
        if (photoInput.files.length === 0) return;

        const file = photoInput.files[0];
        const formData = new FormData();
        formData.append('photo', file);

        // Feedback visual imediato
        uploadBtn.textContent = 'Enviando...';
        uploadBtn.disabled = true;

        fetch('index.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Atualiza a imagem com um timestamp para evitar cache
                const newPath = `${data.path}?t=${new Date().getTime()}`;
                profileImg.src = newPath;
                uploadBtn.textContent = 'Foto enviada! 🥳';
            } else {
                alert('Erro ao fazer upload: ' + (data.error || 'Erro desconhecido.'));
                uploadBtn.textContent = 'Falha no Upload';
            }
        })
        .catch(error => {
            console.error('Erro de rede:', error);
            alert('Erro de rede ao tentar enviar o arquivo.');
            uploadBtn.textContent = 'Erro de Rede';
        })
        .finally(() => {
            setTimeout(() => {
                uploadBtn.textContent = 'Enviar foto';
                uploadBtn.disabled = false;
            }, 3000); // Reseta o texto do botão após 3 segundos
        });
    });

    // ------------------------------------------
    // 5. Baixar Cartão (PDF/Print)
    // ------------------------------------------
    printBtn.addEventListener('click', () => {
        // Esconde os controles temporariamente para um PDF limpo
        document.querySelector('.controls').style.display = 'none';
        
        window.print();
        
        // Restaura os controles
        document.querySelector('.controls').style.display = 'flex';
    });
});