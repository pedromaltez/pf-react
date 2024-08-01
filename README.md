# Provide Interview Tests

Please clone or fork this repository so you can make changes locally and then change into the project directory.

In the project directory, run:

#### `npm start`

This will open up our test application in your browser. (Be warned - the application is broker and you will be tasked with fixing it)

This README contains a series of tasks, which involve fixing bugs and adding features
to this demo application.

Please complete these tasks in order, and commit the solutions to each task in their own commit.
Please refer to the task number in your commit message.

Once completed please share your cloned repository with us.

Best of luck!

## Overview of the application
This is a very simple React application, created with create-react-app, which offers a basic E-Commerce interface.

The application allows a user to browse products and add them to a cart. Once the products are in the cart a user should
be able to checkout their shopping cart, and see the total cost of their order.

`/products` - Shows a user a list of available products

`/checkout` - Shows the user their shopping cart and total order value and let's a user place the order

## Tasks

### Task 1 - Fix the routing
The routes described above are not working, and you will be presented with an error if you have just ran `npm run start`

Please use your debugging skills to workout why you can't navigate to routes such as `/products`' and resolve this issue.

### Task 2 - React State Management
On the `/products` route you should be able to browse a list of products, and on each one 'Add to cart' can be clicked.
You should see the current shopping cart at the top of the page and the total price.

The shopping cart has a button to check out the order. If you click this, you will be taken to the `/checkout` page. But there is an issue! Once the application has switched to this
page, the shopping cart is now empty, and the user has nothing to order. The items in the shopping cart currently only display on the `/products` page, and they need to persist across
all pages (including `/checkout`) so the user doesn't lost the items in their cart when they swith pages.

Use your knowledge of React state management to resolve this issue. Please consider the different options such as Context API, Redux, etc. We would like to hear your reasoning behind the
chosen solution.

Please also add a confirmation message to the user when they have successfully placed their order. (The order doesn't need to be saved, it's just a dummy confirmation)

### Test 3 - Making Improvements
You may have noticed that if you click 'Add to cart' multiple times on a product, the listing for th product is duplicated in the shopping cart.

Please fix this issue so that the quantity of the product is increased, rather than adding a new listing for the product each time it is added to the cart.

### Test 3 - Component Creation
You should now have a working E-Commerce system! Users can browse products, and use the now working shopping cart to confirm their order.

However, the products themselves don't show much detail. We would like you to add a new route `product/{id}` which will display detail about the product. Users should be able to click a 'View Detail' button on each of the products on the `/products` page.

Take a look at the API being used to list the products, this will give you an idea of what information you will be able to display on the product detail page.

### Test 4 - Feature Implementation

Each product that is returned from the API has a 'discount' property. This is not currently being used in the application.

Please add a new feature to the `Cart` component, which calculates a new 'Total price' using the products discount value.
This new total should be displayed next to the original total, and should be the total price after the discount has been applied.



