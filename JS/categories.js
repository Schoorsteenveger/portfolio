const data = {
  categories: [
    {
      name: 'React',
      items: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
      name: 'JavaScript',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Redux',
      items: ['Item 7', 'Item 8', 'Item 9'],
    },
    {
      name: 'Freelance',
      items: ['Item 10', 'Item 11', 'Item 12'],
    },
  ],
};

const categoriesDiv = document.getElementById('categories');

// Create a container for the categories
const container = document.createElement('div');
container.classList.add('container');

// Create a button row
const buttonRow = document.createElement('div');
buttonRow.classList.add('button-row');

// Create a button to show all items
const showAllButton = document.createElement('button');
showAllButton.textContent = 'Show All';
showAllButton.classList.add('button');
buttonRow.appendChild(showAllButton);

// Iterate through each category
data.categories.forEach((category) => {
  // Create a button element for the category name
  const categoryButton = document.createElement('button');
  categoryButton.textContent = category.name;
  categoryButton.classList.add('button');
  buttonRow.appendChild(categoryButton);

  // Create an unordered list for the category items
  const itemList = document.createElement('ul');

  // Iterate through each item in the category
  category.items.forEach((item) => {
    // Create a list item element
    const listItem = document.createElement('li');
    listItem.textContent = item;

    // Append the list item to the unordered list
    itemList.appendChild(listItem);
  });

  // Append the unordered list to the container
  container.appendChild(itemList);

  // Add click event listener to the category button
  categoryButton.addEventListener('click', () => {
    // Hide all items
    container.querySelectorAll('ul').forEach((list) => {
      list.style.display = 'none';
    });

    // Show items for the clicked category
    itemList.style.display = 'block';
  });
});

// Add click event listener to the "Show All" button
showAllButton.addEventListener('click', () => {
  // Show all items
  container.querySelectorAll('ul').forEach((list) => {
    list.style.display = 'block';
  });
});

// Show all items by default
container.querySelectorAll('ul').forEach((list) => {
  list.style.display = 'block';
});

// Append the button row and container to the categories div
categoriesDiv.appendChild(buttonRow);
categoriesDiv.appendChild(container);
