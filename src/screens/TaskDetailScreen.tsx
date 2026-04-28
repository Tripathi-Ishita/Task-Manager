import { Alert, Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import CategoryChip from "../components/CategoryChip";
import { useTasks } from "./TaskContext";



const TaskDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { addTask } = useTasks();
    const passedDate = route.params?.selectedDate ? new Date(route.params.selectedDate)
        : new Date();
    const [text, setText] = useState('');
    const [taskDate, setTaskDate] = useState(passedDate);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [openPicker, setOpenPicker] = useState<'date' | 'start' | 'end' | null>(null);
    const categories = [
        'Marketing',
        'Meeting',
        'HTML',
        'Mobile',
        'UI Design',
        'Magento',
        'Android App',
        'iOS App',
        'Dev',
        'General'
    ];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const handleCreateTask = () => {

        if (!text.trim()) {
            Alert.alert("Please enter a title!");
            return;
        }
        if (!startTime || !endTime) {
            Alert.alert("Please pick your times!");
            return;
        }
        if (!selectedCategory) {
            Alert.alert("Choose one category!");
            return;
        }
        const fullStartDate = new Date(taskDate);
        fullStartDate.setHours(startTime.getHours());
        fullStartDate.setMinutes(startTime.getMinutes());
        fullStartDate.setSeconds(0); // Clean up seconds
        const fullEndDate = new Date(taskDate);
        fullEndDate.setHours(endTime.getHours());
        fullEndDate.setMinutes(endTime.getMinutes());
        fullEndDate.setSeconds(0);
        //is end time before start time
        if (fullEndDate <= fullStartDate) {
            Alert.alert("End time must be after starting time");
            return;
        }
        if (fullStartDate < new Date()) {
            Alert.alert("Please choose a valid starting time");
            return;
        }
        //creating the task obj
        const newTask = {
            id: Date.now().toString(),
            title: text,
            date: taskDate.toISOString(),
            startTime: fullStartDate.toISOString(),
            endTime: fullEndDate.toISOString(),
            category: selectedCategory || 'General'
        };
        addTask(newTask);
        navigation.goBack();



    };
    return <SafeAreaView style={styles.container}>
        {/* the header */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={30} color='#000' />
        </TouchableOpacity>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>New Task</Text>
            <TouchableOpacity style={styles.iconButton} onPress={() => { }}>
                <Ionicons name='person' size={25} color='#ff69b4' />
            </TouchableOpacity>
        </View>

        <View style={styles.content}>
            <TextInput style={styles.textInput}
                value={text}
                onChangeText={setText}
                placeholder='Title' placeholderTextColor='black'
            />


            {/* the datepicker and the text input */}
            <TouchableOpacity style={styles.dateInputRow}
                onPress={() => setOpenPicker('date')}>
                <Ionicons name='calendar-outline' size={25} color='#0000ff' />
                {/* text to show the formatted date */}
                <Text style={{ fontSize: 20 }}>
                    {taskDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                </Text>


            </TouchableOpacity>


            {/* The time row */}
            <View style={styles.timeRow}>
                {/* start time */}
                <TouchableOpacity
                    style={styles.timeBox}
                    onPress={() => setOpenPicker('start')}>

                    <Text style={styles.timeValue}>
                        {
                            startTime ? startTime.toLocaleTimeString(
                                'en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            }
                            ) :
                                'Select Start Time'
                        }
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.timeBox}
                    onPress={() => setOpenPicker('end')}>

                    <Text style={styles.timeValue}>
                        {
                            endTime ? endTime.toLocaleTimeString(
                                'en-US', { hour: 'numeric', minute: 'numeric', hour12: true }
                            ) :
                                'Select End Time'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
            {/* the category rendered */}
            <View style={styles.categoryContainer}>
                {categories.map(
                    category => (
                        <CategoryChip
                            key={category}
                            label={category}
                            isSelected={selectedCategory === category}
                            onPress={() => setSelectedCategory(category)}
                        />
                    )
                )}
            </View>

        </View>

        {/* the button to create tasks */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
            <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>


        {
            openPicker === 'date' && (
                <DateTimePicker
                    value={taskDate}
                    mode='date'
                    display='default'
                    minimumDate={new Date()}
                    onChange={(e, d) => {
                        if (d) {
                            setTaskDate(d);
                        }

                        setOpenPicker(null);
                    }} />
            )
        }
        {openPicker === 'start' && (
            <DateTimePicker
                value={startTime ?? new Date()}
                mode="time"
                onChange={(e, d) => {
                    if (d) setStartTime(d);
                    setOpenPicker(null);
                }}
            />
        )}

        {openPicker === 'end' && (
            <DateTimePicker
                value={endTime ?? startTime ?? new Date()}
                mode="time"
                onChange={(e, d) => {
                    if (d) setEndTime(d);
                    setOpenPicker(null);
                }}
            />
        )}


    </SafeAreaView>
};
export default TaskDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,//to use full space on the screen
        padding: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000'
    },

    iconButton: {
        backgroundColor: '#ffe4e1',
        padding: 12,
        borderRadius: 20
    },
    content: {
        gap: 30,
        flex: 1
    },
    textInput: {
        borderBottomWidth: 1,
        fontSize: 20
    },
    dateInputRow: {
        flexDirection: 'row',
        gap: 20,
        borderBottomWidth: 1,

    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20

    },
    timeBox: {
        borderBottomWidth: 1,
        gap: 10,
        paddingVertical: 10,
        flex: 1
    },

    timeValue: {
        fontSize: 16,
        color: '#555'
    },
    categoryContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    createButton: {
        backgroundColor: '#0000cd',
        padding: 10,
        borderRadius: 15,
        elevation: 12,
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center',



    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }

});
