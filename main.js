let apiUser = 'http://localhost:3000/user';
let apiProductList = 'http://localhost:3000/productList';
let apiProductListPriceAsc = 'http://localhost:3000/productList?_sort=productPrice&_order=asc';
let apiProductListPriceDesc = 'http://localhost:3000/productList?_sort=productPrice&_order=desc';
let apiProductListNew = 'http://localhost:3000/productListNew';

// Login, SignUp
function login() {
    getUser(handleLogin);
}
function getUser(callback) {
    fetch(apiUser).then(function (res) {
        return res
            .json()
            .then(callback)
            .catch((err) => alert('Lỗi Server!'));
    });
}
function handleLogin(data) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let checkEmpty = false;
    let checkEmptyFlag = 0;
    // let checkLogin = false;
    // data.forEach((data) => {
    //     if (data.username == username && data.password == password) {
    //         checkLogin = true;
    //     }
    // });
    let checkLogin = data.some((data) => {
        if (username === '' && password === '') {
            checkEmpty = true;
        } else if (username === '') {
            checkEmpty = true;
            checkEmptyFlag = 1;
        } else if (password === '') {
            checkEmpty = true;
            checkEmptyFlag = 2;
        }
        return data.username === username && data.password === password;
    });
    if (!checkEmpty) {
        if (checkLogin) {
            alert('Đăng nhập thành công, quay về trang chủ!');
            window.location.href = '/index.html';
        } else {
            alert('Đăng nhập thất bại, nhập sai tên đăng nhập hoặc mật khẩu!');
        }
    } else {
        switch (checkEmptyFlag) {
            case 0:
                alert('Tên đăng nhập và mật khẩu không được để trống!');
                break;
            case 1:
                alert('Tên đăng nhập không được để trống!');
                break;
            case 2:
                alert('Mật khẩu không được để trống!');
                break;
        }
    }
}

function signUp() {
    handleSignUp();
}

