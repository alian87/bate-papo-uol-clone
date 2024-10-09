
# 💬 Bate-Papo UOL Clone

Este projeto é um clone simplificado do Bate-Papo UOL, desenvolvido para praticar habilidades em **HTML**, **CSS** e **JavaScript**. O projeto permite que os usuários entrem em uma sala de bate-papo, enviem mensagens públicas e privadas, e acompanhem quem está online em tempo real.

## 🖼️ Demonstrações

1. **Mensagem privada**

![Screenshot](https://i.imgur.com/lete8hW.jpeg)

2. **Chat**

![Screenshot](https://i.imgur.com/41XtMJE.jpeg)

## 📋 Funcionalidades

- Entrada de usuário em uma sala de bate-papo com um nome único.
- Envio de mensagens públicas visíveis para todos os participantes.
- Envio de mensagens privadas para um participante específico.
- Atualização contínua da lista de participantes ativos.
- Exibição de mensagens de status (entrada e saída de usuários).
- Interface amigável e responsiva para dispositivos móveis.

## 🚀 Tecnologias Utilizadas

- **HTML**: Estrutura da interface do chat.
- **CSS**: Estilos, responsividade e layout.
- **JavaScript**: Lógica para enviar e receber mensagens, manipulação de DOM, integração com API.
- **Axios**: Para realizar requisições HTTP à API mock.
- **API Mock Driven**: Utilizada para simular o comportamento real de uma sala de bate-papo.

## 🛠️ Como Instalar e Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/alian87/bate-papo-uol-clone.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd bate-papo-uol-clone
   ```

3. **Abra o arquivo `index.html` no seu navegador:**

   - Você pode clicar diretamente no arquivo `index.html` ou usar o comando no terminal:
     ```bash
     start index.html  # No Windows
     open index.html   # No macOS
     ```

## 🖥️ Estrutura do Projeto

```
├── index.html       # Estrutura principal do projeto
├── style.css        # Estilos da interface do usuário
├── script.js        # Lógica para manipulação de mensagens e integração com a API
├── images/          # Imagens usadas na interface
│   ├── logo.png
│   ├── people.png
│   └── Vector.png
└── README.md        # Documentação do projeto
```

## 🛠️ Como Funciona

1. **Entrar no Chat**:
   - O usuário insere um nome único ao abrir o site.
   - Se o nome estiver disponível, ele será redirecionado para a sala de bate-papo.
   - Caso o nome já esteja em uso, o sistema solicitará um novo nome.

2. **Envio de Mensagens**:
   - Digite sua mensagem no campo de entrada.
   - Clique no botão de envio ou pressione **Enter** para enviar.

3. **Mensagens Privadas e Visibilidade**:
   - Selecione um participante para enviar mensagens privadas ou deixe a opção "Todos" para mensagens públicas.
   - Escolha se deseja enviar uma mensagem pública ou privada.

4. **Manutenção de Conexão**:
   - A aplicação envia pings constantes ao servidor para manter a conexão ativa.

## 🚀 Melhorias Futuras

- **Autenticação**: Implementar autenticação de usuários para melhorar a segurança e permitir funcionalidades personalizadas.
- **Histórico de Mensagens**: Adicionar um banco de dados para salvar o histórico das conversas.
- **Suporte a Emojis e Imagens**: Permitir o envio de emojis e anexos no bate-papo.
- **Notificações de Mensagens**: Adicionar notificações sonoras ou visuais para novas mensagens.

## 📝 Licença

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

---

**Autor:** Alian

---

*Este projeto foi criado para fins educacionais e não tem afiliação com o Bate-Papo UOL oficial.*
