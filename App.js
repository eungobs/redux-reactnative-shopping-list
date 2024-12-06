import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import shoppingListReducer from './src/store/reducers';
import { addItem, removeItem, editItem, toggleItem } from './src/store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Redux store
const store = createStore(shoppingListReducer);

const ShoppingListApp = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  useEffect(() => {
    // Load shopping list from AsyncStorage when the app starts
    const loadItems = async () => {
      const savedItems = await AsyncStorage.getItem('shoppingList');
      if (savedItems) {
        dispatch({ type: 'SET_ITEMS', payload: JSON.parse(savedItems) });
      }
    };

    loadItems();
  }, []);

  const handleAddItem = () => {
    const newItem = { id: Date.now().toString(), name: input, checked: false };
    dispatch(addItem(newItem));
    setInput('');
    saveItems();
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    saveItems();
  };

  const handleEditItem = (id, newName) => {
    dispatch(editItem(id, newName));
    saveItems();
  };

  const handleToggleItem = (id) => {
    dispatch(toggleItem(id));
    saveItems();
  };

  const saveItems = async () => {
    await AsyncStorage.setItem('shoppingList', JSON.stringify(items));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f4f4f4' }}>
      <Text style={{ fontSize: 24, color: '#4CAF50' }}>New list</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        value={input}
        onChangeText={setInput}
        placeholder="Add item"
      />
      <Button title="Add Item" onPress={handleAddItem} color="#4CAF50" />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity onPress={() => handleToggleItem(item.id)}>
              <Text
                style={{
                  fontSize: 18,
                  textDecorationLine: item.checked ? 'line-through' : 'none',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={{ marginLeft: 'auto' }}>
              <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ShoppingListApp />
    </Provider>
  );
}
