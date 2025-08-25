export interface MaskOptions {
  pattern?: 'phone' | 'cpf' | 'cnpj' | 'email' | 'creditCard' | 'custom';
  customPattern?: string;
  maskChar?: string;
  preserveStart?: number;
  preserveEnd?: number;
}

export function maskContent(content: string, options: MaskOptions = {}): string {
  const {
    pattern = 'custom',
    customPattern,
    maskChar = '*',
    preserveStart = 0,
    preserveEnd = 0
  } = options;

  if (!content) return content;

  // Remove any existing formatting for processing
  const cleanContent = content.replace(/\D/g, '');

  switch (pattern) {
    case 'phone':
      return maskPhone(cleanContent, maskChar);
    
    case 'cpf':
      return maskCPF(cleanContent, maskChar);
    
    case 'cnpj':
      return maskCNPJ(cleanContent, maskChar);
    
    case 'email':
      return maskEmail(content, maskChar);
    
    case 'creditCard':
      return maskCreditCard(cleanContent, maskChar);
    
    case 'custom':
      if (customPattern) {
        return applyCustomPattern(content, customPattern, maskChar);
      }
      return maskGeneric(content, maskChar, preserveStart, preserveEnd);
    
    default:
      return maskGeneric(content, maskChar, preserveStart, preserveEnd);
  }
}

function maskPhone(phone: string, maskChar: string): string {
  if (phone.length === 11) {
    // Mobile: (XX) XXXXX-XXXX -> (XX) *****-XXXX
    return `(${phone.slice(0, 2)}) ${maskChar.repeat(5)}-${phone.slice(-4)}`;
  } else if (phone.length === 10) {
    // Landline: (XX) XXXX-XXXX -> (XX) ****-XXXX
    return `(${phone.slice(0, 2)}) ${maskChar.repeat(4)}-${phone.slice(-4)}`;
  }
  return phone;
}

function maskCPF(cpf: string, maskChar: string): string {
  if (cpf.length === 11) {
    // XXX.XXX.XXX-XX -> ***.***.XXX-XX
    return `${maskChar.repeat(3)}.${maskChar.repeat(3)}.${cpf.slice(6, 9)}-${cpf.slice(-2)}`;
  }
  return cpf;
}

function maskCNPJ(cnpj: string, maskChar: string): string {
  if (cnpj.length === 14) {
    // XX.XXX.XXX/XXXX-XX -> **.***.***/****-XX
    return `${maskChar.repeat(2)}.${maskChar.repeat(3)}.${maskChar.repeat(3)}/${maskChar.repeat(4)}-${cnpj.slice(-2)}`;
  }
  return cnpj;
}

function maskEmail(email: string, maskChar: string): string {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;
  
  const maskedLocal = localPart.length > 2 
    ? localPart[0] + maskChar.repeat(localPart.length - 2) + localPart.slice(-1)
    : maskChar.repeat(localPart.length);
  
  return `${maskedLocal}@${domain}`;
}

function maskCreditCard(card: string, maskChar: string): string {
  if (card.length >= 13 && card.length <= 19) {
    // Show first 4 and last 4 digits
    const masked = card.slice(0, 4) + maskChar.repeat(card.length - 8) + card.slice(-4);
    // Format with spaces every 4 digits
    return masked.replace(/(\d{4})/g, '$1 ').trim();
  }
  return card;
}

function applyCustomPattern(content: string, pattern: string, maskChar: string): string {
  // Pattern uses 'X' for visible chars and '*' for masked chars
  // Example: "XXX-***-XXXX" for phone-like pattern
  let result = '';
  let contentIndex = 0;
  
  for (let i = 0; i < pattern.length && contentIndex < content.length; i++) {
    const patternChar = pattern[i];
    
    if (patternChar === 'X') {
      result += content[contentIndex];
      contentIndex++;
    } else if (patternChar === '*') {
      result += maskChar;
      contentIndex++;
    } else {
      result += patternChar;
    }
  }
  
  return result;
}

function maskGeneric(content: string, maskChar: string, preserveStart: number, preserveEnd: number): string {
  const totalPreserve = preserveStart + preserveEnd;
  
  if (content.length <= totalPreserve) {
    return content;
  }
  
  const start = content.slice(0, preserveStart);
  const end = content.slice(-preserveEnd || content.length);
  const middle = maskChar.repeat(content.length - totalPreserve);
  
  return start + middle + end;
}

// Utility function for form inputs
export function formatWithMask(value: string, pattern: MaskOptions['pattern']): string {
  return maskContent(value, { pattern });
}

// Hook for form handling
export function useMaskedInput(pattern: MaskOptions['pattern']) {
  return {
    format: (value: string) => formatWithMask(value, pattern),
    mask: (value: string, options?: Omit<MaskOptions, 'pattern'>) => 
      maskContent(value, { pattern, ...options })
  };
}