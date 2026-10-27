// Web build only: `react-native` is redirected here (see vite.config.ts).
// Everything comes from react-native-web, except Alert, which is a silent
// no-op on web — so validation and delete messages would never show.
// This version uses the browser's own alert/confirm boxes instead.
export * from 'react-native-web';

type AlertButton = {
    text?: string;
    style?: 'default' | 'cancel' | 'destructive';
    onPress?: () => void;
};

// The browser has no hardware back button for the app to listen to, so this is
// a quiet stand-in (react-native-web's version logs an error on every screen).
export const BackHandler = {
    addEventListener: () => ({ remove() {} }),
    removeEventListener() {},
    exitApp() {},
};

export const Alert = {
    alert(title: string, message?: string, buttons?: AlertButton[]) {
        const text = [title, message].filter(Boolean).join('\n\n');
        if (!buttons || buttons.length <= 1) {
            window.alert(text);
            buttons?.[0]?.onPress?.();
            return;
        }
        const cancel = buttons.find(b => b.style === 'cancel');
        const action = buttons.find(b => b.style !== 'cancel');
        if (window.confirm(text)) {
            action?.onPress?.();
        } else {
            cancel?.onPress?.();
        }
    },
};