function createUser(data) {
    fetch(apiUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}
function handleSignUp() {
    let fullname = document.getElementById('fullname-new').value;
    let username = document.getElementById('username-new').value;
    let password = document.getElementById('password-new').value;
    let email = document.getElementById('email-new').value;
    let gender = document.querySelector('input[name="gender-new"]:checked').value;
    let address = document.getElementById('address-new').value;
    let checkEmpty = false;
    let checkEmptyFlag = 0;

    if (fullname === '') {
        checkEmpty = true;
        checkEmptyFlag = 1;
    } else if (username === '') {
        checkEmpty = true;
        checkEmptyFlag = 2;
    } else if (password === '') {
        checkEmpty = true;
        checkEmptyFlag = 3;
    } else if (email === '') {
        checkEmpty = true;
        checkEmptyFlag = 4;
    }

    if (!checkEmpty) {
        let user = {
            fullname: fullname,
            username: username,
            password: password,
            email: email,
            gender: gender,
            address: address,
        };
        createUser(user);
        alert('Đăng ký thành công, đăng nhập ngay thôi!');
    } else {
        switch (checkEmptyFlag) {
            case 1:
                alert('Họ và tên không được để trống!');
                break;
            case 2:
                alert('Tên đăng nhập không được để trống!');
                break;
            case 3:
                alert('Mật khẩu không được để trống!');
                break;
            case 4:
                alert('Email không được để trống!');
                break;
        }
    }
}

// Render new products by JSON
let gridProductNew = document.querySelector('.product-list-new');

fetch(apiProductListNew)
    .then((res) => res.json())
    .then((json) => {
        for (let value of json) {
            addElement(gridProductNew, value);
        }
    });

function addElement(appendIn, value) {
    let div = document.createElement('div');
    div.className = 'product-item';

    let { image, productType, productName, productPrice } = value;
    priceConvert = productPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    div.innerHTML = `
            <img src="${image}" alt="" class="product-img" title="${productName}">
            <p class="product-type">${productType}</p>
            <p class="product-name">${productName}</p>
            <p class="product-price">${priceConvert}</p>
            <button href="" class="btn-buynow js-buynow">Chi tiết</button>
    `;
    if (appendIn) {
        appendIn.appendChild(div);
    }
}

// Render products by JSON
let gridProductMain = document.querySelector('.product-list-main');
let chooseFilterType = document.querySelector('.choose-filter-type');
let filterInput = document.getElementById('filter-input');
let btnSearch = document.querySelector('.search-icon');

// all product
fetch(apiProductList)
    .then((res) => res.json())
    .then((json) => {
        for (let value of json) {
            addElement(gridProductMain, value);
        }
    });

function testAlert() {
    alert('test');
}

chooseFilterType.addEventListener('change', (e) => {
    gridProductMain.innerHTML = '';
    // back all products
    if (chooseFilterType.value === 'all-product') {
        fetch(apiProductList)
            .then((res) => res.json())
            .then((json) => {
                for (let value of json) {
                    addElement(gridProductMain, value);
                    let filterValue = removeAccents(filterInput.value.toUpperCase());
                    let item = gridProductMain.querySelectorAll('.product-item');

                    for (let i = 0; i < item.length; i++) {
                        let productType = item[i].querySelector('.product-type');
                        let productName = item[i].querySelector('.product-name');

                        if (removeAccents(productType.innerHTML).toUpperCase().indexOf(filterValue) > -1 || removeAccents(productName.innerHTML).toUpperCase().indexOf(filterValue) > -1) {
                            item[i].style.display = 'initial';
                        } else {
                            item[i].style.display = 'none';
                        }
                    }
                }
            });
    }
    // filter products by low-to-high price
    if (chooseFilterType.value === 'low-to-high') {
        fetch(apiProductListPriceAsc)
            .then((res) => res.json())
            .then((json) => {
                for (let value of json) {
                    addElement(gridProductMain, value);
                    let filterValue = removeAccents(filterInput.value.toUpperCase());
                    let item = gridProductMain.querySelectorAll('.product-item');

                    for (let i = 0; i < item.length; i++) {
                        let productType = item[i].querySelector('.product-type');
                        let productName = item[i].querySelector('.product-name');

                        if (removeAccents(productType.innerHTML).toUpperCase().indexOf(filterValue) > -1 || removeAccents(productName.innerHTML).toUpperCase().indexOf(filterValue) > -1) {
                            item[i].style.display = 'initial';
                        } else {
                            item[i].style.display = 'none';
                        }
                    }
                    console.log(item);
                }
            });
    }
    // filter products by high-to-low price
    if (chooseFilterType.value === 'high-to-low') {
        fetch(apiProductListPriceDesc)
            .then((res) => res.json())
            .then((json) => {
                for (let value of json) {
                    addElement(gridProductMain, value);
                    let filterValue = removeAccents(filterInput.value.toUpperCase());
                    let item = gridProductMain.querySelectorAll('.product-item');

                    for (let i = 0; i < item.length; i++) {
                        let productType = item[i].querySelector('.product-type');
                        let productName = item[i].querySelector('.product-name');

                        if (removeAccents(productType.innerHTML).toUpperCase().indexOf(filterValue) > -1 || removeAccents(productName.innerHTML).toUpperCase().indexOf(filterValue) > -1) {
                            item[i].style.display = 'initial';
                        } else {
                            item[i].style.display = 'none';
                        }
                    }
                }
            });
    }
});

function addElement(appendIn, value) {
    let div = document.createElement('div');
    div.className = 'product-item';

    let { image, productType, productName, productPrice } = value;
    priceConvert = productPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    div.innerHTML = `
            <img src="${image}" alt="" class="product-img" title="${productName}">
            <p class="product-type">${productType}</p>
            <p class="product-name">${productName}</p>
            <p class="product-price">${priceConvert}</p>
            <button onclick="testAlert()" class="btn-buynow js-buynow">Chi tiết</button>
    `;
    if (appendIn) {
        appendIn.appendChild(div);
    }
}

// submit login
// let formLogin = document.querySelector('.form-login');
// if (formLogin) {
//     formLogin.addEventListener('submit', (e) => {
//         e.preventDefault();
//         alert('Đăng nhập thành công!');
//         window.location = '/index.html';
//     });
// }

// submit signup
// let formSignUp = document.querySelector('.form-signup');
// if (formSignUp) {
//     formSignUp.addEventListener('submit', (e) => {
//         //   e.preventDefault();
//         alert('Đăng ký thành công!');
//     });
// }

// filter input
if (filterInput) {
    // filterInput.addEventListener('keypress', function filterProducts(e) {
    //     if (e.key === 'Enter') {
    //         let filterValue = removeAccents(filterInput.value.toUpperCase())
    //         let item = gridProductMain.querySelectorAll(".product-item")
    //         for(let i = 0; i < item.length; i++){
    //             let productType = item[i].querySelector(".product-type")
    //             let productName = item[i].querySelector(".product-name")

    //             if( ( removeAccents(productType.innerHTML).toUpperCase().indexOf(filterValue) > -1 ) || ( removeAccents(productName.innerHTML).toUpperCase().indexOf(filterValue) > -1) ){
    //                 item[i].style.display = 'initial'
    //             }
    //             else{
    //                 item[i].style.display = 'none'
    //             }
    //     }
    //     }
    // })
    btnSearch.addEventListener('click', function filterProducts(e) {
        let filterValue = removeAccents(filterInput.value.toUpperCase());
        let item = gridProductMain.querySelectorAll('.product-item');

        for (let i = 0; i < item.length; i++) {
            let productType = item[i].querySelector('.product-type');
            let productName = item[i].querySelector('.product-name');

            if (removeAccents(productType.innerHTML).toUpperCase().indexOf(filterValue) > -1 || removeAccents(productName.innerHTML).toUpperCase().indexOf(filterValue) > -1) {
                item[i].style.display = 'initial';
            } else {
                item[i].style.display = 'none';
            }
        }
    });
    filterInput.addEventListener('keypress', function filterProducts(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            btnSearch.click();
        }
    });
}

// remove accents string
function removeAccents(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

// add to cart
// let btnAddToCart = document.querySelectorAll(".btnAddToCart")
// console.log(btnAddToCart)

// if(btnAddToCart) {
//     btnAddToCart.addEventListener("click", function(){
//         alert("test");
//     })
// }
