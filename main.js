let apiUser = 'http://localhost:3000/user';
let apiProductList = 'http://localhost:3000/productList';
let apiProductListTop = 'http://localhost:3000/productList?productType=%C3%81o%20thun&productType=%C3%81o%20Kho%C3%A1c&&productType=%C3%81o%20hoodie';
let apiProductListPriceAsc = 'http://localhost:3000/productList?_sort=productPrice&_order=asc';
let apiProductListPriceDesc = 'http://localhost:3000/productList?_sort=productPrice&_order=desc';
let apiProductListNew = 'http://localhost:3000/productListNew';
let apiProductDetails = 'http://localhost:3000/productList?id=';

// Login, SignUp
function login() {
    getUser(handleLogin1);
}
function getUser(callback) {
    fetch(apiUser).then(function (res) {
        return res
            .json()
            .then(callback)
            .catch((err) => alert('Lỗi Server!'));
    });
}
// fetch(apiUser).then(function (res) {
//     return res
//         .json()
//         .then((data) => console.log(data[]))
//         .catch((err) => alert('Lỗi Server!'));
// });
function handleLogin1(data) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let checkLogin = data.some((data) => {
        return data.username == username && data.password == password;
        // return true;
    });

    console.log(checkLogin);
    if (checkLogin) {
        alert('Đăng nhập thành công, quay về trang chủ!');
        localStorage.setItem('isLogin', 1);
        window.location.href = '/index.html';
    } else {
        alert('Đăng nhập thất bại, nhập sai tên đăng nhập hoặc mật khẩu!');
    }
}

function handleLogin(data) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let checkEmpty = false;
    let checkEmptyFlag = 0;
    let checkLogin = false;
    // data.forEach((data) => {
    //     if (data.username == username && data.password == password) {
    //         checkLogin = true;
    //     }
    // });
    if (username === '' && password === '') {
        checkEmpty = true;
    } else if (username === '') {
        checkEmpty = true;
        checkEmptyFlag = 1;
    } else if (password === '') {
        checkEmpty = true;
        checkEmptyFlag = 2;
    } else {
        checkLogin = data.some((data) => {
            return data.username == username && data.password == password;
        });
        // data.forEach((data) => {
        //     if (data.username == username && data.password == password) {
        //         checkLogin = true;
        //     }
        // });
    }

    console.log(checkLogin);
    if (!checkEmpty) {
        if (checkLogin) {
            alert('Đăng nhập thành công, quay về trang chủ!');
            localStorage.setItem('isLogin', 1);
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
            addElements(gridProductNew, value);
        }
    });

// Render products by JSON
let gridProductMain = document.querySelector('.product-list-main');
let chooseFilterType = document.querySelector('.choose-filter-type');
let filterInput = document.getElementById('filter-input');
let btnSearch = document.querySelector('.search-icon');

//break page
let breakPageFlag = 1;
let breakPage = document.querySelector('input[name="break-page"]');
let breakPageFormat = `?_page=${breakPageFlag}&_limit=8`;

document.addEventListener('click', (e) => {
    if (e.target.matches("input[name='break-page']")) {
        breakPageFlag = e.target.value;
        breakPageFormat = `?_page=${breakPageFlag}&_limit=8`;
        // gridProductMain.innerHTML = '';
        // fetch(apiProductList + breakPageFormat)
        //     .then((res) => res.json())
        //     .then((json) => {
        //         for (let value of json) {
        //             addElements(gridProductMain, value);
        //         }
        //     });
    }
});

// all product
// fetch(apiProductList)
// let productFetchAPI = document.querySelector('#nav .product-fetch-api');
// if (productFetchAPI) {
//     productFetchAPI.addEventListener('click', (e) => {
//         // alert('asdasd');
//         console.log('asdasdad');
//         fetch(apiProductList)
//             .then((res) => res.json())
//             .then((json) => {
//                 for (let value of json) {
//                     addElements(gridProductMain, value);
//                 }
//             });
//     });
// }
fetch(apiProductList)
    .then((res) => res.json())
    .then((json) => {
        for (let value of json) {
            addElements(gridProductMain, value);
        }
    });

let gridProductTop = document.querySelector('.product-list-top');

fetch(apiProductListTop)
    .then((res) => res.json())
    .then((json) => {
        for (let value of json) {
            addElements(gridProductTop, value);
            console.log(value);
        }
    });

