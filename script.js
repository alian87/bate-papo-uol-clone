let userName = "";
let UUID = "0c503022-0a80-4aab-8c08-2ec9c5e2c66b";
let selectedParticipant = "Todos";
let messageType = "message";

// Solicita o nome do usuário ao carregar a página
window.onload = () => {
  askUserName();

  // Adiciona event listeners
  document.querySelector(".send-button").addEventListener("click", sendMessage);
  document.querySelector(".participants-button").addEventListener("click", toggleSidebar);
  document.querySelector(".overlay").addEventListener("click", toggleSidebar);

  // Permite enviar mensagem ao pressionar Enter
  document.querySelector(".message-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
};

// Função para solicitar o nome do usuário
function askUserName() {
  userName = prompt("Qual é o seu nome?");
  if (userName !== null && userName.trim() !== "") {
    enterChat();  // Se o nome for válido, entrar no chat
  } else {
    alert("Nome de usuário inválido. Por favor, insira um nome válido.");
    askUserName();  // Se for inválido, pedir novamente
  }
}

// Entra na sala de bate-papo
function enterChat() {
  if (!userName || userName.trim() === "") {
    alert("Nome de usuário inválido");
    askUserName();
    return;
  }

  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/participants/" + UUID, {
      name: userName,
    })
    .then(() => {
      console.log("Usuário entrou no chat");
      startChat();  // Iniciar a função de manter conexão e carregar mensagens
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        alert("Nome já em uso, por favor escolha outro.");
        askUserName();  // Nome já em uso, pedir outro nome
      } else {
        console.error("Erro ao entrar no chat:", error);
      }
    });
}

// Função que inicia o chat: mantém conexão e carrega mensagens
function startChat() {
  keepConnection();  // Inicia a manutenção da conexão
  setInterval(keepConnection, 5000);  // A cada 5 segundos

  getMessages();  // Carrega as mensagens do chat
  setInterval(getMessages, 3000);  // A cada 3 segundos, carrega novas mensagens

  getParticipants();  // Obtém a lista de participantes
  setInterval(getParticipants, 10000);  // Atualiza a cada 10 segundos
}

// Mantém a conexão ativa
function keepConnection() {
  if (!userName || userName.trim() === "") {
    console.error("Nome de usuário não definido ou inválido");
    return;
  }

  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/status/" + UUID, {
      name: userName,
    })
    .catch((error) => {
      console.error("Erro ao manter conexão:", error);
    });
}

// Obtém as mensagens do servidor
function getMessages() {
  axios
    .get("https://mock-api.driven.com.br/api/v6/uol/messages/" + UUID)
    .then((response) => {
      renderMessages(response.data);
    })
    .catch((error) => {
      console.error("Erro ao obter mensagens:", error);
    });
}

// Renderiza as mensagens na tela
function renderMessages(messages) {
  const chat = document.querySelector(".chat");
  chat.innerHTML = "";

  const timeZone = 'America/Sao_Paulo';

  messages.forEach((message) => {
    // Filtrar mensagens privadas que não são do ou para o usuário atual
    if (message.type === "private_message" && message.to !== userName && message.from !== userName) {
      return; // Pula para a próxima iteração do loop
    }

    // Sempre começa com a classe base 'message'
    let messageClass = "message";

    // Adiciona classes adicionais com base no tipo de mensagem
    if (message.type === "status") {
      messageClass += " status";  // Adiciona 'status' à classe
    } else if (message.type === "private_message") {
      messageClass += " private_message";  // Adiciona 'private_message' à classe
    }

    // Ajustar o timestamp
    let timeString = message.time; // Timestamp original do servidor (formato "HH:MM:SS")

    // Parse do timestamp
    let [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Criar um objeto Date com a data atual e horário da mensagem em UTC
    let dateUTC = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      hours,
      minutes,
      seconds
    ));

    // Formatar a data para o fuso horário desejado
    let formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: timeZone,
      hourCycle: 'h23', // Garante o formato de 24 horas
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    let adjustedTimeString = formatter.format(dateUTC);

    // Monta o HTML da mensagem de forma condicional
    let messageHTML = `
      <div class="${messageClass}">
        <span class="time">(${adjustedTimeString})</span> 
        <span class="from">${message.from}</span> `;

    if (message.type === "message") {
      messageHTML += `para <span class="to">${message.to}:</span> `;
    } else if (message.type === "private_message") {
      messageHTML += `reservadamente para <span class="to">${message.to}:</span> `;
    }

    // Adiciona o texto da mensagem
    messageHTML += `<span class="text">${message.text}</span>
      </div>
    `;

    chat.innerHTML += messageHTML;
  });

  // Scroll automático para a última mensagem
  const lastMessage = chat.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView();
  }
}



