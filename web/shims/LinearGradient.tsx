// Web build only: stands in for react-native-linear-gradient, which has no
// web version. Draws the same gradient with CSS.
import React from 'react';
import { StyleSheet } from 'react-native-web';

type Point = { x: number; y: number };
type Props = {
    colors: string[];
    start?: Point;
    end?: Point;
    style?: any;
    children?: React.ReactNode;
};

// React Native style names that CSS spells differently.
function toCss(style: Record<string, any>) {
    const css: Record<string, any> = {};
    for (const [key, value] of Object.entries(style)) {
        if (key === 'paddingVertical') { css.paddingTop = value; css.paddingBottom = value; }
        else if (key === 'paddingHorizontal') { css.paddingLeft = value; css.paddingRight = value; }
        else if (key === 'marginVertical') { css.marginTop = value; css.marginBottom = value; }
        else if (key === 'marginHorizontal') { css.marginLeft = value; css.marginRight = value; }
        else css[key] = value;
    }
    return css;
}

export function LinearGradient({ colors, start = { x: 0.5, y: 0 }, end = { x: 0.5, y: 1 }, style, children }: Props) {
    // Direction from start to end, turned into a CSS angle (0deg = up, 90deg = right).
    const angle = (Math.atan2(end.x - start.x, -(end.y - start.y)) * 180) / Math.PI;
    const flat = StyleSheet.flatten(style) || {};
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                minHeight: 0,
                ...toCss(flat),
                backgroundImage: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
            }}
        >
            {children}
        </div>
    );
}

export default LinearGradient;