if (chooseFilterType) {
    chooseFilterType.addEventListener('change', (e) => {
        gridProductMain.innerHTML = '';
        // back all products
        if (chooseFilterType.value === 'all-product') {
            fetch(apiProductList)
                .then((res) => res.json())
                .then((json) => {
                    for (let value of json) {
                        addElements(gridProductMain, value);
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
                        addElements(gridProductMain, value);
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
                        // console.log(item);
                    }
                });
        }
        // filter products by high-to-low price
        if (chooseFilterType.value === 'high-to-low') {
            fetch(apiProductListPriceDesc)
                .then((res) => res.json())
                .then((json) => {
                    for (let value of json) {
                        addElements(gridProductMain, value);
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
}

//format number -> currency
function formatNumber(num) {
    return num.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}

// localStorage.setItem('localStorageAllItemPrice', 0);

function addItemOnLocalStorage(productID, image, productType, productName, productPrice, total) {
    if (localStorage.getItem('isLogin') === null || localStorage.getItem('isLogin') === 0) {
        alert('Đăng nhập để mua sản phẩm!');
    } else {
        alert(`Thêm thành công 1 ${productType} ${productName} vào giỏ hàng!`);
        let productListCart = getProductListCart();
        let isExist = false;

        for (let i = 0; i < productListCart.length; i++) {
            if (productListCart[i].productID == productID) {
                productListCart[i].quantity += 1;
                productListCart[i].total += productPrice;
                isExist = true;
                localStorage.setItem('localStorageAllItemPrice', parseInt(localStorage.getItem('localStorageAllItemPrice')) + productPrice);
            }
        }
        // let priceConvert = productPrice.toLocaleString('vi-VN', {
        //     style: 'currency',
        //     currency: 'VND',
        // });
        if (isExist == false) {
            let cartItem = setItemProperties(productID, image, productName, productPrice, 1, productPrice);
            productListCart.push(cartItem);
            if (localStorage.getItem('localStorageAllItemPrice')) {
                localStorage.setItem('localStorageAllItemPrice', parseInt(localStorage.getItem('localStorageAllItemPrice')) + productPrice);
            } else {
                localStorage.setItem('localStorageAllItemPrice', localStorage.getItem('localStorageAllItemPrice') + productPrice);
            }
        }

        saveProductListCartToLocalStorage(productListCart);
    }
}

// add elements
// <button onclick="location.href='product-details.html'" class="btn-buynow js-buynow">Chi tiết</button>
const btnNext = document.querySelector('#content .btn-next-page');

function addElements(appendIn, value) {
    let div = document.createElement('div');
    div.className = 'product-item';

    let { id, image, productType, productName, productPrice } = value;
    let priceConvert = productPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    div.innerHTML = `
            <img src="${image}" alt="" class="product-img" title="${productName}">
            <p class="product-type">${productType}</p>
            <p class="product-name">${productName}</p>
            <p class="product-price">${priceConvert}</p>
            <button onclick="addItemOnLocalStorage('${id}','${image}','${productType}' , '${productName}', ${productPrice}, 0)" class="btn-buynow js-buynow">Thêm vào giỏ hàng</button>
    `;
    if (appendIn) {
        appendIn.appendChild(div);
    }
}

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

// Add to cart
// let btnAddToCart = document.querySelectorAll(".btnAddToCart")
// console.log(btnAddToCart)

// if(btnAddToCart) {
//     btnAddToCart.addEventListener("click", function(){
//         alert("test");
//     })
// }
let localStorageCartItemKey = 'listCartItem';

function setItemProperties(productID, image, productName, productPrice, quantity, total) {
    let cartItem = new Object();
    cartItem.productID = productID;
    cartItem.image = image;
    cartItem.productName = productName;
    cartItem.productPrice = productPrice;
    cartItem.quantity = quantity;
    cartItem.total = total;
    return cartItem;
}

function getProductListCart() {
    let productListCart = new Array();
    let productListCartData = localStorage.getItem(localStorageCartItemKey);

    if (productListCartData != null) {
        productListCart = JSON.parse(productListCartData);
    }

    return productListCart;
}

function saveProductListCartToLocalStorage(productListCart) {
    let productListCartData = JSON.stringify(productListCart);
    localStorage.setItem(localStorageCartItemKey, productListCartData);
}

//Render Cart Item
function getItemInLocalStorage(item) {
    let listCart = document.querySelector('#cart-container table tbody');
    let headerListCart = document.querySelector('#cart-container table thead');
    // <input class="w-25 pl-1" value="${item.quantity}" type="number" min="1" onchange="handleQuantity('ádsdsdsd')"/>
    if (headerListCart) {
        headerListCart.innerHTML = `
    <tr>
        <td>Xoá</td>
        <td>Hình ảnh</td>
        <td>Sản phẩm</td>
        <td>Giá</td>
        <td>Số lượng</td>
        <td>Tổng</td>
    </tr>
    `;
    }

    let htmls = item.map((item) => {
        return `
        <tr>
        <td>
            <a href="#" class=""><i onclick="deleteItem('${item.productID}')" class="ti-close"></i></a>
        </td>
        <td>
            <img src="${item.image}" alt="" />
        </td>
        <td>
            <h5>${item.productName}</h5>
        </td>
        <td>
            <h5>${formatNumber(item.productPrice)}</h5>
        </td>
        <td>
                <i onclick="decreaseItem('${item.productID}')" class="ti-minus quantity-decrease"></i>
                <lable>${item.quantity}</label>
                <i onclick="increaseItem('${item.productID}')" class="ti-plus quantity-increase"></i>
        </td>
        <td>
            <h5>${formatNumber(item.total)}</h5>
        </td>
    </tr>
        `;
    });
    if (listCart) {
        listCart.innerHTML = htmls.join('');
    }
}
let listCartItemInLocalStorage = JSON.parse(localStorage.getItem('listCartItem'));
// console.log(listCartItemInLocalStorage.length);

if (listCartItemInLocalStorage.length === 0) {
    let listCart = document.querySelector('#cart-container');
    if (listCart) {
        listCart.innerHTML = `
        <h3>Giỏ hàng trống!</h3>
        `;
    }
} else {
    getItemInLocalStorage(listCartItemInLocalStorage);
}

//Decrease Item
function decreaseItem(productID) {
    let listCartItemInLocalStorage = JSON.parse(localStorage.getItem('listCartItem'));
    // console.log(listCartItemInLocalStorage);

    // let listCartUpdate = listCartItemInLocalStorage.map((item) => {
    //     if (productID != item.productID) {
    //         return {
    //             image: item.image,
    //             productID: item.productID,
    //             productName: item.productName,
    //             productPrice: item.productPrice,
    //             quantity: item.quantity,
    //             total: item.total,
    //         };
    //     } else {
    //         return {
    //             image: item.image,
    //             productID: item.productID,
    //             productName: item.productName,
    //             productPrice: item.productPrice,
    //             quantity: item.quantity - 1,
    //             total: item.total,
    //         };
    //     }
    // });

    listCartItemInLocalStorage.forEach((item) => {
        if (productID == item.productID && item.quantity > 1) {
            item.quantity -= 1;
            item.total -= item.productPrice;
            localStorage.setItem('localStorageAllItemPrice', parseInt(localStorage.getItem('localStorageAllItemPrice')) - item.productPrice);
            location.reload();
        }
    });
    // console.log(listCartItemInLocalStorage);
    // let productListCartData = JSON.stringify(listCartUpdate);
    localStorage.setItem(localStorageCartItemKey, JSON.stringify(listCartItemInLocalStorage));
}

//Increase Item
function increaseItem(productID) {
    let listCartItemInLocalStorage = JSON.parse(localStorage.getItem('listCartItem'));

    listCartItemInLocalStorage.forEach((item) => {
        if (productID == item.productID) {
            item.quantity += 1;
            item.total += item.productPrice;
            localStorage.setItem('localStorageAllItemPrice', parseInt(localStorage.getItem('localStorageAllItemPrice')) + item.productPrice);
            location.reload();
        }
    });
    // console.log(listCartItemInLocalStorage);
    localStorage.setItem(localStorageCartItemKey, JSON.stringify(listCartItemInLocalStorage));
}

//Delete Item
function deleteItem(productID) {
    let listCartItemInLocalStorage = JSON.parse(localStorage.getItem('listCartItem'));

    listCartItemInLocalStorage.forEach((item, index, object) => {
        if (productID == item.productID) {
            object.splice(index, 1);
            localStorage.setItem('localStorageAllItemPrice', parseInt(localStorage.getItem('localStorageAllItemPrice')) - item.productPrice * item.quantity);
            location.reload();
        }
    });
    // console.log(listCartItemInLocalStorage);

    localStorage.setItem(localStorageCartItemKey, JSON.stringify(listCartItemInLocalStorage));
}

let btnPayment = document.querySelector('#content .btn-payment');
if (btnPayment) {
    btnPayment.addEventListener('click', (e) => {
        alert('Thanh toán thành công!');
        localStorage.removeItem('listCartItem');
        window.location.href = '/index.html';
        // location.reload();
    });
}

function setAllItemPrice() {
    const allItemPriceValue = parseInt(localStorage.getItem('localStorageAllItemPrice'));
    // if (listCartItemInLocalStorage.length === 0) {
    // allItemPriceValue = 0;
    // }
    let allItemPrice = document.querySelector('#content #cart-bottom .all-product-price');

    if (allItemPrice) {
        allItemPrice.innerHTML = `
        <h6>Tổng</h6>
        <p>${formatNumber(allItemPriceValue)}</p>
        `;
    }
}
setAllItemPrice();
