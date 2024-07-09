import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const TOY_KEY = 'toyDB'
const PAGE_SIZE = 3
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,

}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.price) {
                toys = toys.filter(toy => toy.price >= filterBy.price)
            }

            if (filterBy.sort) {
                if (filterBy.sort === 'name') {
                    toys = toys.sort((a, b) => a.name.localeCompare(b.name));
                }
            }

            const filteredToysLength = toys.length
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE;
                toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
            }

            return (getMaxPage(filteredToysLength))
                .then(maxPage => {
                    return { toys, maxPage }
                })
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
        .catch(err => {
            console.error('Cannot get toy:', err)
            throw err
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
        .then(() => {
            return (getMaxPage())
                .then((maxPage) => {
                    return { maxPage }
                })
        })
        .catch(err => {
            console.error('Cannot remove toy:', err)
            throw err
        })
}

function save(toy) {
    return ((toy._id) ? _edit(toy) : _add(toy))
        .then((savedToy) => {
            return (getMaxPage())
                .then((maxPage) =>
                    ({ maxPage, savedToy })
                )
        })
}

function _add(toy) {
    toy = { ...toy }
    return storageService.post(TOY_KEY, toy)
        .catch(err => {
            console.error('Cannot add toy:', err)
            throw err
        })
}

function _edit(toy) {
    toy = { ...toy }
    return storageService.put(TOY_KEY, toy)
        .catch(err => {
            console.error('Cannot update toy:', err)
            throw err
        })
}

function getEmptyToy(name = '', price = 0, inStock = true) {
    return { name, price, inStock }
}

function getDefaultFilter() {
    return { name: '', price: 0, pageIdx: 0, sort: '' }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {
        name: searchParams.get('name') || '',
        price: +searchParams.get('price') || 0,
        pageIdx: +searchParams.get('pageIdx') || 0,
        sort: searchParams.get('sort') || ''
    }

    return filterBy
}

function getMaxPage(filteredToysLength) {
    if (filteredToysLength) return Promise.resolve(Math.ceil(filteredToysLength / PAGE_SIZE))
    return storageService.query(TOY_KEY)
        .then(toys => Math.ceil(toys.length / PAGE_SIZE))
        .catch(err => {
            console.error('Cannot get max page:', err)
            throw err
        })
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

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

