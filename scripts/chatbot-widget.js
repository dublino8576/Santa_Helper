/**
 * CHATBOT-WIDGET.JS - Chatbot Widget Handler
 *
 * Handles chatbot widget functionality:
 * - Modal open/close interactions
 * - Guided questionnaire before calling the AI helper
 * - Fetching gift ideas using Puter AI
 * - I pulled the main chatbot deisgn style etc from https://codepen.io/Lochy2000/pen/VYLVKgL
 */

const CHATBOT_QUESTIONS = [
  {
    id: 'recipient',
    prompt: "Who are we shopping for? (e.g., dad, college roommate, best friend)",
    placeholder: 'e.g. sister who loves travel'
  },
  {
    id: 'interests',
    prompt: "What do they get excited about lately? Hobbies, fandoms, new obsessions?",
    placeholder: 'e.g. hiking, coffee, photography'
  },
  {
    id: 'budget',
    prompt: "Any rough budget or type of gift you'd like to aim for?",
    placeholder: 'e.g. under $75 and handmade vibes'
  }
];

let puterScriptPromise = null;

/**
 * Ensure the Puter AI SDK is available
 * @returns {Promise<boolean>}
 */
function ensurePuterReady() {
  if (window.puter && window.puter.ai && typeof window.puter.ai.chat === 'function') {
    return Promise.resolve(true);
  }

  if (!puterScriptPromise) {
    puterScriptPromise = new Promise(resolve => {
      const existing = document.querySelector('script[data-puter-sdk]');

      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      script.defer = true;
      script.dataset.puterSdk = 'true';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  return puterScriptPromise;
}

/**
 * Initialize chatbot widget interactions
 */
function initChatbotWidget() {
  const widgetButton = document.querySelector('.chatbot-toggle');
  const modal = document.querySelector('.chatbot-modal');

  if (!widgetButton || !modal) {
    return;
  }

  const closeButton = modal.querySelector('.chatbot-close');
  const form = modal.querySelector('.chatbot-form');
  const input = modal.querySelector('.chatbot-input');
  const messages = modal.querySelector('.chatbot-messages');
  const statusBanner = modal.querySelector('.chatbot-status');

  // state dependent on the conversation
  const state = {
    questionIndex: 0,
    answers: {},
    isWaitingOnAI: false,
    loadingMessage: null,
    sdkWarmPromise: null
  };
  // Function to update the status banner
  function updateStatus(message) {
    if (!statusBanner) return;
    if (message) {
      statusBanner.textContent = message;
      statusBanner.hidden = false;
    } else {
      statusBanner.textContent = '';
      statusBanner.hidden = true;
    }
  }
  // this function uses the sdkWarmPromise to ensure the SDK is loaded before we try to use it
  function warmUpSDK() {
    if (!state.sdkWarmPromise) {
      state.sdkWarmPromise = ensurePuterReady().finally(() => {
        state.sdkWarmPromise = null;
      });
    }
    return state.sdkWarmPromise;
  }
  // this function toggles the modal open and closed
  function toggleModal(open) {
    const isOpen = Boolean(open);
    modal.classList.toggle('active', isOpen);
    modal.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      updateStatus("Summoning Pixel from Santa's workshop...");
      warmUpSDK().then(isReady => {
        if (isReady && modal.classList.contains('active') && !state.isWaitingOnAI) {
          updateStatus('');
        }
      });
      startConversation();
    } else {
      resetConversation();
      updateStatus('');
    }
  }

  function startConversation() {
    messages.innerHTML = '';
    state.questionIndex = 0;
    state.answers = {};
    state.isWaitingOnAI = false;
    state.loadingMessage = null;
    updateStatus('');

    addMessage("Hi! I'm Pixel the North Pole elf. Tell me who you're shopping for and I'll whip up ideas.",
      'assistant');
    askNextQuestion();
    input.focus();
  }

  function resetConversation() {
    input.value = '';
    input.placeholder = CHATBOT_QUESTIONS[0].placeholder;
    input.disabled = false;
  }

  function addMessage(content, sender = 'assistant', { loading = false, allowFormatting = false } = {}) {
    const message = document.createElement('div');
    message.className = `chatbot-message ${sender}`;
    if (loading) {
      message.classList.add('loading');
    }

    if (allowFormatting) {
      message.innerHTML = content.replace(/\n/g, '<br>');
    } else {
      message.textContent = content;
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  function askNextQuestion() {
    if (state.questionIndex >= CHATBOT_QUESTIONS.length) {
      fetchGiftIdeas();
      return;
    }

    const question = CHATBOT_QUESTIONS[state.questionIndex];
    addMessage(question.prompt, 'assistant');
    input.placeholder = question.placeholder;
  }

  function handleUserResponse(value) {
    const trimmed = value.trim();
    if (!trimmed || state.isWaitingOnAI) {
      return;
    }

    const currentQuestion = CHATBOT_QUESTIONS[state.questionIndex];
    addMessage(trimmed, 'user');
    if (currentQuestion) {
      state.answers[currentQuestion.id] = trimmed;
    }

    input.value = '';
    state.questionIndex += 1;
    askNextQuestion();
  }

  async function fetchGiftIdeas() {
    state.isWaitingOnAI = true;
    input.disabled = true;
    state.loadingMessage = addMessage("Let me check with Santa's workshop...", 'assistant', { loading: true });
    updateStatus('Checking in with the elves...');

    const isReady = await warmUpSDK();
    if (!isReady || !window.puter || !puter.ai || typeof puter.ai.chat !== 'function') {
      updateStatus('Workshop is a bit busy. Try again shortly.');
      finishWithMessage("Hmm, I can't reach the workshop elves right now. Please try again in a moment.");
      return;
    }

    updateStatus("Getting ideas from Santa's list...");

    const prompt = [
      "You are Pixel, a cheerful North Pole gift concierge.",
      "Given the following shopper details, ask 1-2 follow-up questions if needed, then propose 3-4 thoughtful Christmas gift ideas.",
      "Each idea should be concise (1 sentence) and reference the details provided.",
      "Details:",
      `Recipient: ${state.answers.recipient || 'Unknown'}`,
      `Interests: ${state.answers.interests || 'Not shared'}`,
      `Budget or preferences: ${state.answers.budget || 'Flexible'}`,
      "Format response as a short friendly greeting followed by a numbered list."
    ].join('\n');

    try {
      const response = await window.puter.ai.chat(prompt, {
        model: 'gpt-5-nano'
      });

      const content = response?.message?.content;
      if (content) {
        finishWithMessage(content, true);
      } else {
        finishWithMessage("Looks like the snowstorm scrambled the reply. Let's try again soon.");
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      updateStatus('Signal dropped in the snowstorm. Try again?');
      finishWithMessage("I couldn't get through to HQ. Mind giving it another shot?");
    } finally {
      updateStatus('');
    }
  }

  function finishWithMessage(text, allowFormatting = false) {
    if (state.loadingMessage) {
      state.loadingMessage.remove();
      state.loadingMessage = null;
    }

    addMessage(text, 'assistant', { allowFormatting });
    state.isWaitingOnAI = false;
    input.disabled = false;
    input.placeholder = 'Need more ideas? Ask away or type "restart".';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (input.value.trim().toLowerCase() === 'restart') {
      startConversation();
      return;
    }

    handleUserResponse(input.value);
  }

  widgetButton.addEventListener('click', () => toggleModal(true));
  closeButton?.addEventListener('click', () => toggleModal(false));
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      toggleModal(false);
    }
  });
  form.addEventListener('submit', handleFormSubmit);

  // Keyboard shortcut for ESC close
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      toggleModal(false);
    }
  });
}
