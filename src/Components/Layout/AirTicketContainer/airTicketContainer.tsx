import React, { useContext, useEffect, useState } from 'react';
import "./airTicketContainer.scss";
import { AirTickerItem } from '../../../Type/type.ts';
import { FilterContext } from '../App/App.tsx';
import { AirTickerAPI, GetAirTickersProps } from '../../../API/AirTickersAPI.ts';
import { AirTickersList } from '../AirTickersList/airTickersList.tsx';

export const AirTicketContainer = ({...props}: React.HTMLAttributes<HTMLDivElement>) => {
  const { state: filterFieldsState, dispatch: filterFieldsDispatch } = useContext(FilterContext);
  const [airTicketList, setAirTicketList] = useState<AirTickerItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [isLouding, setIsLouding] = useState<boolean>(false);


  const getNewAirTickets = async () => {
    if (typeof filterFieldsState.origin === 'string') {
      const newFilterProps: GetAirTickersProps = {
        origin: filterFieldsState.origin
      };
      for (const key in filterFieldsState) {
        if (filterFieldsState[key] !== undefined) {
          newFilterProps[key] = filterFieldsState[key];
        }
      }
      newFilterProps.page = currentPage;
      const newAirTickerList = await AirTickerAPI.getAirTickets(newFilterProps);
      
      await setAirTicketList((prev) => { return [...prev, ...newAirTickerList] });
      if (newAirTickerList.length < 30) {
        await setShowBtn(false);
      } else {
        await setShowBtn(true);
      }
    }
  }

  const onChangeFilter = async () => {
    await setIsLouding(true);
    await setAirTicketList(() => { return [] });
    await setCurrentPage(() => { return 1 });
    await getNewAirTickets();
    await setIsLouding(false);
  }
  useEffect(() => {
    onChangeFilter();
  }, [
    filterFieldsState.origin,
    filterFieldsState.destination,
    filterFieldsState.departure_at,
    filterFieldsState.return_at,
    filterFieldsState.sorting,
    filterFieldsState.direct,
  ]);


  const onChangePage = async () => {
    await setIsLouding(true);
    await getNewAirTickets();
    await setIsLouding(false);
  }
  useEffect(() => {
    onChangePage();
  }, [currentPage])

  return (
    <div {...props} className={'airTicketContainer' + (props.className ? " " + props.className : "")}>
      {
        isLouding && <div>
          Идет загрузка
        </div>
      }
      {
        airTicketList.length === 0  && !isLouding 
        ? <div>
          Подходящего билета не найдено!
        </div>
          : <AirTickersList
          AirTickersArr={airTicketList}
        />
      }
      
      {
        showBtn && airTicketList.length >= 30
        && <button
          className='airTicketContainer__LoadMoreAirTickersButton'
          type='button'
          onClick={() => { setCurrentPage((prev: number) => { return prev + 1 }) }}
          disabled={isLouding}
        >
          Загрузить еще билеты
        </button>
      }
    </div>
  )
}
