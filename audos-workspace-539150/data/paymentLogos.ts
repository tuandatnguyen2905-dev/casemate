export type PaymentCardLogo = {
  name: string;
  src: string;
  displayWidth: number;
  displayHeight: number;
};

// Founder-supplied official card-network artwork. Keep this catalog as the
// single source of truth so every payment surface uses the same logos.
export const PAYMENT_CARD_LOGOS: readonly PaymentCardLogo[] = [
  {
    name: 'Visa',
    src: 'https://storage.googleapis.com/audos-images/attachments/general/bdba87d3-cb4c-4b3e-9c67-472f77aadae4.png',
    displayWidth: 46,
    displayHeight: 18,
  },
  {
    name: 'Mastercard',
    src: 'https://storage.googleapis.com/audos-images/attachments/general/9179d3b9-02b4-4076-b1d4-6f12cc081622.png',
    displayWidth: 32,
    displayHeight: 22,
  },
  {
    name: 'American Express',
    src: 'https://storage.googleapis.com/audos-images/attachments/general/c67b5e0f-bf96-45e6-ab6a-490221072e88.png',
    displayWidth: 48,
    displayHeight: 20,
  },
  {
    name: 'JCB',
    src: 'https://storage.googleapis.com/audos-images/attachments/general/c17beed3-44af-4c09-bba0-4ca1771c8feb.png',
    displayWidth: 30,
    displayHeight: 22,
  },
] as const;
