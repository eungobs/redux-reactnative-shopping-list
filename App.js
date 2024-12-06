import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

// Action Types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const TOGGLE_ITEM = 'TOGGLE_ITEM';
const SET_ITEMS = 'SET_ITEMS';
const SET_PURCHASED_ITEMS = 'SET_PURCHASED_ITEMS';

// Action Creators
const addItem = (item) => ({ type: ADD_ITEM, payload: item });
const removeItem = (id) => ({ type: REMOVE_ITEM, payload: id });
const editItem = (id, name) => ({ type: EDIT_ITEM, payload: { id, name } });
const toggleItem = (id) => ({ type: TOGGLE_ITEM, payload: id });
const setItems = (items) => ({ type: SET_ITEMS, payload: items });
const setPurchasedItems = (items) => ({ type: SET_PURCHASED_ITEMS, payload: items });

// Reducer
const initialState = {
  items: [],
  purchasedItems: []
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        purchasedItems: state.purchasedItems.filter(item => item.id !== action.payload)
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        )
      };
    case TOGGLE_ITEM:
      const itemToToggle = state.items.find(item => item.id === action.payload);
      if (!itemToToggle) return state;
      
      const updatedItem = { ...itemToToggle, checked: !itemToToggle.checked };
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        purchasedItems: updatedItem.checked
          ? [...state.purchasedItems, updatedItem]
          : state.purchasedItems
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload || []
      };
    case SET_PURCHASED_ITEMS:
      return {
        ...state,
        purchasedItems: action.payload || []
      };
    default:
      return state;
  }
};

// Create store with persistence enhancer
const persistedState = {
  items: [],
  purchasedItems: []
};

// Create store
const store = createStore(shoppingListReducer, persistedState);

// Subscribe to store changes to persist data
store.subscribe(() => {
  const state = store.getState();
  try {
    AsyncStorage.setItem('shoppingList', JSON.stringify(state.items));
    AsyncStorage.setItem('purchasedItems', JSON.stringify(state.purchasedItems));
  } catch (error) {
    console.error('Error saving state:', error);
  }
});

const ShoppingListItem = ({ item, onToggle, onEdit, onRemove }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity onPress={onToggle}>
      <Icon 
        name={item.checked ? "check-circle" : "circle-o"} 
        size={24} 
        color={item.checked ? '#4CAF50' : '#ccc'} 
      />
    </TouchableOpacity>
    <Text
      style={[
        styles.itemText,
        item.checked && styles.checkedText
      ]}
    >
      {item.name}
    </Text>
    {!item.checked && (
      <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
        <Icon name="edit" size={20} color="#4CAF50" />
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={onRemove} style={styles.iconButton}>
      <Icon name="trash" size={20} color="red" />
    </TouchableOpacity>
  </View>
);

const ShoppingListApp = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const purchasedItems = useSelector((state) => state.purchasedItems);

  // Load saved items when app starts
  useEffect(() => {
    const loadSavedItems = async () => {
      try {
        const [savedItems, savedPurchasedItems] = await Promise.all([
          AsyncStorage.getItem('shoppingList'),
          AsyncStorage.getItem('purchasedItems')
        ]);

        if (savedItems) dispatch(setItems(JSON.parse(savedItems)));
        if (savedPurchasedItems) dispatch(setPurchasedItems(JSON.parse(savedPurchasedItems)));
      } catch (error) {
        Alert.alert('Error', 'Failed to load shopping list');
      }
    };

    loadSavedItems();
  }, []);

  const handleShare = async () => {
    try {
      const shoppingList = items.map(item => `• ${item.name}`).join('\n');
      const message = `My Shopping List:\n\n${shoppingList}\n\nSent from my Shopping List App`;
      
      await Share.share({
        message: message,
        title: 'My Shopping List'
      }, {
        dialogTitle: 'Share shopping list via WhatsApp'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share shopping list');
    }
  };

  const handleAddItem = () => {
    if (!input.trim()) return;
    
    const newItem = {
      id: Date.now().toString(),
      name: input.trim(),
      checked: false
    };
    
    dispatch(addItem(newItem));
    setInput('');
  };

  const handleEditItem = (id, currentName) => {
    Alert.prompt(
      'Edit Item',
      'Enter new name:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: (newName) => {
            if (newName?.trim() && newName !== currentName) {
              dispatch(editItem(id, newName.trim()));
            }
          }
        }
      ],
      'plain-text',
      currentName
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Shopping List</Text>
        <TouchableOpacity 
          onPress={handleShare}
          style={styles.shareButton}
        >
          <Icon name="share-alt" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add item"
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>To Buy</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShoppingListItem
            item={item}
            onToggle={() => dispatch(toggleItem(item.id))}
            onEdit={() => handleEditItem(item.id, item.name)}
            onRemove={() => dispatch(removeItem(item.id))}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items to buy</Text>
        }
      />

      <Text style={styles.sectionTitle}>Purchased</Text>
      <FlatList
        data={purchasedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShoppingListItem
            item={item}
            onToggle={() => dispatch(toggleItem(item.id))}
            onRemove={() => dispatch(removeItem(item.id))}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No purchased items</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  shareButton: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#4CAF50',
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

// Main App component
const App = () => {
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const [savedItems, savedPurchasedItems] = await Promise.all([
          AsyncStorage.getItem('shoppingList'),
          AsyncStorage.getItem('purchasedItems')
        ]);
        
        if (savedItems) store.dispatch(setItems(JSON.parse(savedItems)));
        if (savedPurchasedItems) store.dispatch(setPurchasedItems(JSON.parse(savedPurchasedItems)));
      } catch (error) {
        console.error('Error loading initial state:', error);
      }
    };

    loadInitialState();
  }, []);

  return (
    <Provider store={store}>
      <ShoppingListApp />
    </Provider>
  );
};

export default App;