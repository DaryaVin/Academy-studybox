import React, { useContext } from 'react';
import "./transfersSwitch.scss";
import { FilterContext } from '../App/App.tsx';
import { Card } from '../../UI/Card/card.tsx';
import { RadioBox } from '../../UI/RadioBox/radioBox.tsx';


export const TransfersSwitch = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { state: filterFieldsState, dispatch: filterFieldsDispatch } = useContext(FilterContext);
  const OnChange = (val: boolean) => {
    filterFieldsDispatch({
      type: "onChangeDirect",
      payload: val,
    })
  }
  return (
    <div {...props} className={'transfersSwitch' + (props.className ? " " + props.className : "")}>
      <Card className='transfersSwitch__wrap'>
        <h3>Количество пересадок:</h3>
        <div className='transfersSwitch__listItem'>
          <RadioBox
            label='Любое количество'
            name='transfersSwitch'
            value={"all"}
            onChange={() => { OnChange(false) }}
            checked={!filterFieldsState.direct}
            className={
              'transfersSwitch__item'
              + (!filterFieldsState.direct ? " transfersSwitch__item_checked" : "")
            }
          />
          {/* <label
          className={
            'transfersSwitch__item'
            + (!filterFieldsState.direct ? " transfersSwitch__item_checked" : "")
          }>
          <input
            type='radio'

          />
          Любое количество
        </label> */}
          <RadioBox
            label='Без пересадок'
            name='transfersSwitch'
            value={"direct"}
            onChange={() => { OnChange(true) }}
            checked={filterFieldsState.direct}
            className={
              'transfersSwitch__item'
              + (filterFieldsState.direct ? " transfersSwitch__item_checked" : "")
            }
          />
          {/* <label className={
          'transfersSwitch__item'
          + (filterFieldsState.direct ? " transfersSwitch__item_checked" : "")
        }>
          <input
            type='radio'
            name='transfersSwitch'
            value={"direct"}
            onChange={() => { OnChange(true) }}
            checked={filterFieldsState.direct}
          />
          Без пересадок
        </label> */}

        </div>
      </Card>
    </div>
  )
}
