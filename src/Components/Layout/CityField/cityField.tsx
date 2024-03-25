import React, { useEffect, useRef, useState } from 'react';
import "./cityField.scss";
import { FieldText } from "../../UI/FieldText/FieldText.tsx";
import { CityItem } from '../../../Type/type.ts';
import { Card } from '../../UI/Card/card.tsx';


interface CityFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  cityValue: string | undefined,
  onChangeCity: (value: string | undefined) => void,
  fullCitiesList: CityItem[],
  placeholder?: string,
}
export const CityField = ({ cityValue, onChangeCity, fullCitiesList, placeholder, ...props}: CityFieldProps) => {
  const [currentCitiesList, setCurrentCytiesList] = useState<CityItem[]>([]);
  const [text, setText] = useState<string>("");
  const [showCityOptions, setShowCityOptions] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setText(e.target.value);
    setShowCityOptions(true);
    if (newValue === "") {
      onChangeCity(undefined);
    } else {
      let newCurrentCityList: CityItem[] = [];
      let indexCity = 0;
      while (newCurrentCityList.length < 10 && indexCity < fullCitiesList.length) {
        if (typeof fullCitiesList[indexCity].name === "string"
          && fullCitiesList[indexCity].name.toLocaleLowerCase().includes(newValue.toLocaleLowerCase())) {
          newCurrentCityList.push(fullCitiesList[indexCity])
        }
        indexCity++;
      }
      if (newCurrentCityList.length === 1
        && newCurrentCityList[0].name === newValue) {
        onChangeCity(newCurrentCityList[0].code);
      } else {
        setCurrentCytiesList(newCurrentCityList);
      }
    }
  }

  const onClickCity = (cityItem: CityItem) => {
    onChangeCity(cityItem.code);
    setText(cityItem.name);
    setShowCityOptions(false);
  }

  useEffect(() => {
    cityValue === undefined
      ? setText("")
      : fullCitiesList.forEach((city) => {
        if (city.code === cityValue) {
          setText(city.name)
        }
      })
  }, [cityValue]);

  const cityFieldComponent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent | FocusEvent) => {
      if ((cityFieldComponent.current instanceof Element)
        && (e.target instanceof Element)
        && (!cityFieldComponent.current.contains(e.target))
      ) {
        setShowCityOptions(false);
      }
    }
    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onClick)
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onClick);
    }
  }, []);


  return (
    <div {...props} className={'cityField' + (props.className ? " " + props.className : "")} ref={cityFieldComponent}>
      <FieldText
        wrapProps={{ className: 'cityField__input' }}
        value={text} onChange={onChange}
        placeholder={placeholder}
        onFocus={() => { setShowCityOptions(true) }}
      >
        <span className='cityField__cityCode'>{cityValue}</span>
      </FieldText>
      {
        currentCitiesList.length !== 0 && showCityOptions
        && <Card className='cityField__cityOptions'>
          <ul className='cityField__cityOptionsList'>
            {
              currentCitiesList.map((cityItem) => {
                return <li className='cityField__cityOptionsItem'>
                  <button
                    key={cityItem.code}
                    type='button'
                    onClick={() => { onClickCity(cityItem) }}
                    onKeyUp={(e) => { if (e.key === "Enter") onClickCity(cityItem) }}
                  >
                    <span className='cityField__cityOptionsItemName'>
                      {cityItem.name}
                    </span>
                    <span className='cityField__cityCode'>
                      {cityItem.code}
                    </span>
                  </button>
                </li>
              })
            }
          </ul>
        </Card>
      }
    </div>
  )
}
