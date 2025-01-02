import { GeneralIndicator, ValvoGeography } from './database';

export interface IndicatorGeneralDetails extends GeneralIndicator {
  location: {
    name: string;
    city: string;
    description: string;
  };
}

export interface ValvoWithIndicator extends ValvoGeography {
  generalIndicator: GeneralIndicator | null;
}