// Envia uma mensagem
function sendMessage() {
  const messageInput = document.querySelector(".message-input");
  const messageText = messageInput.value.trim();

  if (messageText === "") {
    alert("A mensagem não pode ser vazia.");
    return;
  }

  const message = {
    from: userName,
    to: selectedParticipant,  // O destinatário é o participante selecionado
    text: messageText,
    type: messageType  // Pode ser "message" ou "private_message"
  };

  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/messages/" + UUID, message)
    .then(() => {
      messageInput.value = "";
      getMessages();
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem:", error);
      alert("Você foi desconectado. Por favor, entre novamente.");
      window.location.reload();
    });
}

// Alterna a visibilidade da sidebar (menu de participantes)
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  sidebar.classList.toggle("visible");
  overlay.classList.toggle("visible");
}

// Atualiza a lista de participantes no menu
function getParticipants() {
  axios
    .get("https://mock-api.driven.com.br/api/v6/uol/participants/" + UUID)
    .then((response) => {
      renderParticipants(response.data);
    })
    .catch((error) => {
      console.error("Erro ao obter participantes:", error);
    });
}

// Renderiza a lista de participantes no menu lateral
function renderParticipants(participants) {
  const participantsList = document.querySelector(".participants-list");
  participantsList.innerHTML = `
    <div class="participant ${selectedParticipant === "Todos" ? "selected" : ""}" onclick="selectParticipant(this)">
      <ion-icon name="people-outline"></ion-icon> 
      <span>Todos</span>
      <ion-icon name="checkmark-outline" class="check ${selectedParticipant === "Todos" ? "" : "hidden"}"></ion-icon>
    </div>
  `;

  participants.forEach((participant) => {
    if (participant.name !== userName) { // Não incluir o próprio usuário
      participantsList.innerHTML += `
        <div class="participant ${selectedParticipant === participant.name ? "selected" : ""}" onclick="selectParticipant(this)">
          <ion-icon name="person-outline"></ion-icon> 
          <span>${participant.name}</span>
          <ion-icon name="checkmark-outline" class="check ${selectedParticipant === participant.name ? "" : "hidden"}"></ion-icon>
        </div>
      `;
    }
  });
}

// Seleciona o participante no menu
function selectParticipant(element) {
  const previouslySelected = document.querySelector(".participants-list .selected");
  if (previouslySelected) {
    previouslySelected.classList.remove("selected");
    previouslySelected.querySelector(".check").classList.add("hidden");
  }
  element.classList.add("selected");
  element.querySelector(".check").classList.remove("hidden");

  selectedParticipant = element.querySelector("span").innerText;
  updateRecipientInfo();
}

// Seleciona o tipo de mensagem (público ou reservado)
const visibilityOptions = document.querySelectorAll(".visibility-option");
visibilityOptions.forEach(option => {
  option.addEventListener("click", function () {
    const previouslySelected = document.querySelector(".message-types .selected");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
      previouslySelected.querySelector(".check").classList.add("hidden");
    }
    this.classList.add("selected");
    this.querySelector(".check").classList.remove("hidden");

    messageType = this.getAttribute("data-type");
    updateRecipientInfo();
  });
});

// Atualiza o texto do destinatário e tipo de mensagem no input de envio
function updateRecipientInfo() {
  const recipientInfo = document.querySelector(".recipient-info");
  if (selectedParticipant !== "Todos" && messageType === "private_message") {
    recipientInfo.innerText = `Enviando para ${selectedParticipant} (reservadamente)`;
  } else {
    recipientInfo.innerText = `Enviando para ${selectedParticipant} (público)`;
  }
}
