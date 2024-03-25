import React, { useEffect, useState } from 'react';
import "./modal.scss";
import { Card } from '../Card/card.tsx';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element,
  isActive: boolean,
  setIsActive: (v: boolean) => void,
}

export const Modal = ({ children, isActive, setIsActive, ...props }: ModalProps) => {
  const [show, setShow] = useState<boolean>(!isActive);
  const [display, setDisplay] = useState<boolean>(isActive);

  useEffect(() => {
    if (isActive) {
      setDisplay(isActive);
      setTimeout(() => setShow(isActive), 500);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(isActive);
      setTimeout(() => setDisplay(isActive), 500);
      document.body.style.overflow = 'unset';
    }
  }, [isActive]);

  let newClassName = 'modal' + (props.className ? " " + props.className : "");

  const toggleIsActive = () => {
    setShow(!show);
    setTimeout(() => setIsActive(!isActive), 500);
  }

  return (
    display
      ? <div {...props} className={newClassName + (show ? " modal_isActive" : "")} onClick={toggleIsActive}>
        <div key={"content"} className='modal_content'>

          <Card key={"card"} className='modal_window' onClick={(e) => { e.stopPropagation() }}>
            {
              children
            }
          </Card>
          <button key={"buttonClose"} type='button' className='modal__closeButton' onClick={toggleIsActive}>закрыть</button>
        </div>
      </div>
      : null
  )
}
