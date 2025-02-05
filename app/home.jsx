import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:3000/recipes/${id}`)
      .then(() => {
        setApiData(apiData.filter((recipe) => recipe.id !== id));
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/recipes`).then((response) => {
      setApiData(response.data);
    });
  }, []);

  const filteredData = apiData.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipe Nest</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Recipes"
        value={search}
        onChangeText={setSearch}
      />

      <Button title="Add Recipe" onPress={() => navigation.navigate("AddRecipePage")} />

      <Text style={styles.subHeader}>Recent Recipes</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.recipeImage}
            />
            <Text style={styles.recipeTitle}>{item.recipeName}</Text>
            <Text><Text style={styles.boldText}>Ingredients:</Text> {item.Ingredients}</Text>
            <Text><Text style={styles.boldText}>Instructions:</Text> {item.instructions}</Text>
            <Text><Text style={styles.boldText}>Category:</Text> {item.category}</Text>
            <Text><Text style={styles.boldText}>Preparation Time:</Text> {item.preparationTime}</Text>
            <Text><Text style={styles.boldText}>Cooking Time:</Text> {item.cookingTime}</Text>
            <Text><Text style={styles.boldText}>Servings:</Text> {item.servings}</Text>
            
            <View style={styles.buttonGroup}>
              <Button
                title="Update"
                onPress={() => navigation.navigate("Update", { recipeId: item.id })}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => onDelete(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});