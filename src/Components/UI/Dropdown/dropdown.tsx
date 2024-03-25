import React, { useEffect, useRef, useState } from 'react';
import "./dropdown.scss";
import { Card } from '../Card/card.tsx';

interface DropdownProps {
  buttonBlock: React.ReactNode,
  contenerBlock: React.ReactNode,
  className?: string,
  hasDropButton?: boolean,
}
export const Dropdown = ({ buttonBlock, className, contenerBlock, hasDropButton }: DropdownProps) => {
  let [show, setShow] = useState<boolean>(false);

  const onClickButtonBlock = (e: React.MouseEvent) => {
    const buttonBlock = e.currentTarget;
    const dropButton = Array.from(buttonBlock.getElementsByClassName("dropdown__dropButton"));
    if ((hasDropButton && dropButton.find((i) => i === e.target))
      || (!hasDropButton)
    ) {
      setShow(!show);
    }
  }

  const dropdownComponent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent | FocusEvent) => {
      if ((dropdownComponent.current instanceof Element)
        && (e.target instanceof Element)
        && (!dropdownComponent.current.contains(e.target))
      ) {
        setShow(false);
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
    <Card className={"dropdown " + (className || "")} ref={dropdownComponent}>
      <div
        className={"dropdown__buttonBlock" + (show ? " dropdown__buttonBlock_show" : "")}
        onClick={onClickButtonBlock}
      >
        <div className='dropdown__buttonBlockMainContent'>
          {buttonBlock}
        </div>
        <button
          type="button"
          className="dropdown__dropButton "
        >
          Кнопка выпадающего элемента
        </button>
      </div>
      <div key={"dropdown__contenerBlock"}
        className={"dropdown__contenerBlock" + (show ? " dropdown__contenerBlock_show" : "")}
      >
        {contenerBlock}
      </div>
    </Card>
  )
}
