import {
  AirTickerItem,
  AirlineItem,
  AirportItem,
  AllianceItem,
  CityItem,
  CountriesItem,
  PlaneItem,
  RouteItem
} from "../Type/type";

type getDataProps = {
  (type: "countries"): Promise<CountriesItem[]>,
  (type: "cities"): Promise<CityItem[]>,
  (type: "airports"): Promise<AirportItem[]>,
  (type: "airlines"): Promise<AirlineItem[]>,
  (type: "alliances"): Promise<AllianceItem[]>,
  (type: "planes"): Promise<PlaneItem[]>,
  (type: "routes"): Promise<RouteItem[]>,
  (type: "countries"
    | "cities"
    | "airports"
    | "airlines"
    | "alliances"
    | "planes"
    | "routes"): Promise<any>
}

const getData: getDataProps = async (type:
  "countries"
  | "cities"
  | "airports"
  | "airlines"
  | "alliances"
  | "planes"
  | "routes"
): Promise<CountriesItem[] | CityItem[] | AirportItem[] | AirlineItem[] | AllianceItem[] | PlaneItem[] | RouteItem[] | any> => {
  const response = await fetch("http://localhost:5000/getData/" + type);

  if (response.ok) {
    let json = await response.json();
    if (type === "countries") return json as CountriesItem[];
    if (type === "cities") return json as CityItem[];
    if (type === "airports") return json as AirportItem[];
    if (type === "airlines") return json as AirlineItem[];
    if (type === "alliances") return json as AllianceItem[];
    if (type === "planes") return json as PlaneItem[];
    if (type === "routes") return json as RouteItem[];
  } else {
    console.log("Ошибка получения данных с API: " + response.status);
    return [];
  }

}


interface GetAirTickersOptionalProps {
  departure_at?: string,
  return_at?: string,
  one_way?: boolean,
  direct?: boolean,
  market?: string,
  limit?: number,
  page?: number,
  sorting?: "price" | "route",
  unique?: boolean,
  currency?: string,
}

export type GetAirTickersProps = {
  origin: string,
  destination?: string,
} & GetAirTickersOptionalProps;

const getAirTickets = async (props: GetAirTickersProps): Promise<AirTickerItem[]> => {
  const response = await fetch("http://localhost:5000/getAviasales", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(props)
  });

  if (response.ok) {
    let json = await response.json();
    return Array.isArray(json.data) ? json.data as AirTickerItem[] : [] ;
  } else {
    console.log("Ошибка получения данных с API: " + response.status);
    return []
  }
}

interface BookingAirTickerProps {
  fullName: {
    firstName: string,
    lastName: string,
    patronymic: string | null,
  },
  email: string,
  phone?: string,
}

export type ResponseBookingAirTicker = (BookingAirTickerProps & { success: true })
| {
  error: {
    message: string,
    code: number,
  },
  success: false 
} 

const bookingAirTicker = async (props: BookingAirTickerProps)
  : Promise<ResponseBookingAirTicker> => {
  const response = await fetch("http://localhost:5000/bookingAirTicker", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(props),
  });

  if (response.ok) {
    let json = await response.json();
    return json as BookingAirTickerProps & { success: true };
  } else {
    console.log("Ошибка получения данных с API: " + response.status);
    return {
      error: {
        message: "Ошибка бронирования",
        code: response.status
      },
      success: false
    }
  }
}

export const AirTickerAPI = {
  getAirTickets,
  getData,
  bookingAirTicker,
}