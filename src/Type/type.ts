export interface CountriesItem {
  code: string,
  name: string,
  currency: string,
  name_translations: {
    de: string,
    en: string,
    "zh-CN": string,
    tr: string,
    ru: string,
    fr: string,
    es: string,
    it: string,
    th: string
  }
}

export interface CityItem {
  "code": string,
  "name": string,
  "coordinates": {
    "lon": number,
    "lat": number
  },
  "time_zone": string,
  "name_translations": {
    "de": string,
    "en": string,
    "zh-CN": string,
    "tr": string,
    "ru": string,
    "it": string,
    "es": string,
    "fr": string,
    "th": string
  },
  "country_code": string
}

export interface AirportItem {
  "code": string,
  "name": string,
  "iata_type": string,
  "flightable": boolean,
  "coordinates": {
    "lon": number,
    "lat": number
  },
  "time_zone": string,
  "name_translations": {
    "de": string,
    "en": string,
    "tr": string,
    "it": string,
    "fr": string,
    "es": string,
    "th": string
  },
  "country_code": string,
  "city_code": string
}

export interface AirlineItem {
  "name": string | null,
  "code": string,
  "is_lowcost": boolean,
  "name_translations": {
    [key: string]: string
  }
}

export interface AllianceItem {
  "name": string,
  "airlines": string[]
}

export interface PlaneItem {
  "code": string,
  "name": string
}

export interface RouteItem {
  "airline_iata": string | null,
  "airline_icao": string | null,
  "departure_airport_iata": string | null,
  "departure_airport_icao": string | null,
  "arrival_airport_iata": string | null,
  "arrival_airport_icao": string | null,
  "codeshare": boolean,
  "transfers": number,
  "planes": string[]
}

export interface AirTickerItem {
  "origin": string,
  "destination": string,
  "origin_airport": string,
  "destination_airport": string,
  "price": number,
  "airline": string,
  "flight_number": string,
  "departure_at": string,
  "return_at": string,
  "transfers": number,
  "return_transfers": number,
  "duration": number,
  "duration_to": number,
  "duration_back": number,
  "link": string,
  "currency": string,
}


export interface FilterFieldStateType {
  origin: string | undefined,
  destination: string | undefined,
  departure_at?: string | undefined,
  return_at?: string | undefined,
  direct?: boolean,
  sorting?: "price" | "route",
}

interface onChangeOriginAction {
  type: "onChangeOrigin",
  payload: string | undefined,
}
interface onChangeDestinationAction {
  type: "onChangeDestination",
  payload: string | undefined,
}
interface onChangeDepartureAtAction {
  type: "onChangeDepartureAt",
  payload: string | undefined,
}
interface onChangeReturnAtAction {
  type: "onChangeReturnAt",
  payload: string | undefined,
}
interface onChangeDirectAction {
  type: "onChangeDirect",
  payload: boolean,
}
interface onChangeSortingAction {
  type: "onChangeSorting",
  payload: "price" | "route",
}

export type ActionType = onChangeOriginAction
  | onChangeDestinationAction
  | onChangeDepartureAtAction
  | onChangeReturnAtAction
  | onChangeDirectAction
  | onChangeSortingAction;