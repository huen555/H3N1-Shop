let apiUser = 'http://localhost:3000/user'

        function login(){
            getUser(handleLogin)
        }
        function getUser(callback){
            fetch(apiUser).then(function (res){
                return res.json().then(callback)
            })
        }
        function handleLogin(data){
            let username = document.getElementById('username').value
            let password = document.getElementById('password').value
            data.forEach(data => {
                if(data.username == username && data.password == password){
                    alert('success')
                }
            });
        }