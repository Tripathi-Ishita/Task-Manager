import React from "react";
import { StyleSheet, Alert, View, Text, TouchableOpacity } from 'react-native';
import { useTasks } from "../screens/TaskContext";
import Ionicons, { IoniconsIconName } from "@react-native-vector-icons/ionicons";

type Task = {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    category: string;
};
type CategoryStyle = {
    icon: IoniconsIconName;
    iconColor: string;
    cardBg: string;
};
const CATEGORY_CONFIG: Record<string, CategoryStyle> = {
    Marketing: {
        icon: 'megaphone-outline',
        iconColor: '#ff1493',
        cardBg: '#ffe4e1',
    },

    Meeting: {
        icon: 'people-outline',
        iconColor: '#8b4513',
        cardBg: '#fafad2',
    },

    HTML: {
        icon: 'logo-html5',
        iconColor: '#ff4500',
        cardBg: '#ffefd5',
    },

    Mobile: {
        icon: 'phone-portrait-outline',
        iconColor: '#4169e1',
        cardBg: '#e0ffff',
    },

    Dev: {
        icon: 'code-slash-outline',
        iconColor: '#2f4f4f',
        cardBg: '#d3d3d3',
    },
    'UI Design': {
        icon: 'color-palette-outline',
        iconColor: '#8a2be2',
        cardBg: '#e6e6fa',
    },

    Magento: {
        icon: 'cart-outline',
        iconColor: '#ff6600',
        cardBg: '#fff1e6',
    },

    'Android App': {
        icon: 'logo-android',
        iconColor: '#3ddc84',
        cardBg: '#e0ffff',
    },

    'iOS App': {
        icon: 'logo-apple',
        iconColor: '#000000',
        cardBg: '#f5f5f5',
    },

    General: {
        icon: 'clipboard-outline',
        iconColor: '#696969',
        cardBg: '#f5fffa',
    },
};

const TaskCard = ({ item }: { item: Task }) => {
    const { deleteTask } = useTasks();
    const handleDelete = () => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete task?",
            [
                {
                    text: 'Cancel', style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteTask(item.id),
                },
            ],
            { cancelable: true }//allow dismissing by tapping outside
        );
    };
    const categoryStyle = CATEGORY_CONFIG[item.category];
    return (
        <View
            style={[styles.cardContainer, { backgroundColor: categoryStyle.cardBg }]}
        >
            <View
                style={[
                    styles.iconWrapper,
                    { backgroundColor: categoryStyle.iconColor + '22' },
                ]}
            >
                <Ionicons
                    name={categoryStyle.icon}
                    size={22}
                    color={categoryStyle.iconColor}
                />
            </View>
            <View>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskTime}>
                    {new Date(item.startTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    })}
                    -
                    {new Date(item.endTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </Text>
            </View>
            <TouchableOpacity onPress={handleDelete}>
                <Ionicons
                    style={{ alignSelf: 'center' }}
                    color="#a9a9a9"
                    name="ellipsis-vertical"
                    size={25}
                />
            </TouchableOpacity>
        </View>
    );
};
export default TaskCard;
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#ffe4c4',
        borderRadius: 35,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 10,
    },
    iconWrapper: {
        width: 45,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    taskTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10,
    },
    taskTime: { fontSize: 17, color: '#a9a9a9' },
}); 