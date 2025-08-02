  // Exemplo de "banco de dados" de usuários com foto
        const usuarios = [
            { email: "joao@email.com", senha: "123", nome: "João", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
            { email: "maria@email.com", senha: "abc", nome: "Maria", foto: "https://randomuser.me/api/portraits/women/44.jpg" }
            // Adicione mais usuários conforme necessário
        ];

        function setUsuarioLogado(email) {
            localStorage.setItem('usuarioLogado', email);
        }
        function getUsuarioLogado() {
            return localStorage.getItem('usuarioLogado');
        }
        function removerUsuarioLogado() {
            localStorage.removeItem('usuarioLogado');
        }

        function atualizarFotoPerfil() {
            const email = getUsuarioLogado();
            let foto = "https://randomuser.me/api/portraits/men/32.jpg";
            if (email) {
                const fotoSalva = localStorage.getItem('fotoPerfil_' + email);
                if (fotoSalva) {
                    foto = fotoSalva;
                } else {
                    const usuario = usuarios.find(u => u.email === email);
                    if (usuario && usuario.foto) foto = usuario.foto;
                }
            }
            const fotoEl = document.getElementById('fotoPerfil');
            if (fotoEl) fotoEl.src = foto;
        }

        function esconderBotoes() {
            document.querySelectorAll('button[onclick="mostrarCadastro()"], button[onclick="mostrarLogin()"]').forEach(btn => {
                btn.style.display = 'none';
            });
        }
        function mostrarBotoes() {
            document.querySelectorAll('button[onclick="mostrarCadastro()"], button[onclick="mostrarLogin()"]').forEach(btn => {
                btn.style.display = '';
            });
        }

        function mostrarCadastro() {
            const cadastro = document.getElementById('cadastro');
            const login = document.getElementById('login');
            if (cadastro && login) {
                if (cadastro.style.display === 'block') {
                    cadastro.style.display = 'none';
                } else {
                    cadastro.style.display = 'block';
                    login.style.display = 'none';
                }
            }
        }
        function mostrarLogin() {
            const login = document.getElementById('login');
            const cadastro = document.getElementById('cadastro');
            if (login && cadastro) {
                if (login.style.display === 'block') {
                    login.style.display = 'none';
                } else {
                    login.style.display = 'block';
                    cadastro.style.display = 'none';
                }
            }
        }
        function deslogar() {
            alert("Você foi deslogado!");
            const cadastro = document.getElementById('cadastro');
            const login = document.getElementById('login');
            if (cadastro) cadastro.style.display = 'none';
            if (login) login.style.display = 'none';
            removerUsuarioLogado();
            mostrarBotoes();
            atualizarFotoPerfil();
        }
        function entrar(event) {
            event.preventDefault();
            const email = event.target.querySelector('input[type="email"]').value;
            const senha = event.target.querySelector('input[type="password"]').value;
            const usuario = usuarios.find(u => u.email === email && u.senha === senha);
            if (usuario) {
                setUsuarioLogado(email);
                alert("Login realizado com sucesso!");
                const login = document.getElementById('login');
                if (login) login.style.display = 'none';
                esconderBotoes();
                atualizarFotoPerfil();
            } else {
                alert("Usuário ou senha incorretos!");
            }
            return false;
        }
        function cadastrar(event) {
            event.preventDefault();
            const nome = event.target.querySelector('input[type="text"]').value;
            const email = event.target.querySelector('input[type="email"]').value;
            const senha = event.target.querySelector('input[type="password"]').value;
            // Foto padrão para novos usuários
            const foto = "https://randomuser.me/api/portraits/lego/1.jpg";
            usuarios.push({ nome, email, senha, foto });
            setUsuarioLogado(email);
            alert("Cadastro realizado com sucesso!");
            const cadastro = document.getElementById('cadastro');
            if (cadastro) cadastro.style.display = 'none';
            esconderBotoes();
            atualizarFotoPerfil();
            return false;
        }

        window.onload = function() {
            atualizarFotoPerfil();
            if (getUsuarioLogado()) {
                esconderBotoes();
            } else {
                mostrarBotoes();
            }
        };

        document.addEventListener('DOMContentLoaded', function() {
            const trocarFotoBtn = document.getElementById('trocarFotoBtn');
            const inputFoto = document.getElementById('inputFoto');
            if (trocarFotoBtn && inputFoto) {
                trocarFotoBtn.addEventListener('click', function() {
                    inputFoto.click();
                });

                inputFoto.addEventListener('change', function(event) {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const fotoEl = document.getElementById('fotoPerfil');
                            if (fotoEl) fotoEl.src = e.target.result;
                            const email = getUsuarioLogado();
                            const usuario = usuarios.find(u => u.email === email);
                            if (usuario) usuario.foto = e.target.result;
                            // Salva a foto no localStorage
                            if (email) {
                                localStorage.setItem('fotoPerfil_' + email, e.target.result);
                                alert('Foto de perfil atualizada com sucesso!');
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }

            // Loja VIP
            const btnLoja = document.getElementById('btnLoja');
            const modalLoja = document.getElementById('modalLoja');
            const btnFecharModal = document.getElementById('btnFecharModal');
            const btnComprar = document.getElementById('btnComprar');

            if (btnLoja && modalLoja && btnFecharModal && btnComprar) {
                btnLoja.onclick = function() {
                    modalLoja.style.display = 'flex';
                };
                btnFecharModal.onclick = function() {
                    modalLoja.style.display = 'none';
                };
                btnComprar.onclick = function() {
                    // Redireciona para página de pagamento (substitua pela sua URL real)
                    window.location.href = "https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=SEU_ID_DE_PAGAMENTO";
                };
            }
        });