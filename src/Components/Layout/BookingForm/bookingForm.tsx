import React, { useEffect, useState } from 'react';
import "./bookingForm.scss";
import { useValidationFieldForm } from '../../../hooks/useValidationFieldForm.ts';
import { FieldText } from '../../UI/FieldText/FieldText.tsx';
import { ValidationMessage } from '../../UI/ValidationMessage/validationMessage.tsx';
import { Card } from '../../UI/Card/card.tsx';
import ReactInputMask from 'react-input-mask';
import { AirTickerAPI, ResponseBookingAirTicker} from '../../../API/AirTickersAPI.ts';

interface BookingFormProps {

}
export const BookingForm = ({ }: BookingFormProps) => {
  const [fullName, setFullName] = useState<{
    firstName: string,
    lastName: string,
    patronymic: string | null,
  }>({
    firstName: '',
    lastName: '',
    patronymic: '',
  });

  const [orderEmail, setOrderEmail] = useState<string>("");
  const [orderPhone, setOrderPhone] = useState<string>("");

  const orderEmailValidator = useValidationFieldForm(orderEmail, {
    required: "Email является обязательной информацией для оформления брони номера",
    isEmail: true,
  })
  const orderPhoneValidator = useValidationFieldForm(orderPhone, {
    isPhone: true,
  })

  const firstNameValidator = useValidationFieldForm(fullName.firstName, {
    required: "Поле имени обязательно к заполнению",
    onlyRussianAndEnglishLetters: true,
  })
  const lastNameValidator = useValidationFieldForm(fullName.lastName, {
    required: "Поле фамилии обязательно к заполнению",
    onlyRussianAndEnglishLetters: true,
  })
  const patronymicValidator = useValidationFieldForm(fullName.patronymic, {
    required: fullName.patronymic === null ? false : "Поле отчества должно быть или удалено, или заполнено",
    onlyRussianAndEnglishLetters: fullName.patronymic === null ? false : true,
  })

  const [bookingResponse, setBookingResponse] = useState<ResponseBookingAirTicker | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const responseBooking = await AirTickerAPI.bookingAirTicker({
      fullName: fullName,
      email:orderEmail,
      phone: orderPhone === "" ? undefined : orderPhone,
    });
      await setBookingResponse(responseBooking)
   }

   if (bookingResponse === null) {
     return (
       <form onSubmit={onSubmit} className='bookingForm'>
         <fieldset className={"bookingForm__fieldset"}>
           <legend>
             Полное имя:
           </legend>
           <FieldText
             value={fullName.lastName}
             placeholder='Фамилия'
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName({ ...fullName, lastName: e.target.value })}
             onBlur={() => lastNameValidator.setIsDirty(true)}
           />
           <ValidationMessage key={"lastNameValidator"} {...lastNameValidator} />
           <FieldText
             value={fullName.firstName}
             placeholder='Имя'
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName({ ...fullName, firstName: e.target.value })}
             onBlur={() => firstNameValidator.setIsDirty(true)}
           />
           <ValidationMessage key="firstNameValidator" {...firstNameValidator} />
           {
             fullName.patronymic !== null
               ? <>
                 <FieldText
                   value={fullName.patronymic}
                   placeholder='Отчество'
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName({ ...fullName, patronymic: e.target.value })}
                   onBlur={() => patronymicValidator.setIsDirty(true)}
                 >
                   <button key={"delButton"}
                     type="button"
                     className='dellPatronymicButton'
                     onClick={() => setFullName({ ...fullName, patronymic: null })}
                   >
                     Удалить отчество
                   </button>
                 </FieldText>
                 <ValidationMessage key={"patronymicValidator"} {...patronymicValidator} />
               </>
               : <button key={"addPatronymicButton"}
               className='addPatronymicButton'
                 type="button"
                 onClick={() => setFullName({ ...fullName, patronymic: "" })}
               >
                 Добавить отчество
               </button>
           }
         </fieldset>
         <fieldset className={"bookingForm__fieldset"}>
           <legend >
             Email:
           </legend>
           <FieldText
             type="email"
             value={orderEmail}
             placeholder='Email'
             onChange={(e) => { setOrderEmail(e.target.value) }}
             onBlur={() => orderEmailValidator.setIsDirty(true)}
           />
           <ValidationMessage key={"validator"} {...orderEmailValidator} />
         </fieldset>
         <fieldset className={"bookingForm__fieldset"}>
           <legend>
             Телефон (необязательно):
           </legend>
           <Card>
             <ReactInputMask key={"input"}
             className="bookingForm__phone"
               mask={"+9-999-999-99-99"}
               placeholder='+_ ___ ___ __ __'
               value={orderPhone}
               onChange={(e) => { setOrderPhone(e.target.value) }}
               onBlur={() => orderPhoneValidator.setIsDirty(true)}
             />
           </Card>
           {
             orderPhone ? <ValidationMessage key={"validator"} {...orderPhoneValidator} /> : ""
           }
         </fieldset>
   
         <button
         className='bookingForm__btnSubmit'
           disabled={!(
             orderEmailValidator.isValid
             && (orderPhoneValidator.isValid || !orderPhone)
             && firstNameValidator.isValid
             && lastNameValidator.isValid
             && patronymicValidator.isValid
           )}
         >
           Забронировать
         </button>
       </form>
     )
   }
   if (bookingResponse !== null && bookingResponse.success) {
    return (
      <div className='bookingForm_successBooking'>
        Билет успешно забронирован!!!
      </div>
    )
   }
   if (bookingResponse !== null && !bookingResponse.success) {
    return (
      <div className='bookingForm_errorBooking'>
        При бронировании произошла ошибка, поробуйте забронировать билет еще раз!
        <button type='button' onClick={() => { setBookingResponse(null) }}>Попробовать еще раз</button>
      </div>
    )
   }
}
