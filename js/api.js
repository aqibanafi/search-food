const spinner = document.getElementById('spinner');
const searchFood = () => {
    spinner.classList.remove('hidden')
    const findField = document.getElementById('search-field');
    const getValue = findField.value;
    findField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${getValue}`
    fetch(url)
    .then(res => res.json())
    .then(showFood => displaySearchFood(showFood.meals))
}
const displaySearchFood = foodItem => {
    spinner.classList.add('hidden')
    const getMainDiv = document.getElementById('main-div');
    getMainDiv.innerHTML = '';
    if(foodItem === null) {
        const warning = document.getElementById('warning');
        warning.classList.remove('hidden')
    } else {
        warning.classList.add('hidden')
    }
    foodItem.forEach(itemsName => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="flex justify-center mt-20">
            <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src="${itemsName.strMealThumb}" alt=""/>
            </a>
            <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">${itemsName.strMeal}</h5>
                <p>${itemsName.strInstructions.slice(0, 100)}</p>
                <button onclick="foodById(${itemsName.idMeal})" type="button" class="mt-12 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Show Detail </button>
            </div>
            </div>
        </div>
            `;
        getMainDiv.appendChild(createDiv);       
})
}
const getAllFood = allFood => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
    .then(res => res.json())
    .then(display => displayAllFood(display.meals.slice(0,10)))
}
const displayAllFood = displayFood => {
    const getMainDiv = document.getElementById('main-div');
    displayFood.forEach(items => {
        
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="flex justify-center mt-20">
            <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src="${items.strMealThumb}" alt=""/>
            </a>
            <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">${items.strMeal}</h5>
                <p>${items.strInstructions.slice(0,100)}</p>
                <button onclick="foodById(${items.idMeal})" type="button" class="mt-12 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Show Detail </button>
            </div>
            </div>
        </div>
            `;
            
        getMainDiv.appendChild(createDiv)
    })
}
getAllFood();
document.getElementById('show-all-btn').addEventListener('click', function(){
    const getAllFood = allFood => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
        .then(res => res.json())
        .then(display => displayAllFood(display.meals))
    }
    let count = 0;
    count++
    if(count === 1){
        const getButton = document.getElementById('show-all-btn');
        getButton.classList.add('hidden');
    }
    const displayAllFood = displayFood => {
        const getMainDiv = document.getElementById('main-div');
        displayFood.forEach(items => {
            
            const createDiv = document.createElement('div');
            createDiv.innerHTML = `
            <div class="flex justify-center mt-20">
                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <img class="rounded-t-lg" src="${items.strMealThumb}" alt=""/>
                </a>
                <div class="p-6">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">${items.strMeal}</h5>
                    <p>${items.strInstructions.slice(0,100)}</p>
                    <button onclick="foodById(${items.idMeal})" type="button" class="mt-12 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Show Detail </button>
                </div>
                </div>
            </div>
                `;
                
            getMainDiv.appendChild(createDiv)
        })
    }
    getAllFood();
})
const foodById = searchId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchId}`
    fetch(url)
    .then(res => res.json())
    .then(output => openModal(output.meals))
}
const openModal = modal => {
    const getModal = document.getElementById('modal-body');
    const createModalBody = document.createElement('div');
    createModalBody.innerHTML = `
        <div>
            <img class="mt-7" src="${modal[0].strMealThumb}" alt="">
            <p class="text-xl font-semibold mt-7">ID: <span class="ml-10 text-2xl font-bold text-red-600">${modal[0].idMeal}</span> </p>
            <p class="text-xl font-semibold mt-7">Country: <span class=" ml-10 text-2xl font-bold text-red-600">${modal[0].strArea}</span> </p>
            <p class="text-xl font-semibold mt-7">Category: <span class="ml-10 text-2xl font-bold text-red-600">${modal[0].strCategory}</span> </p>
            <p class="text-xl font-semibold mt-7">Major Ingredient: <span class="ml-4 text-2xl font-bold text-red-600">${modal[0].strIngredient1}</span> </p>
        </div>
    `;
    getModal.innerHTML = '';
    getModal.appendChild(createModalBody);
}
const getSearchField = document.getElementById('search-field');
document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(event.target.value)
    if (e.key === 'Enter') {
        searchFood();
    }
})