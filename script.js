const searchInput = document.querySelector('.search');
const searchOptions = document.querySelector('.options');
const usersInfo = document.querySelector('.users-wrapper');

const USER_PER_PAGE = 5;

let users = {}

async function getItems() {
    if(searchInput.value) {
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchInput.value}&per_page=${USER_PER_PAGE}`);
        const data = await response.json();
        searchOptions.innerHTML = '';
        data.items.forEach((item, i) => {
            users[i] = {};
            users[i].name = item.name;
            users[i].stars = item.stargazers_count;
            users[i].owner = item.owner.login;
            let name = `<li class = 'repositories' data-index = '${i}'>${users[i].name}</li>`;
            searchOptions.innerHTML += name;
        });
    } else {
        searchOptions.innerHTML = '';
    }
};

searchOptions.addEventListener('click', (e) => {
    let event = e.target.dataset.index;
    const userInfo = document.createElement('div');
    const userInfoText = document.createElement('ul');
    userInfo.classList.add('user-info');
    userInfoText.classList.add('user-info-text');
    const imgs = document.createElement('button');
    imgs.classList.add('images');
    const img1 = document.createElement('img');
    img1.classList.add('img')
    img1.src = './img/x.png';
    imgs.append(img1);
    userInfoText.innerHTML = `
            <li>name: ${users[event].name}</li>
            <li>owner ${users[event].owner}</li>
            <li>stars: ${users[event].stars}</li>`;
            userInfo.appendChild(userInfoText);
            userInfo.appendChild(imgs)
            usersInfo.appendChild(userInfo);
    userInfo.addEventListener('click', (event) => {
        if(event.target.classList.contains('img')) {
            event.target.parentElement.parentElement.remove()
        }
    })
});

const debounce = (fn, ms) => {
    let timeout;
    return function () {
        let context = this, args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(() => fn.apply(context, args), ms);
    }
};

let handleDebounce = debounce(getItems, 500);

searchInput.addEventListener('keyup', handleDebounce)






