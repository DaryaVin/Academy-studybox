import React from 'react';
import "./airTickersList.scss";
import { AirTickerItem } from '../../../Type/type';
import { AirTickerItemCard } from '../AirTickerItem/airTickerItem.tsx';

interface AirTickersListProps extends React.HTMLAttributes<HTMLUListElement> {
  AirTickersArr: AirTickerItem[],
}
export const AirTickersList = ({AirTickersArr, ...props}: AirTickersListProps) => {
  return (
    <ul {...props} className={'airTickersList' + (props.className ? " " + props.className : "")}>
      {
        AirTickersArr.map((ticker) => { 
          return <li key={ticker.flight_number + ticker.link}>
            <AirTickerItemCard
            airTickerItem={ticker}
            />
          </li>
         })
      }
    </ul>
  )
}
