import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AiPage = () => {
    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState([]);

    /*
    
    useEffect(() => {
        fetchTasks();
    }, []);


    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/tasks');
            const data = await response.json();
            setTaskItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = async () => {
        if (task.trim()) {
            try {
                const response = await fetch('http://localhost:5000/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: task }),
                });
                const newTask = await response.json();
                setTaskItems([...taskItems, newTask]);
                setTask("");
                Keyboard.dismiss();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const completeTask = async (i) => {
        const taskToDelete = taskItems[i];
        try {
            await fetch(`http://localhost:5000/tasks/${taskToDelete._id}`, {
                method: 'DELETE',
            });
            const itemsCopy = [...taskItems];
            itemsCopy.splice(i, 1);
            setTaskItems(itemsCopy);
        } catch (error) {
            console.error(error);
        }
    };
    */

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Clear your Mind! Ask any Questions</Text>
                <View style={styles.items}>
                    {
                        taskItems.map((item, i) => (
                            <TouchableOpacity >
                                
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder='Enter the Task'
                />
                <TouchableOpacity >
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
    },
    taskWrapper: {
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 20,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-around',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        width: 250,
        height: 50,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default AiPage;
