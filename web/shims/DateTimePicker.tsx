// Web build only: stands in for @react-native-community/datetimepicker, which
// has no web version. Shows a small pop-up with the browser's own date/time
// input, and reports back through the same callbacks the phone picker uses.
import React, { useState } from 'react';

type Props = {
    value: Date;
    mode?: 'date' | 'time';
    minimumDate?: Date;
    onChange?: (event: any, date?: Date) => void;
    onValueChange?: (event: any, date?: Date) => void;
    onDismiss?: () => void;
    [key: string]: any;
};

const pad = (n: number) => String(n).padStart(2, '0');
const toDateInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toTimeInput = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function DateTimePicker({ value, mode = 'date', minimumDate, onChange, onValueChange, onDismiss }: Props) {
    const [text, setText] = useState(mode === 'date' ? toDateInput(value) : toTimeInput(value));
    const report = onValueChange ?? onChange;

    const confirm = () => {
        if (!text) return;
        const d = new Date(value);
        if (mode === 'date') {
            const [y, m, day] = text.split('-').map(Number);
            d.setFullYear(y, m - 1, day);
        } else {
            const [h, min] = text.split(':').map(Number);
            d.setHours(h, min, 0, 0);
        }
        report?.({ type: 'set', nativeEvent: { timestamp: d.getTime() } }, d);
    };

    const cancel = () => {
        onDismiss?.();
        report?.({ type: 'dismissed', nativeEvent: {} }, undefined);
    };

    return (
        <div
            onClick={cancel}
            style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 1000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#fff', borderRadius: 16, padding: 20, minWidth: 260,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.25)', fontFamily: 'system-ui, sans-serif',
                }}
            >
                <div style={{ fontWeight: 600, marginBottom: 12 }}>
                    {mode === 'date' ? 'Pick a date' : 'Pick a time'}
                </div>
                <input
                    type={mode === 'date' ? 'date' : 'time'}
                    value={text}
                    min={mode === 'date' && minimumDate ? toDateInput(minimumDate) : undefined}
                    onChange={e => setText(e.target.value)}
                    autoFocus
                    style={{ fontSize: 18, padding: 8, width: '100%', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                    <button onClick={cancel} style={{ padding: '8px 14px', border: 'none', background: 'none', color: '#4169e1', fontSize: 15, cursor: 'pointer' }}>
                        Cancel
                    </button>
                    <button onClick={confirm} style={{ padding: '8px 14px', border: 'none', borderRadius: 8, background: '#4169e1', color: '#fff', fontSize: 15, cursor: 'pointer' }}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
