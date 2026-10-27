// Web build only: stands in for @react-native-vector-icons/ionicons.
// Uses the exact same Ionicons font and icon map that ship with that package,
// so every icon looks identical to the phone version.
import React from 'react';
import { Text } from 'react-native-web';
import glyphMap from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import fontUrl from '@react-native-vector-icons/ionicons/fonts/Ionicons.ttf?url';

let fontAdded = false;
function addFont() {
    if (fontAdded || typeof document === 'undefined') return;
    const tag = document.createElement('style');
    tag.textContent = `@font-face { font-family: 'Ionicons'; src: url(${fontUrl}) format('truetype'); }`;
    document.head.appendChild(tag);
    fontAdded = true;
}

export type IoniconsIconName = keyof typeof glyphMap;

type Props = {
    name: IoniconsIconName;
    size?: number;
    color?: string;
    style?: any;
};

export default function Ionicons({ name, size = 12, color = 'black', style }: Props) {
    addFont();
    const code = (glyphMap as Record<string, number>)[name];
    const glyph = code ? String.fromCodePoint(code) : '?';
    return (
        <Text
            selectable={false}
            style={[
                { fontSize: size, color, fontFamily: 'Ionicons', fontWeight: 'normal', fontStyle: 'normal', lineHeight: size },
                style,
            ]}
        >
            {glyph}
        </Text>
    );
}
