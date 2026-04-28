import { useNavigation, } from '@react-navigation/native';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons, { IoniconsIconName } from '@react-native-vector-icons/ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native';
import WeatherChip from '../components/WeatherChip';
import { useTasks } from './TaskContext';
import TaskCard from '../components/TaskCard';

type PillProps = {
    date: Date;
    isSelected: boolean;
    onPress: () => void;
};
const DayPill = (props: PillProps) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.pillStyle, props.isSelected && styles.selectedPillStyle]}
        >
            <Text
                style={[styles.pillDay, props.isSelected && styles.pillDaySelected]}
            >
                {props.date.toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
            <Text
                style={[styles.pillDate, props.isSelected && styles.pillDateSelected]}
            >
                {props.date.getDate()}
            </Text>
        </TouchableOpacity>
    );
};

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
}
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

    General: {
        icon: 'clipboard-outline',
        iconColor: '#696969',
        cardBg: '#f5fffa',
    },
};



const HomeScreen = () => {
    const navigation = useNavigation<any>();
    // <Button  onPress={()=>navigation.navigate('TaskDetail')}
    const { tasks, deleteTask } = useTasks();

    const [myDate, setMyDate] = useState(new Date()); //initial value is current date
    //to decide if popup of calender is visible or not?
    const [showPicker, setShowPicker] = useState(false);
    //handling if picker should open or not funtion
    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setMyDate(selectedDate);
            setSelectedPill(selectedDate);
        }
        //close the picker (date is selcted)
        setShowPicker(false);
    };
    //to hold state of selected pill because they will show tasks
    // const [selectedPillIndex,setSelectedPillIndex]=useState(0);use wither index or date
    const [selectedPill, setSelectedPill] = useState(myDate);
    // const weekDates:Date[]=[];
    // for(let i =0;i<7;i++){
    //     const d=new Date(myDate);
    //     d.setDate(myDate.getDate()+i);
    //     weekDates.push(d);
    // }
    //other way-
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(myDate);
        d.setDate(myDate.getDate() + i);
        return d;
    });



    const dailyTasks = tasks
        .filter(task => {
            return new Date(task.date).toDateString() === selectedPill.toDateString();
        })
        .sort((a, b) => {
            return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        });



    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    'Exit App',
                    'Do you want to exit?',
                    [
                        { text: 'No', style: 'cancel' },
                        { text: 'Yes', onPress: () => BackHandler.exitApp() },
                    ]
                );
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                subscription.remove();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* the header */}
            <View style={styles.header}>
                {/* The text */}
                <Text style={styles.headerTitle}>
                    {myDate.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                    })}
                </Text>
                {/* the button */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => setShowPicker(true)}
                >
                    <Ionicons name="calendar" size={25} color="#ff69b4" />
                </TouchableOpacity>
            </View>
            {/* the hidden picker */}
            {showPicker && (
                <DateTimePicker
                    value={myDate}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onValueChange={handleDateChange}
                />
            )}
            <WeatherChip />
            {/* the Week strip */}
            <ScrollView horizontal={true} style={styles.weekStrip}>
                {
                    //     weekDates.map((d,i)=>(
                    //         <DayPill key={d.toISOString()}date={d} isSelected={false} onPress={()=>setSelectedPillIndex(i)}/>
                    // )) use the index

                    weekDates.map(d => (
                        <DayPill
                            key={d.toISOString()}
                            date={d}
                            isSelected={d.toDateString() === selectedPill.toDateString()}
                            onPress={() => setSelectedPill(d)}
                        />
                    ))
                }
            </ScrollView>

            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>
                    Tasks
                </Text>
                <Ionicons name="ellipsis-horizontal" style={styles.iconButton} size={20} />
            </View>

            {/* show the tasks */}
            {dailyTasks.length === 0 ? (
                <View>
                    <Text>No tasks today</Text>
                </View>
            ) : (
                <FlatList
                    data={dailyTasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TaskCard item={item} />}
                />
            )}

            {/* create task button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() =>
                        navigation.navigate('TaskDetail', {
                            selectedDate: selectedPill.toISOString(),
                        })
                    }
                >
                    <Ionicons name="add" size={40} color="#4169e1" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1, //to use full space on the screen
        padding: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
    },

    iconButton: {
        backgroundColor: '#ffe4e1',
        padding: 12,
        borderRadius: 20,
    },
    pillStyle: {
        backgroundColor: '#4169e1',
        height: 100,
        width: 50,
        // flex:1,

        justifyContent: 'space-around',
        padding: 10,

        borderRadius: 25,
        alignItems: 'center',
    },
    selectedPillStyle: {
        backgroundColor: '#ffffff',
    },
    pillDay: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    pillDate: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    pillDaySelected: {
        color: '#000000',
    },
    pillDateSelected: {
        color: '#000000',
    },
    weekStrip: {
        marginTop: 20,
        borderRadius: 25,
        flexGrow: 0,
        backgroundColor: '#4169e1',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 60,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 10,
    },
    circleButton: {
        padding: 15,
    },
    cardContainer: {
        backgroundColor: '#ffe4c4',
        borderRadius: 35,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 10
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