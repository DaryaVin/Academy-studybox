import React, { useEffect, useState } from "react";
import CalendarReact, { CalendarProps } from "react-calendar";
import "./calendar.scss";
import { OnArgs, Value } from "react-calendar/dist/cjs/shared/types";


interface CalendarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  state: Date | null,
  state2?: Date | null,
  setState: (v: Date | null) => void,
  setState2?: (v: Date | null) => void,
  minDate?: Date | null,
  maxDate?: Date | null,
  propsForCalendar?: CalendarProps,
  onChangeValue?: (values: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
export const CalendarCard = ({
  onChangeValue,
  state,
  setState,
  state2,
  setState2,
  minDate,
  maxDate,
  className,
  propsForCalendar,
  ...props
}: CalendarCardProps) => {
  let newMinDate = minDate ? minDate : undefined;
  let newMaxDate = maxDate ? maxDate : undefined;
  if (newMinDate) newMinDate.setHours(0, 0, 0, 0);
  if (newMaxDate) newMaxDate.setHours(23, 59, 59, 999);

  let value: Date | null | [Date | null, Date | null] = state2 ? [state, state2] : state;

  const onChange = (values: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // setState(values[0]);
    if (!Array.isArray(values)) setState(values);
    if (Array.isArray(values) && values[1] && setState2) {
      setState(values[0]);
      setState2(values[1]);
    }
    if (onChangeValue) {
      onChangeValue(values, event);
    }
  }

  const formatMonthYearFunc = (locale: string | undefined, date: Date): string => {
    return date.toLocaleString(locale, { month: 'long', year: 'numeric' }).slice(0, -2);
  }

  let [activeStartDateState, setActiveStartDateState] = useState<Date | undefined>(undefined);

  const onActiveStartDateChange = ({ action }: OnArgs) => {
    switch (action) {
      case "prev": {
        setActiveStartDateState(activeStartDateState instanceof Date ?
          new Date(activeStartDateState.getFullYear(), activeStartDateState.getMonth() - 1)
          : undefined
        );
        break;
      }
      case "next": {
        setActiveStartDateState(activeStartDateState instanceof Date ?
          new Date(activeStartDateState.getFullYear(), activeStartDateState.getMonth() + 1)
          : undefined
        );
        break;
      }
      default: setActiveStartDateState(activeStartDateState);
    }
  }

  useEffect(() => {
    setActiveStartDateState(() => state instanceof Date
      ? new Date(state.getFullYear(), state.getMonth())
      : undefined
    );
  }, [state]);
  return (
    <div {...props} className={"calendarCard" + (className ? " " + className : "")}>
      <CalendarReact key={"CalendarReact"}
        {...propsForCalendar}
        value={value}
        onChange={onChange}
        minDate={newMinDate}
        maxDate={newMaxDate}
        // tileDisabled={tileDisabledFunc}
        className={"calendarCard__calendar"}
        locale="ru-Ru"
        prev2Label={null}
        next2Label={null}
        prevLabel={""}
        nextLabel={""}
        activeStartDate={activeStartDateState}
        onActiveStartDateChange={onActiveStartDateChange}
        view="month"
        formatMonthYear={formatMonthYearFunc}
        selectRange={setState2 ? true : false}
      />
    </div>
  )
}
