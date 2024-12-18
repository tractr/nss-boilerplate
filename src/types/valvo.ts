import { GeneralIndicator } from './database';

export interface IndicatorGeneralDetails extends GeneralIndicator {
  location: {
    name: string;
    city: string;
    description: string;
  };
}
