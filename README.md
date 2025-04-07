
# Shopping List App: Your Handy Shopping Organizer
Demo Link:https://drive.google.com/file/d/1xxc-nvdN7xnCzLQ6HUrboJvjxUTIH3PF/view?usp=sharing

The **Shopping List App** is a mobile application designed to help you manage and organize your shopping lists effectively. With this app, you can easily keep track of what you need to buy, ensuring that you never miss anything during your shopping trips.

## Key Features

- **Add Items**: Quickly add the names and prices of items you want to buy to your shopping list. This makes it easy to remember everything you need!

- **Edit Items**: If you need to change something about an item you’ve added, simply modify its details (like the name or price) whenever you want.

- **Toggle Items**: Mark items as purchased or unpurchased with just a single tap! This helps you keep track of what you've bought already.

- **Delete Items**: If you no longer need an item on your list, you can easily remove it with a simple tap on the trash icon.

- **Share List**: Want to share your shopping list with someone else? You can easily send it through WhatsApp or other platforms, so they know what to get too!

- **Blinking Trolley Icon**: The app has a fun, animated trolley icon that blinks to make the app more interactive and enjoyable to use.

- **Persistent Storage**: Your shopping list is saved automatically, so you can access it later, even after you've closed the app.

- **Currency Formatting**: Prices of the items are displayed in South African Rand (ZAR), so everything is clear and easy to understand.

- **Responsive Design**: The app has a clean and user-friendly design that works well on various devices, whether you're using a phone or a tablet.

## Getting Started

### Prerequisites

Before you can use the Shopping List App, you need to have a few things set up on your computer:

1. **Node.js and npm**: These are tools that allow you to run JavaScript code and manage the app’s packages.
2. **React Native Environment**: This is the framework used to build the app. You'll need this set up on your computer.
3. **A Device or Emulator**: You’ll need a real smartphone or an emulator (a software program that allows you to run mobile apps on your computer) to run the application.

### Installation Steps

Here's how to get the app running on your device:

1. **Clone the Repository**: This step makes a copy of the app's code on your computer. Open your terminal and type:

   git clone https://github.com/eungobs/shopping-list-app.git


2. **Navigate to the Project Directory**: Change directory to the downloaded app folder by typing:

   cd shopping-list-app
 

3. **Install Dependencies**: This step ensures all the necessary tools are ready for the app to work:

   npm install


4. **Link Native Dependencies**: Sometimes additional setup is required for certain features:

   npx react-native link


5. **Start the App**: Now you can run the app on your device:
   - For iOS devices, type:
     ```bash
     npx react-native run-ios
     ```
   - For Android devices, type:
     ```bash
     npx react-native run-android
     ```

## How to Use the App

- **Adding Items**: Enter the name and price of the item in the designated areas and press the "+" button to add it to your shopping list.

- **Editing Items**: Click on the "Edit" icon next to an item to change its name or price easily.

- **Toggling Items**: Tap the circular checkbox next to an item to mark it as purchased (you bought it) or unpurchased (you still need to buy it).

- **Deleting Items**: If you want to remove an item, click the "Trash" icon next to it, and it will be deleted from the list.

- **Sharing the List**: Tap the "Share" icon in the app's header to send your shopping list to someone via WhatsApp or other messaging platforms.

## Code Structure 

While you don’t need to worry about the technical terms, here’s a little bit about how the app is organized: 

- **State Management**: Redux is a tool used here to keep track of what’s in your shopping list.
- **Persistent Storage**: The app can save your shopping list data so that you won’t lose it even after closing the app.

### Future Enhancements 

There are ideas for future updates to make the app even better! These include:
- Integrating cloud storage so you can sync your list across different devices.
- Categorizing items by type (like groceries, clothes, etc.).
- Adding push notifications to remind you about items you need to buy.
- Allowing voice input so you can add items just by speaking.
