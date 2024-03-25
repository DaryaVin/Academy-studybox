import React, { useEffect, useState } from "react";

const getFullSet = (n: number) => {
  return Array(n)
    .fill(0)
    .map((e, i, arr) => {
      if ((i + 1) < 10) return "0" + (i + 1);
      return i + 1;
    }).join(" ");
}

const prependZerosFunc = (value: string, maxLength: number): string => {
  for (let i = value.length; i < maxLength; i++) {
    value = "0" + value;
  }
  return value;
}

const validateDateElement = (ElementsBetweenDatesStr: string) => {
  const fn = (value: string) => {
    const regex = RegExp('\\b' + value + '| \\b0' + value);
    if (regex.test(ElementsBetweenDatesStr)) return value;
    return value.slice(0, value.length - 1);
  }
  return fn;
}

const getElementsBetweenDates = (minDate: Date, maxDate: Date) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const daysBetweenDates = (maxDate.getTime() - minDate.getTime()) / oneDay;
  const fullSetDays = getFullSet(31);
  const fullSetMonth = getFullSet(12);
  let setDays = "";
  let setMonths = "";
  let setYears = "";

  switch (daysBetweenDates) {
    case 0 - 61: {
      for (let currentDate = minDate.getTime();
        currentDate <= maxDate.getTime();
        currentDate += oneDay) {
        let date = new Date();
        date.setTime(currentDate);
        setDays += " " + date.getDate();
        setMonths += " " + (date.getMonth() + 1);
        setYears += date.getFullYear() + "";
      }
      break;
    }
    case 62 - 364: {
      for (let currentDate = minDate.getTime();
        currentDate <= maxDate.getTime();
        currentDate += oneDay * 30) {
        let date = new Date();
        date.setTime(currentDate);
        setMonths += " " + (date.getMonth() + 1);
        setYears += " " + date.getFullYear();
      };
      setDays = fullSetDays;
      break;
    }
    default: {
      for (let currentDate = minDate.getTime();
        currentDate <= maxDate.getTime();
        currentDate += oneDay * 365) {
        let date = new Date();
        date.setTime(currentDate);
        setYears += date.getFullYear() + " ";
      };
      setDays = fullSetDays;
      setMonths = fullSetMonth;
      break;
    }
  }
  return {
    days: setDays,
    months: setMonths,
    years: setYears
  }
}

interface stateDatePart {
  state: string,
  setState: (v: string) => void,
  onChange: (v: string) => string,
}
export interface fullDateState {
  day: stateDatePart,
  month: stateDatePart,
  year: stateDatePart,
}

export const useDateState = (
  state: Date | null | undefined,
  setState: (date: Date | null) => void,
  minDate?: Date | null,
  maxDate?: Date | null,
) => {
  if (state === undefined) setState(null);
  let [stateDay, setStateDay] = useState<string>(state ? prependZerosFunc(state.getDate().toString(), 2) : "");
  let [stateMonth, setStateMonth] = useState<string>(state ? prependZerosFunc((state.getMonth() + 1).toString(), 2) : "");
  let [stateYear, setStateYear] = useState<string>(state ? prependZerosFunc(state.getFullYear().toString(), 4) : "");

  let onChangeDay = (value: string) => { return value };
  let onChangeMonth = (value: string) => { return value };
  let onChangeYear = (value: string) => { return value };

  const fullSetDays = getFullSet(31);
  const fullSetMonth = getFullSet(12);

  const onClear = () => { 
    setStateDay("");
    setStateMonth("");
    setStateYear("");
   }

  if (minDate && maxDate) {
    if (minDate > maxDate) {
      [minDate, maxDate] = [maxDate, minDate];
    }
    const ElementsBetweenDates = getElementsBetweenDates(minDate, maxDate);
    onChangeDay = validateDateElement(ElementsBetweenDates.days);
    onChangeMonth = validateDateElement(ElementsBetweenDates.months);
    onChangeYear = validateDateElement(ElementsBetweenDates.years);
  }
  if ((minDate && !maxDate) || ((!minDate && maxDate))) {
    onChangeDay = validateDateElement(fullSetDays);
    onChangeMonth = validateDateElement(fullSetMonth);
    onChangeYear = (value: string) => {
      let strToCompare = value;
      for (let i = value.length; i < 4; i++) {
        if (minDate) strToCompare += "9";
        if (maxDate) strToCompare += "0";
      }
      let fullYear = minDate ? minDate.getFullYear() : 0;
      fullYear = maxDate ? maxDate.getFullYear() : fullYear;

      if ((minDate && (+strToCompare < fullYear)) || (maxDate && (+strToCompare > fullYear))) {
        return value.slice(0, value.length - 1);
      }
      return value;
    }
  }
  if (!maxDate && !minDate) {
    onChangeDay = validateDateElement(fullSetDays);
    onChangeMonth = validateDateElement(fullSetMonth);
  }

  useEffect(() => {
    if (+stateMonth === 2) {
      if (+stateDay >= 29) {
        if (stateYear.length === 4) {
          if (!(+stateYear % 4)) {
            setStateDay(() => "29");
          } else {
            setStateDay(() => "28");
          }
        } else {
          setStateDay(() => "29");
        }
      }
    }
    if ([4, 6, 9, 11].includes(+stateMonth) && +stateDay > 30) {
      setStateDay(() => "30");
    }
    if (stateDay.length === 2 && stateMonth.length === 2 && stateYear.length === 4) {
      const dateToCompare = new Date(+stateYear, +stateMonth - 1, +stateDay);
      if (dateToCompare.getDate() === +stateDay
        && dateToCompare.getMonth() === +stateMonth - 1
        && dateToCompare.getFullYear() === +stateYear
      ) {
        if ((minDate && !maxDate && (dateToCompare < minDate))
          || (maxDate && !minDate && (dateToCompare > maxDate))
          || (maxDate && minDate && ((dateToCompare > maxDate) || (dateToCompare < minDate)))
        ) {
          alert("Нарушаны границы допустимой даты");
          setStateYear(() => "");
          setState(null);
        } else {
          setState(new Date(+stateYear, +stateMonth - 1, +stateDay))
        }
      }
    } else {
      setState(null);
    }
  }, [stateDay, stateMonth, stateYear]);
  useEffect(() => {
    setStateDay(state ? prependZerosFunc(state.getDate().toString(), 2) : stateDay);
    setStateMonth(state ? prependZerosFunc((state.getMonth() + 1).toString(), 2) : stateMonth);
    setStateYear(state ? prependZerosFunc(state.getFullYear().toString(), 4) : stateYear);
  }, [state]);

  return {
    day: {
      state: stateDay,
      setState: setStateDay,
      onChange: onChangeDay,
    },
    month: {
      state: stateMonth,
      setState: setStateMonth,
      onChange: onChangeMonth,
    },
    year: {
      state: stateYear,
      setState: setStateYear,
      onChange: onChangeYear,
    },
    onClear: onClear
  }
}
