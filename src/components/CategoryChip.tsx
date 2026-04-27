import React from "react"
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from "react";
type Props = {
    label: string;
    isSelected: boolean;
    onPress: () => void;
};

const CategoryChip = ({ label, isSelected, onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipNotSelected,
            ]}
        >
            <Text
                style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};
export default CategoryChip;
const styles = StyleSheet.create({
    chip: {
        borderRadius: 16,
        borderWidth: 0.5,
        padding: 9,
        margin: 5,
    },
    chipSelected:
    {
        backgroundColor: '#ffe4e1'
    },
    chipNotSelected: {
        backgroundColor: '#87cefa'
    },
    chipText:
    {
        fontSize: 16,
        fontWeight: '600',
    },
    chipTextSelected: {
        color: '#ff69b4'
    },
});