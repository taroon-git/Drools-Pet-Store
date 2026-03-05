export const generateWhatsAppUrl = (message = '') => {
  const phoneNumber = '1234567890'; // Replace with actual WhatsApp business number
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const openWhatsAppChat = (message = '') => {
  const url = generateWhatsAppUrl(message);
  window.open(url, '_blank');
};

export default {
  generateWhatsAppUrl,
  openWhatsAppChat,
};
