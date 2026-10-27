import { Platform } from 'react-native';

// Where the weather comes from. The web app is served from the same Vercel
// site as the api/weather function, so a relative path is enough there.
// The phone app needs the full address of that same deployed function.
const DEPLOYED_SITE = 'https://REPLACE_AFTER_DEPLOY.vercel.app';

export const WEATHER_URL =
    Platform.OS === 'web' ? '/api/weather' : `${DEPLOYED_SITE}/api/weather`;
