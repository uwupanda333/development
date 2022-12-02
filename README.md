# Development

### Link to Deployed Website
If you used the stencil code, this is `https://uwupanda333.github.io/development`

### Goal and Value of the Application
The purpose of my application is to serve as a bakery repository in which a uer can essentially filter the items by the bakery food type and dietary restrictions as well as sort the items by price.
This ensures the process of selecting applicable foods to the user is as seamless as possible.

### Usability Principles Considered
I palced the filtering and sorting check buttons at the very top of my website to ensure the user can notice these items immediately. The prices and items they selected will always remain at the bottom
to ensure a clear understanding of hiearchy.

### Organization of Components
I utilized three main files - the App.js where all the buttons clicks, filtering, and sorting are handled, BakeryItem.js which is the general structure of each and every item of the bakery, and bakery-data.json which is representative of the data for each bakery item that wa sused.

### How Data is Passed Down Through Components
The data is passed down through components by first accessing the json data in bakery data which is then subsequently used to create the BakeryItem.js in the main return. We utilized a variable called filteredData that will enable us filter or sort through this particular depending with use states depending on whatever is most applicable to the user in their case.

### How the User Triggers State Changes
The user triggers state changes when they press the check buttons that alter the states of the isCheckedPastry, isCheckedCake, etc. which is then necessary for the filter state which is necessay for the filterList method that will adjust filteredData that is utimately outputted onto the user's screen.
