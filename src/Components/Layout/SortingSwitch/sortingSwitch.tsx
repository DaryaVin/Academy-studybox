import React, { useContext } from 'react';
import "./sortingSwitch.scss";
import { FilterContext } from '../App/App.tsx';

export const SortingSwitch = ({...props}:React.HTMLAttributes<HTMLDivElement>) => {
  const { state: filterFieldsState, dispatch: filterFieldsDispatch } = useContext(FilterContext);
  const OnChange = (val: "price" | "route") => {
    filterFieldsDispatch({
      type: "onChangeSorting",
      payload: val,
    })
  }
  return (
    <div {...props} className={'sortingSwitch' + (props.className ? " " + props.className : "")}>
      <label
        className={
          'sortingSwitch__item'
          + (filterFieldsState.sorting === "price" ? " sortingSwitch__item_checked" : "")
        }>
        <input
          type='radio'
          name='SortingSwitch'
          value={"price"}
          onChange={() => { OnChange("price") }}
          checked={filterFieldsState.sorting === "price"}
        />
        Самый дешевый
      </label>
      <label className={
        'sortingSwitch__item'
        + (filterFieldsState.sorting === "route" ? " sortingSwitch__item_checked" : "")
      }>
        <input
          type='radio'
          name='SortingSwitch'
          value={"route"}
          onChange={() => { OnChange('route') }}
          checked={filterFieldsState.sorting === "route"}
        />
        Самый популярный
      </label>
    </div>
  )
}
