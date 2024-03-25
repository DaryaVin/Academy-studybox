import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import "./searchForm.scss";
import { FilterContext } from '../App/App.tsx';
import { CityField } from '../CityField/cityField.tsx';
import { DatesFields } from '../DatesFields/datesFields.tsx';
import { CityItem } from '../../../Type/type';
import { AirTickerAPI } from '../../../API/AirTickersAPI.ts';

export const SearchForm = ({...props}:React.FormHTMLAttributes<HTMLFormElement>) => {
  const { state: filterFieldsState, dispatch: filterFieldsDispatch } = useContext(FilterContext);
  const [fullCitiesList, setFullCytiesList] = useState<CityItem[]>([]);
  const [origin, setOrigin] = useState<string | undefined>(filterFieldsState.origin);
  const [destination, setDestination] = useState<string | undefined>(filterFieldsState.destination);
  const [departureAt, setDepartureAt] = useState<string | undefined>(filterFieldsState.departure_at);
  const [returnAt, setReturnAt] = useState<string | undefined>(filterFieldsState.return_at);


  useEffect(() => {
    setOrigin(filterFieldsState.origin)
  }, [filterFieldsState.origin]);
  useEffect(() => {
    setDestination(filterFieldsState.destination)
  }, [filterFieldsState.destination]);
  useEffect(() => {
    setDepartureAt(filterFieldsState.departure_at)
  }, [filterFieldsState.departure_at]);
  useEffect(() => {
    setReturnAt(filterFieldsState.return_at)
  }, [filterFieldsState.return_at]);

  const onClickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    filterFieldsDispatch({
      type: "onChangeOrigin",
      payload: origin,
    });
    filterFieldsDispatch({
      type: 'onChangeDestination',
      payload: destination,
    });
    filterFieldsDispatch({
      type: "onChangeDepartureAt",
      payload: departureAt,
    });
    filterFieldsDispatch({
      type: "onChangeReturnAt",
      payload: returnAt,
    });
  }

  const getFullCytiesList = async () => {
    const newBrandsList = await AirTickerAPI.getData("cities");
    setFullCytiesList(newBrandsList);
  }
  useLayoutEffect(() => {
    getFullCytiesList();
  }, [])

  return (
    <form {...props} className={'searchForm' + (props.className ? " " + props.className : "")} onSubmit={onClickSubmit}>
      <CityField
      className='searchForm__origin'
        cityValue={origin}
        placeholder='Откуда'
        onChangeCity={setOrigin}
        fullCitiesList={fullCitiesList}
      />
      <CityField
      className='searchForm__destination'
        cityValue={destination}
        placeholder='Куда'
        onChangeCity={setDestination}
        fullCitiesList={fullCitiesList}
      />
      <DatesFields
      className='searchForm__dates'
        departureAt={departureAt}
        setDepartureAt={setDepartureAt}
        returnAt={returnAt}
        setReturnAt={setReturnAt}
      />
      <button className='searchForm__btnSubmit'>
        Найти билеты
      </button>
    </form>
  )
}
