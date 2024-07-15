

import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"

const BASE_URL = 'toy/'
const TOY_KEY = 'toyDB'
const PAGE_SIZE = 3

const labels = [
    'Hero',
    'Figure',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels,
    getLabelCounts,
    addMsg,
    removeMsg
}


// function query(filterBy = {}) {
    // }
    function query(filterBy = {}, sortBy, pageIdx) {
        // const filter = {filterBy,sortBy,pageIdx}
        console.log('filterBy:', filterBy);
        console.log('sortBy:', sortBy);
        
        return httpService.get(BASE_URL,filterBy)
    // return httpService.get(BASE_URL, { filterBy, sortBy, pageIdx })
}

function get(toyId) {
    console.log('toyId:', toyId);
    return httpService.get(BASE_URL + toyId)

}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)

}

async function save(toy) {
    let savedToy
    if (toy._id) {
      savedToy = await httpService.put(BASE_URL + toy._id, toy)
    } else {
      savedToy = await httpService.post(BASE_URL, toy)
    }
    console.log("savedToy in front", savedToy)
    return savedToy
  }

// async function save(toy) {
//     const method = toy._id ? 'put' : 'post'
//     return httpService[method](BASE_URL, toy)

// }

function getDefaultFilter() {
    return {
        name: '',
        inStock: null,
        labels: [],
        pageIdx: 0,
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
    }
}

function getToyLabels() {
    return [...labels]
}

async function addMsg(toyId, txt) {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
    return savedMsg
  }

  async function removeMsg(toyId, msgId) {
    const removedId = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
    return removedId
  }

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}


function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['Talking Doll', 'Power Ranger', 'Action Figure', 'Hug Me', 'Pikachu', 'Robot']
        for (let i = 0; i < 8; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            const price = utilService.getRandomIntInclusive(10, 200)
            toys.push(_createToy(name, price))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price) {
    const toy = getEmptyToy(name, price)
    toy._id = utilService.makeId()
    toy.createAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    toy.labels = []
    for (let i = 0; i < 3; i++) {
        toy.labels.push(labels[utilService.getRandomIntInclusive(0, labels.length - 1)])
    }
    return toy
}


async function getLabelCounts() {
    try {
        const toys = await query()
        console.log(toys)
        const labelCounts = {}
        console.log('toyslabel:', toys);
        toys.forEach(toy => {
            console.log('toy:', toy);
            toy.labels.forEach(label => {
                console.log('label:', label);
                if (labelCounts[label]) {
                    labelCounts[label]++
                } else {
                    labelCounts[label] = 1
                }
            })
        })
        const labelCountArray = Object.entries(labelCounts).map(
            ([label, count]) => ({
                label,
                count,
            })
        )
        return labelCountArray
    } catch (err) {
        console.log('err:', err);
    }

}
