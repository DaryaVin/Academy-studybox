import React, { useState } from 'react';
import "./airTickerItem.scss";
import { AirTickerItem } from '../../../Type/type.ts';
import { Card } from '../../UI/Card/card.tsx';
import { Modal } from '../../UI/Modal/modal.tsx';
import { BookingForm } from '../BookingForm/bookingForm.tsx';

interface FlightInfoProps {
  from: string,
  to: string,
  date: string,
  duration: number,
  transfer: number,
}
const FlightInfo = ({ from, to, date, duration, transfer }: FlightInfoProps) => {
  const newDate = new Date(date);
  const addZero = (val: string | number): string => {
    return ("0" + val).slice(-2);
  }
  const DateCorectFormat = addZero(newDate.getDate()) + "."
    + addZero((newDate.getMonth() + 1)) + "."
    + newDate.getFullYear() + "  "
    + addZero(newDate.getHours()) + ":"
    + addZero(newDate.getMinutes());

  const durationCorectFormat = Math.floor(duration / 60) + "ч " + duration % 60 + "м";
  return (
    <div className='flightInfo'>
      <div className='flightInfo__Item'>
        <span>
          {from + " - " + to}
        </span>
        <span>
          {DateCorectFormat}
        </span>
      </div>
      <div className='flightInfo__Item'>
        <span>
          В пути:
        </span>
        <span>
          {durationCorectFormat}
        </span>
      </div>
      <div className='flightInfo__Item'>
        <span>
          Пересадок:
        </span>
        <span>
          {transfer}
        </span>
      </div>

    </div>
  )
}

interface AirTickerItemProps {
  airTickerItem: AirTickerItem,
}
export const AirTickerItemCard = ({ airTickerItem }: AirTickerItemProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Card className='airTickerItem' onClick={() => { setShowModal(true) }}>
        <div className='flightInfo'>
          <div className='airTickerItem__price'>
            {airTickerItem.price.toLocaleString() + "Р"}
          </div>
          <div className='airTickerItem__airline'>
            <img src={"http://pics.avs.io/80/40/" + airTickerItem.airline + ".png"} alt="лого авиакомпании" />
            {/* {airTickerItem.airline} */}
          </div>
        </div>
        <FlightInfo
          from={airTickerItem.origin}
          to={airTickerItem.destination}
          date={airTickerItem.departure_at}
          duration={airTickerItem.duration_to}
          transfer={airTickerItem.transfers}
        />
        {
          airTickerItem.return_at
          && <FlightInfo
            from={airTickerItem.destination}
            to={airTickerItem.origin}
            date={airTickerItem.return_at}
            duration={airTickerItem.duration_back}
            transfer={airTickerItem.return_transfers}
          />
        }
      </Card>
      <Modal isActive={showModal} setIsActive={setShowModal}>
        <div className='AirTickerItem__bookingModal'>
          <h2>Забронировать билет:</h2>
          <Card className='airTickerItem' onClick={() => { setShowModal(true) }}>
            <div className='flightInfo'>
              <div className='airTickerItem__price'>
                {airTickerItem.price.toLocaleString() + "Р"}
              </div>
              <div className='airTickerItem__airline'>
                <img src={"http://pics.avs.io/80/40/" + airTickerItem.airline + ".png"} alt="лого авиакомпании" />
                {/* {airTickerItem.airline} */}
              </div>
            </div>
            <FlightInfo
              from={airTickerItem.origin}
              to={airTickerItem.destination}
              date={airTickerItem.departure_at}
              duration={airTickerItem.duration_to}
              transfer={airTickerItem.transfers}
            />
            {
              airTickerItem.return_at
              && <FlightInfo
                from={airTickerItem.destination}
                to={airTickerItem.origin}
                date={airTickerItem.return_at}
                duration={airTickerItem.duration_back}
                transfer={airTickerItem.return_transfers}
              />
            }
          </Card>
          <BookingForm/>
        </div>
      </Modal>
    </>
  )
}
