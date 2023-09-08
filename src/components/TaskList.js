import React from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import TaskCard from "./TaskCard";

export default function TaskList(props) {
  // const { Tasks, loadTasks, isNext } = props;
  const { Tasks, loadTasks, isNext } = props;
  // console.log("😈 Tasklist.js "+JSON.stringify(Tasks))
  const loadMore = () => {
    loadTasks();
  };

  return (
    <FlatList
      data={Tasks}
      numColumns={2}
      showsVerticalScrollIndicator={true}
      keyExtractor={(Task) => String(Task.id)}
      renderItem={({ item }) => <TaskCard Task={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={isNext && loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});
