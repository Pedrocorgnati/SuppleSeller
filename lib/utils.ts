export const categoryMenuList = [
  {
    id: 1,
    title: "BCAA",
    src: "/bcaa icon.png",
    href: "/shop/bcaa"
  },
  {
    id: 2,
    title: "Cintos (Belt)",
    src: "/belt icon.png",
    href: "/shop/belt"
  },
  {
    id: 3,
    title: "Equipamentos",
    src: "/equipamentos icon.png",
    href: "/shop/equipamentos"
  },
  {
    id: 4,
    title: "CarbUp",
    src: "/carbup icon.png",
    href: "/shop/carbup"
  },
  {
    id: 5,
    title: "Whey Protein",
    src: "/whey.png",
    href: "/shop/whey"
  },
  {
    id: 6,
    title: "Vegan PTN",
    src: "/veganptn icon.png",
    href: "/shop/veganptn"
  },
  {
    id: 7,
    title: "Barrinhas de Proteína",
    src: "/protein bar icon.png",
    href: "/shop/protein-bar"
  },
  {
    id: 8,
    title: "Mass Gainer",
    src: "/mass icon.png",
    href: "/shop/mass"
  },
  {
    id: 9,
    title: "Vitaminas",
    src: "/vitamin icon.png",
    href: "/shop/vitaminas"
  },
  {
    id: 10,
    title: "Creatina",
    src: "/creatina icon.png",
    href: "/shop/creatina"
  },
];

export const incentives = [
  {
    name: "Free Shipping",
    description:
      "Frete grátis para suplementos e acessórios selecionados no Brasil.",
    imageSrc: "/shipping icon.png",
  },
  {
    name: "Suporte 24/7",
    description:
      "Especialistas em nutrição e treino prontos para tirar suas dúvidas sempre que precisar.",
    imageSrc: "/support icon.png",
  },
  {
    name: "Checkout rápido",
    description:
      "Experiência de compra fluida para você focar no próximo PR.",
    imageSrc: "/fast shopping icon.png",
  },
];

export const navigation = {
  sale: [
    { name: "Discounts", href: "#" },
    { name: "News", href: "#" },
    { name: "Register Discounts", href: "#" },
  ],
  about: [
    { name: "Sobre SuppleSeller", href: "#" },
    { name: "Work With Us", href: "#" },
    { name: "Company Profile", href: "#" },
  ],
  buy: [
    { name: "SuppleSeller Loyalty", href: "#" },
    { name: "Terms Of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Complaints", href: "#" },
    { name: "Partners", href: "#" },
  ],
  help: [
    { name: "Contact", href: "#" },
    { name: "Como comprar na SuppleSeller", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

export const isValidNameOrLastname = (input: string) => {
  // Simple name or lastname regex format check
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  // simple email address format check
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {
  // Remove all non-digit characters
  const cleanedInput = input.replace(/[^0-9]/g, "");

  // Check if the cleaned input has valid length (13-19 digits)
  if (!/^\d{13,19}$/.test(cleanedInput)) {
    return false;
  }

  // Implement Luhn algorithm for credit card validation
  return luhnCheck(cleanedInput);
};

/**
 * Luhn algorithm implementation for credit card validation
 * @param cardNumber - The credit card number as a string
 * @returns boolean - true if the card number is valid according to Luhn algorithm
 */
const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;

  // Process digits from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Enhanced credit card validation with card type detection
 * @param input - The credit card number as a string
 * @returns object with validation result and card type
 */
export const validateCreditCard = (input: string) => {
  const cleanedInput = input.replace(/[^0-9]/g, "");

  // Basic length and format check
  if (!/^\d{13,19}$/.test(cleanedInput)) {
    return {
      isValid: false,
      cardType: 'unknown',
      error: 'Invalid card number format'
    };
  }

  // Luhn algorithm check
  if (!luhnCheck(cleanedInput)) {
    return {
      isValid: false,
      cardType: 'unknown',
      error: 'Invalid card number (Luhn check failed)'
    };
  }

  // Detect card type based on BIN (Bank Identification Number)
  const cardType = detectCardType(cleanedInput);

  return {
    isValid: true,
    cardType,
    error: null
  };
};

/**
 * Detect credit card type based on BIN patterns
 * @param cardNumber - The credit card number as a string
 * @returns string - The detected card type
 */
const detectCardType = (cardNumber: string): string => {
  const firstDigit = cardNumber[0];
  const firstTwoDigits = cardNumber.substring(0, 2);
  const firstFourDigits = cardNumber.substring(0, 4);
  const firstThreeDigits = cardNumber.substring(0, 3);

  // Visa: starts with 4
  if (firstDigit === '4') {
    return 'visa';
  }

  // Mastercard: starts with 5 or 2
  if (firstDigit === '5' || (firstTwoDigits >= '22' && firstTwoDigits <= '27')) {
    return 'mastercard';
  }

  // American Express: starts with 34 or 37
  if (firstTwoDigits === '34' || firstTwoDigits === '37') {
    return 'amex';
  }

  // Discover: starts with 6011, 65, or 644-649
  if (firstFourDigits === '6011' || firstTwoDigits === '65' ||
    (firstThreeDigits >= '644' && firstThreeDigits <= '649')) {
    return 'discover';
  }

  // Diners Club: starts with 300-305, 36, or 38
  if ((firstThreeDigits >= '300' && firstThreeDigits <= '305') ||
    firstTwoDigits === '36' || firstTwoDigits === '38') {
    return 'diners';
  }

  // JCB: starts with 35
  if (firstTwoDigits === '35') {
    return 'jcb';
  }

  return 'unknown';
};

export const isValidCreditCardExpirationDate = (input: string) => {
  // simple expiration date format check
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input: string) => {
  // simple CVV or CVC format check
  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};
