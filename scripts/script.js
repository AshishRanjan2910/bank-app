const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double');
const btnFilter = document.getElementById('filter-rich');
const btnTotal = document.getElementById('total');

//add user

let data = [];

//fetch a random user from random user

let data_box = [];

const getRandomUser = async function(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];

    // console.log(user);
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()* 100000),

    }

    // console.log(newUser);
    addData(newUser);
}


// Function addData

const addData = function(obj){
    data_box.push(obj);
    updateDOM();
}

//function update DOM

const updateDOM = function(provideData = data_box){
    //clear main
    main.innerHTML = '<h2><strong>Name</strong> Balance</h2>';
    //add data one by one
    provideData.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('users');
        element.innerHTML = `<strong>${item.name}</strong>₹${formatToCurrency(item.balance)}`;
        main.appendChild(element);
    });
}

function formatToCurrency(amount){
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
}

// Double the balance amount

const doubleBalance =function(){
    data_box = data_box.map(user=> {
        return {...user, balance: user.balance*2};
    })
    updateDOM();
}

// Filter Rich

const filterRich = function() {
    data_box = data_box.filter((user) => user.balance>75000);
    updateDOM();
};

// total amount

const totalBalance = function(){
    // reduce takes two params i.e. accumulator and user
    const wealth = data_box.reduce((acc, user)=>(acc= acc+ user.balance), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Balance: <strong>${formatToCurrency(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// call random users 

getRandomUser();
getRandomUser();
getRandomUser();


////Event Listener

// add new user using button
btnAddUser.addEventListener('click', getRandomUser);

btnDouble.addEventListener('click', doubleBalance);

btnFilter.addEventListener('click', filterRich);

btnTotal.addEventListener('click', totalBalance);
