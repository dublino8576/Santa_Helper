/**
 * CHATBOT-WIDGET.JS - Chatbot Widget Handler
 *
 * Handles chatbot widget functionality:
 * - Click interaction to navigate to chatbot page
 */

/**
 * Initialize chatbot widget interactions
 */
function initChatbotWidget() {
  const chatbotToggle = document.querySelector('.chatbot-toggle');

  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      // Navigate to chatbot page
      window.location.href = '/pages/chatbot.html';
    });
  }
}
