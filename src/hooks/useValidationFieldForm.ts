import React, { useEffect, useState } from "react";

export interface useValidationFieldFormProps {
  value: any,
  valudations?: {
    required?: boolean | string,
    minLength?: number | {
      min: number,
      message?: string,
    },
    isEmail?: boolean | string,
    isAboveMinimum?: number | {
      min: number,
      message?: string,
    },
    isBelowMaximum?: number | {
      max: number,
      message?: string,
    },
    onlyRussianAndEnglishLetters?: boolean | string,
    isPhone?: boolean | string,
  }
}
interface validatorMessage {
  required?: string,
  minLength?: string,
  isEmail?: string,
  isAboveMinimum?: string,
  isBelowMaximum?: string,
  onlyRussianAndEnglishLetters?: string,
  isPhone?: string,
}
export interface useValidationFieldFormReturn {
  isDirty: boolean,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
  isValid: boolean,
  message: validatorMessage
}
export const useValidationFieldForm = (
  value: any,
  valudations?: {
    required?: boolean | string,
    minLength?: number | {
      min: number,
      message?: string,
    },
    isEmail?: boolean | string,
    isAboveMinimum?: number | {
      min: number,
      message?: string,
    },
    isBelowMaximum?: number | {
      max: number,
      message?: string,
    },
    onlyRussianAndEnglishLetters?: boolean | string,
    isPhone?: boolean | string,
  }
): useValidationFieldFormReturn => {
  const {
    required,
    minLength,
    isEmail,
    isAboveMinimum,
    isBelowMaximum,
    onlyRussianAndEnglishLetters,
    isPhone,
  } = valudations ? valudations : {
    required: undefined,
    minLength: undefined,
    isEmail: undefined,
    isAboveMinimum: undefined,
    isBelowMaximum: undefined,
    onlyRussianAndEnglishLetters: undefined,
    isPhone: undefined,
  };

  let firstValueIsDirty: boolean = false;
  if (Array.isArray(value)) {
    firstValueIsDirty = value.reduce((sum, item) => { return sum && !!item }, true);

  } else {
    firstValueIsDirty = !!value;
  }

  let [isDirty, setIsDirty] = useState<boolean>(firstValueIsDirty);
  let [isRequired, setIsRequired] = useState<boolean>(true);
  let [isMinLength, setIsMinLength] = useState<boolean>(true);
  let [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  let [isValidPhone, setIsValidPhone] = useState<boolean>(true);
  let [isAboveMinimumState, setIsAboveMinimumState] = useState<boolean>(true);
  let [isBelowMaximumState, setIsBelowMaximumState] = useState<boolean>(true);
  let [onlyRussianAndEnglishLettersState, setOnlyRussianAndEnglishLettersState] = useState<boolean>(true);
  const [message, setMessage] = useState<validatorMessage>({});

  useEffect(() => {
    let mess: validatorMessage = message;
    let requiredStatus = true;
    let minLengthStatus = true;
    let validEmailStatus = true;
    let validPhoneStatus = true;
    let isAboveMinimumStatus = true;
    let isBelowMaximumStatus = true;
    let onlyRussianAndEnglishLettersStatus = true;
    const validityСheckItem = (item: any) => {
      if (required) {
        if (item === "" || item === undefined || item === null) {
          mess.required = typeof (required) === "string" && required !== "" ? required : "Это поле должно быть заполнено";
          requiredStatus = false;
        } 
      }
      if (minLength) {
        if (typeof item === "string" || typeof item === "number") {
          const min = typeof minLength === "number" ? minLength : minLength.min;
          const length = typeof item === "string" ? item.length : item?.toString().length;
          if (length < min) {
            minLengthStatus = false;
            mess.minLength = typeof minLength !== "number" && minLength.message ? minLength.message : "Минимальная допустимая длина этого поля " + min + " символов";
          } 
        } else {
          minLengthStatus = false;
          mess.minLength = "Ошибка кода! Поле получает данные неожиданного формата"
        }
      }
      if (isEmail) {
        if (typeof item === "string") {
          const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
          if (!EMAIL_REGEXP.test(item)) {
            validEmailStatus = false;
            mess.isEmail = typeof isEmail === "string" ? isEmail : "В этом поле должен быть введен Email. Например abc@email.ru";
          } 
        } else {
          validEmailStatus = false;
          mess.isEmail = "Ошибка кода! Поле получает данные неожиданного формата"
        }
      }
      if (isPhone) {
        if (typeof item === "string") {
          const PHONE_REGEXP = /^[\+]?[0-9]{1}[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/iu;
          if (!PHONE_REGEXP.test(item)) {
            validPhoneStatus = false;
            mess.isPhone = typeof isPhone === "string" ? isPhone : "В этом поле должен быть введен телефон. Например +7 000 000 00 00";
          }
        } else {
          validPhoneStatus = false;
          mess.isPhone = "Ошибка кода! Поле получает данные неожиданного формата"
        }
      }
      if (isAboveMinimum) {

        if (typeof item === "number") {
          const min = typeof isAboveMinimum === "number" ? isAboveMinimum : isAboveMinimum.min;
          if (item < min) {
            isAboveMinimumStatus = false;
            mess.isAboveMinimum = typeof isAboveMinimum !== "number" && isAboveMinimum.message
              ? isAboveMinimum.message
              : "Данное поле должно быть не меньше " + min;
          }
        } else {
          isAboveMinimumStatus = false;
          mess.isAboveMinimum = "Ошибка кода! Поле получает данные неожиданного формата";
        }
      }
      if (isBelowMaximum) {
        if (typeof item === "number") {
          const max = typeof isBelowMaximum === "number" ? isBelowMaximum : isBelowMaximum.max;
          if (item > max) {
            isBelowMaximumStatus = false;
            mess.isBelowMaximum = typeof isBelowMaximum !== "number" && isBelowMaximum.message
              ? isBelowMaximum.message
              : "Данное поле должно быть не больше " + max;
          }
        } else {
          isAboveMinimumStatus = false;
          mess.isAboveMinimum = "Ошибка кода! Поле получает данные неожиданного формата";
        }
      }
      if (onlyRussianAndEnglishLetters) {
        if (typeof item === "string") {
          const RUS_ENG_REGEX = /^([а-яё\s]+|[a-z\s]+)$/iu;
          if (!RUS_ENG_REGEX.test(item)) {
            onlyRussianAndEnglishLettersStatus = false;
            mess.onlyRussianAndEnglishLetters = typeof onlyRussianAndEnglishLetters === "string"
              ? onlyRussianAndEnglishLetters
              : "В этом поле можно вводить или только русские буквы, или только английские";
          }
        } else {
          onlyRussianAndEnglishLettersStatus = false;
          mess.onlyRussianAndEnglishLetters = "Ошибка кода! Поле получает данные неожиданного формата";
        }
      }
    }
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) {
        validityСheckItem(value[index]);
        if (!(
          requiredStatus
          && minLengthStatus
          && validEmailStatus
          && validPhoneStatus
          && isAboveMinimumStatus
          && isBelowMaximumStatus
          && onlyRussianAndEnglishLettersStatus
        )) break;
      }
    } else {
      validityСheckItem(value);
    }
    if (requiredStatus) mess.required = "";
    if (minLengthStatus) mess.minLength = "";
    if (validEmailStatus) mess.isEmail = "";
    if (validPhoneStatus) mess.isPhone = "";
    if (isAboveMinimumStatus) mess.isAboveMinimum = "";
    if (isBelowMaximumStatus) mess.isBelowMaximum = "";
    if (onlyRussianAndEnglishLettersStatus) mess.onlyRussianAndEnglishLetters = "";

    setIsRequired(requiredStatus);
    setIsMinLength(minLengthStatus);
    setIsValidEmail(validEmailStatus);
    setIsAboveMinimumState(isAboveMinimumStatus);
    setIsBelowMaximumState(isBelowMaximumStatus);
    setOnlyRussianAndEnglishLettersState(onlyRussianAndEnglishLettersStatus);
    setIsValidPhone(validPhoneStatus);

    setMessage(mess);

  }, Array.isArray(value) ? [...value] : [value]);

  return {
    isDirty,
    setIsDirty,
    isValid: isRequired
      && isMinLength
      && isValidEmail
      && isValidPhone
      && isAboveMinimumState
      && isBelowMaximumState
      && onlyRussianAndEnglishLettersState,
    message
  }
}
