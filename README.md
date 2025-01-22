Shopping List App


The Shopping List App is a feature-rich React Native application designed to help users manage their shopping lists efficiently. With support for persistent storage, dynamic UI elements, and sharing options, this app provides a complete solution for tracking and organizing items to buy.

Features
Add Items: Quickly add items with names and prices to your shopping list.
Edit Items: Modify existing items to update their details.
Toggle Items: Mark items as purchased or unpurchased with a single tap.
Delete Items: Remove items from the list easily.
Share List: Share your shopping list via WhatsApp or other platforms.
Blinking Trolley Icon: A dynamic, blinking trolley icon for an interactive experience.
Persistent Storage: Save and load shopping list data using AsyncStorage.
Currency Formatting: Display item prices in ZAR (South African Rand) with precise formatting.
Responsive Design: Enjoy a clean and intuitive UI that adapts to various devices.
Getting Started
Prerequisites
Node.js and npm installed on your machine.
React Native environment set up.
A device or emulator to run the application.
Installation

Clone the repository:
git clone https://github.com/eungobs/shopping-list-app.git
Navigate to the project directory:


cd shopping-list-app
Install dependencies:

Edit
npm install
Link native dependencies (if necessary):


npx react-native link
Start the app:

For iOS:
npx react-native run-ios


For Android:
npx react-native run-android

Usage
Adding Items:

Enter the item name and price in the respective input fields.
Tap the "+" button to add the item to the list.
Editing Items:

Tap the "Edit" icon next to an item.
Update the item's name and price via prompts.
Toggling Items:

Tap the circular checkbox to mark items as purchased or unpurchased.
Deleting Items:

Tap the "Trash" icon next to an item to remove it.
Sharing the List:

Tap the "Share" icon in the header to share your shopping list.

Code Structure
State Management: Redux is used for managing the shopping list state, with actions and reducers to handle various operations.
Persistent Storage: Data is saved to and loaded from AsyncStorage to maintain state across app restarts.

UI Components:
BlinkingTrolley: Animated icon indicating active items.
ShoppingListItem: Reusable component for displaying individual items.
Reducers and Actions:
ADD_ITEM, REMOVE_ITEM, EDIT_ITEM, TOGGLE_ITEM, SET_ITEMS, and SET_PURCHASED_ITEMS.


Future Enhancements
Integration with cloud storage for cross-device synchronization.
Ability to categorize items by type.
Push notifications for reminders.
Voice input for adding items.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Special thanks to the open-source community for providing tools and libraries that made this project possible.