


const APIKEY = 'http://138.197.67.148:8000/api'

function getusers() {

    return new Promise((resolve, reject) => {
        fetch(`${APIKEY}/users`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })


}

function postUser(data) {
    return new Promise((resolve, reject) => {

        fetch(`${APIKEY}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })

}



var itemtemplete = document.getElementById('itemtemplete').content
var userlist = document.getElementById('user-list')

var formEl = document.getElementById('form')
var firistnemeEl = document.getElementById('firistname')
var surnameEl = document.getElementById('lastname')
var phoneEl = document.getElementById('phone')
var paswoordEl = document.getElementById('password')
var paswoordrepeaEl = document.getElementById('password-repea')

function validateform(data) {
    const { password } = data
    const { passwordRepet, ...sended } = data
    if (password !== passwordRepet) throw new Error('parollar mos emas')
    return sended


}

formEl.addEventListener('submit', async event => {
    event.preventDefault()

    const data = {
        firstname: firistnemeEl.value,
        lastname: surnameEl.value,
        phone: phoneEl.value,
        password: paswoordEl.value,
        passwordRepet: paswoordrepeaEl.value
    }
    try {
        const isvalide = validateform(data)
        const resalt = await postUser(isvalide)
        console.log(resalt)
        console.log(isvalide)

    } catch (error) {
        console.log(error)
    }
})

getusers()
    .then(res => renderUsers(res, userlist),
        err => {
            console.log(err)
        })

function renderUsers(users, node) {
    node.innerHTML = null;
    let userfiragement = document.createDocumentFragment()

    users.forEach(({ firstname, lastname, phone }) => {
        let useritemEL = document.importNode(itemtemplete, true)

        useritemEL.querySelector('.user__fuiiname').textContent = `${firstname} ${lastname} `

        useritemEL.querySelector('.user__tel').textContent = phone

        userfiragement.appendChild(useritemEL)
    });

    node.appendChild(userfiragement)
}
