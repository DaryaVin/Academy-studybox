import React, { useEffect, useRef, useState } from 'react';
import "./datesFields.scss";
import { Card } from '../../UI/Card/card.tsx';
import { DateField } from '../../UI/DateField/dateField.tsx';
import { CalendarCard } from '../../UI/Calendar/calendar.tsx';
import { ResetButton } from '../../UI/ResetButton/resetButton.tsx';

interface DatesFieldsProps extends React.HTMLAttributes<HTMLDivElement> {
  departureAt: string | undefined,
  setDepartureAt: (v: string | undefined) => void,
  returnAt: string | undefined,
  setReturnAt: (v: string | undefined) => void,

}
export const DatesFields = ({ departureAt, setDepartureAt, returnAt, setReturnAt, ...props}: DatesFieldsProps) => {
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const now = new Date();

  const convertDateToStr = (date: Date): string => {
    const yearStr = date.getFullYear();
    const monthStr = ("0" + (date.getMonth() + 1)).slice(-2);
    const dayStr = ("0" + date.getDate()).slice(-2);
    return yearStr + "-" + monthStr + "-" + dayStr;
  }

  const datesFieldsComponent = useRef<HTMLDivElement>(null);
  useEffect(() => {

    const onClick = (e: MouseEvent | FocusEvent) => {
      if ((datesFieldsComponent.current instanceof Element)
        && (e.target instanceof Element)
        && (!datesFieldsComponent.current.contains(e.target))
      ) {

        setShowCalendar(false);
      } else {
        setShowCalendar(true);
      }
    }
    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onClick)
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onClick);
    }
  }, []);

  useEffect(() => {
    setDateStart(departureAt === undefined || departureAt === "" ? null : new Date(departureAt));
  }, [departureAt]);

  useEffect(() => {
    setDateEnd(returnAt === undefined || returnAt === "" ? null : new Date(returnAt));
  }, [returnAt]);

  useEffect(() => {
    setDepartureAt(dateStart === null ? undefined : convertDateToStr(dateStart))
  }, [dateStart])

  useEffect(() => {
    setReturnAt(dateEnd === null ? undefined : convertDateToStr(dateEnd))
  }, [dateEnd])
  return (
    <div {...props} className={'datesFields'  + (props.className ? " " + props.className : "")} ref={datesFieldsComponent}>
      <Card className='datesFields__fields'>
        {
          dateStart === null
            ? <span className='datesFields__placeholder datesFields__placeholder_start'>Туда</span>
            : <div className='datesFields__dateWrap'>
              <ResetButton
                onClick={() => { setDateStart(null) }}
              />
              <DateField
                state={dateStart}
                setState={setDateStart}
                minDate={now}
              />
              <span></span>
            </div>
        }
        <div className='datesFields__icon'>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {
          dateEnd === null
            ? <span className='datesFields__placeholder datesFields__placeholder_end'>Обратно</span>
            : <div className='datesFields__dateWrap'>
              <span></span>
              <DateField
                state={dateEnd}
                setState={setDateEnd}
                minDate={now}
              />
              <ResetButton
                onClick={() => { setDateEnd(null) }}
              />
            </div>
        } 
      </Card>
      {
        showCalendar && <Card className='datesFields__calendar'>
          <CalendarCard
            state={dateStart}
            setState={setDateStart}
            state2={dateEnd}
            setState2={setDateEnd}
            minDate={now}
          />
        </Card>
      }
    </div>
  )
}
