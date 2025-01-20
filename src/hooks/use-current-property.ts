import { create } from 'zustand';
import { getCookie, setCookie } from 'cookies-next';

export interface Property {
  id: string;
  name: string;
}

const PROPERTY_COOKIE_KEY = 'current-property';

interface PropertyState {
  currentProperty: Property | null;
  setCurrentProperty: (property: Property | null) => void;
}

// Initialize store with value from cookie
const getInitialProperty = (): Property | null => {
  const propertyStr = getCookie(PROPERTY_COOKIE_KEY);
  if (!propertyStr) return null;
  try {
    return JSON.parse(propertyStr as string) as Property;
  } catch {
    return null;
  }
};

const usePropertyStore = create<PropertyState>(set => ({
  currentProperty: getInitialProperty(),
  setCurrentProperty: (property: Property | null) => {
    if (property) {
      setCookie(PROPERTY_COOKIE_KEY, JSON.stringify(property));
    } else {
      setCookie(PROPERTY_COOKIE_KEY, '');
    }

    // Post message to iframe about property change
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          event: 'PROPERTY_CHANGED',
          property,
        },
        process.env.NEXT_PUBLIC_EDWIX_APP_URL ?? ''
      );
    }

    set({ currentProperty: property });
  },
}));

export function useCurrentProperty() {
  return usePropertyStore();
}
