import { AES, enc } from "crypto-js";

export const hashValue = (
  value: string,
  phrase = process.env.REACT_APP_HASH_PHARSE
): string | undefined => {
  if (phrase) {
    const hashedValue: string = AES.encrypt(value, phrase).toString();
    return hashedValue;
  }
};

export const dehashValue = (
  hashedValue: string,
  phrase = process.env.REACT_APP_HASH_PHARSE
): string | undefined => {
  if (phrase) {
    const bytes = AES.decrypt(hashedValue, phrase);
    const originalValue: string = bytes.toString(enc.Utf8);
    return originalValue;
  }
};
