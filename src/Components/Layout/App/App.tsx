import React, { createContext, useReducer, useState } from 'react';
import './App.scss';
import { ActionType, CityItem, FilterFieldStateType } from '../../../Type/type.ts';
import { SearchForm } from '../SearchForm/searchForm.tsx';
import { SortingSwitch } from '../SortingSwitch/sortingSwitch.tsx';
import { TransfersSwitch } from '../TransfersSwitch/transfersSwitch.tsx';
import { AirTicketContainer } from '../AirTicketContainer/airTicketContainer.tsx';

const initialState: FilterFieldStateType = {
  origin: undefined,
  destination: undefined,
  departure_at: undefined,
  return_at: undefined,
  sorting: "price",
  direct: false,
}

const reducer = (state: FilterFieldStateType, action: ActionType) => {
  switch (action.type) {
    case "onChangeOrigin": return { ...state, origin: action.payload }
    case "onChangeDepartureAt": return { ...state, departure_at: action.payload }
    case "onChangeDestination": return { ...state, destination: action.payload }
    case "onChangeDirect": return { ...state, direct: action.payload }
    case "onChangeReturnAt": return { ...state, return_at: action.payload }
    case "onChangeSorting": return { ...state, sorting: action.payload }
    default: return state
  }
};

export const FilterContext = createContext<{ state: FilterFieldStateType, dispatch: React.Dispatch<ActionType> }>({
  state: initialState,
  dispatch: () => null,
});


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filterShow, setFilterShow] = useState<boolean>(false);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <div className="wrapApp">
          <h1 className='App__header'>Упрощенный сервис поиска авиа-билетов</h1>
          <SearchForm className={"App__SearchForm"}/>
          <TransfersSwitch className='App__TransfersSwitch'/>
          <SortingSwitch className={"App__SortingSwitch"}/>
          <AirTicketContainer className='App__AirTicketContainer'/>
          {/* <button
            type="button"
            className={"burgerButton" + (filterShow ? " burgerButton_show" : "")}
            onClick={() => { setFilterShow(!filterShow) }}
          >
            Открыть/скрыть фильтр
            <span></span>
          </button> */}
        </div>
      </div>
    </FilterContext.Provider>
  );
}

export default App;
