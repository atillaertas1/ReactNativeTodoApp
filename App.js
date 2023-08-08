import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DATA = [
  {
  }];

let nextTaskId = 1;

function HomeScreen({ navigation }) {
  const [text, onChangeText] = useState("");
  const [tasksPending, setTasksPending] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState("");

  const ItemPending = ({ title, id }) => 
  (
    <View style={styles.taskBoxPending}>
      <View style={{ flex: 3 }}>
        <Text style={styles.TasksText}>{title}</Text>
      </View>
      <View style={{ flex: 2, marginRight: 3 }}>

        <TouchableHighlight
          onPress={() =>
            navigation.navigate("Details", { tasksTitle: title, tasksID: id })
          }
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>DETAILS</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ flex: 2, marginRight: 3 }}>
        
        <TouchableHighlight 
          onPress={() => {
            setTasksPending(prevTasks => prevTasks.filter(task => task.id !== id));
            setTasksCompleted(prevTasks => [...prevTasks, { id: String(id), title: title }]);

          }}
          
          >
          <View style={styles.button}>
            <Text style={styles.buttonText}>FINISH</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );

  const ItemCompleted = ({ title }) => (
    <View style={styles.taskBoxCompleted}>
      <Text style={styles.TasksText}>{title}</Text>
    </View>
  );

  const addTask = () => {
    if (text.trim() === "") {
      return;
    }

    const newTask = {
      id: String(nextTaskId + 1),
      title: text,
    };
    nextTaskId++;

    setTasksPending((prevTasks) => [...prevTasks, newTask]);
    onChangeText("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.pendingTaskContainer}>
        <Text style={styles.pendingTaskTitle}>Pending Task</Text>
        <FlatList
          data={tasksPending}
          renderItem={({ item }) => (
            <ItemPending title={item.title} id={item.id} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.completedTaskContainer}>
        <Text style={styles.completedTaskTitle}>Completed Task</Text>
        <FlatList
          data={tasksCompleted}
          renderItem={({ item }) => (
            <ItemCompleted title={item.title} id={item.id} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.userInput}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableHighlight onPress={addTask}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>ADD TASK</Text>
          </View>
        </TouchableHighlight>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

function TaskDetailScreen({ route }) {
  const { tasksTitle } = route.params;
  const { tasksID } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.detailsScreen}>
        <Text
          style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
        >
          {tasksTitle},{tasksID}
        </Text>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={HomeScreen}
          options={{ title: "Tasks" }}
        />
        <Stack.Screen name="Details" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userInput: {
    flexDirection: "row",
    padding: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    flex: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
  },
  pendingTaskContainer: {
    flex: 5,
    marginTop: "8%",
    backgroundColor: "black",
    width: "95%",
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  pendingTaskTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 10,
  },
  taskBoxPending: {
    width: 350,
    height: 70,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#FFD700",
    paddingLeft: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  taskBoxCompleted: {
    width: 350,
    height: 70,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#228B22",
    paddingLeft: 10,
    marginTop: 5,
    flexDirection: "row",
  },
  completedTaskContainer: {
    flex: 5,
    marginBottom: 10,
    marginTop: "5%",
    backgroundColor: "black",
    width: "95%",
    borderWidth: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  completedTaskTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 10,
  },
  TasksText: {
    color: "black",
    fontWeight: "700",
  },
  detailsScreen: {
    flex: 14,
    width: "95%",
    backgroundColor: "black",
    borderWidth: 5,
    borderRadius: 10,
    marginBottom: 10
  },
  
});
