import {Airport} from "./airport";

export interface Fare {

  amount: number;
  currency: string;
  origin: Airport;
  destination: Airport;

}
