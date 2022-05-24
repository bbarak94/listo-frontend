export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
}


function query(entityType, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType))
    if(!entities){
        entities = _createBoards()
        _save(entityType, entities)
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType).then((entities) =>
        entities.find((entity) => entity._id === entityId)
    )
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType).then((entities) => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex(
            (entity) => entity._id === updatedEntity._id
        )
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity._id === entityId)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType).then((entities) => {
        newEntities = newEntities.map((entity) => ({
            ...entity,
            _id: _makeId(),
        }))
        entities.push(...newEntities)
        _save(entityType, entities)
        return entities
    })
}




const gUsers = [
    {
        _id: 'u100',
        fullname: 'Guest',
        username: 'guest',
        password: 'guest',
        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg',
        mentions: [
            {
                id: 'm101',
                boardId: 'b101',
                taskId: 't101',
            },
            {
                id: 'm102',
                boardId: 'b102',
                taskId: 't102',
            },
        ],
    },
    {
        _id: 'u101',
        fullname: 'Barak Braun',
        username: 'barak',
        password: 'barak',
        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
        mentions: [
            {
                id: 'm101',
                boardId: 'b101',
                taskId: 't101',
            },
            {
                id: 'm102',
                boardId: 'b102',
                taskId: 't102',
            },
        ],
    },
    {
        _id: 'u102',
        fullname: 'Guy Elizarov',
        username: 'guy',
        password: 'guy',
        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
        mentions: [
            {
                id: 'm102',
                boardId: 'b102',
                taskId: 't102',
            },
        ],
    },
    {
        _id: 'u103',
        fullname: 'Itai Rotstein',
        username: 'itai',
        password: 'itai',
        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
        mentions: [
            {
                id: 'm103',
                boardId: 'b103',
                taskId: 't103',
            },
        ],
    },
    {
        _id: 'u104',
        fullname: 'Tommy Irmia',
        username: 'tommy',
        password: 'tommy',
        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
        mentions: [
            {
                id: 'm104',
                boardId: 'b104',
                taskId: 't104',
            },
        ],
    },
]

function _createBoards(){
const boards = [
    {
        id: 'b101',
        title: 'First Board',
        archivedAt: null,
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Barak Braun',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
        },
        style: {
            background: '#ffffff',
        },
        labels: [
            {
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'Progress',
                color: '#61bd33',
            },
        ],
        members: [
            {
                id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            {
                id: 'u103',
                fullname: 'Itai Rotstein',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
            },
            {
                id: 'u104',
                fullname: 'Tommy Irmia',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
            },
        ],
        groups: [
            {
                id: 'g101',
                title: 'In Progress',
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: 'c101',
                        title: 'Replace logo',
                    },
                    {
                        id: 'c102',
                        title: 'Add Samples',
                    },
                    {
                        id: 'c103',
                        title: 'Make JSON Look Pretty',
                    },
                ],
                style: {},
            },
            {
                id: 'g102',
                title: 'QA',
                tasks: [
                    {
                        id: 'c103',
                        title: 'Test Filter Component',
                        archivedAt: 1589983468418,
                    },
                    {
                        id: 'c104',
                        title: 'Test headers new button',
                        status: 'in-progress',
                        description: 'description',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'I started testing it, will finish by tomorrow noon...',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Barak Braun',
                                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                },
                            },
                        ],
                        checklists: [
                            {
                                id: 'YEhmF',
                                title: 'Checklist',
                                todos: [
                                    {
                                        id: 'td101',
                                        title: 'First take a deep breath',
                                        isDone: false,
                                    },
                                    {
                                        id: 'td102',
                                        title: 'Grab a beer',
                                        isDone: true,
                                    }
                                ],
                            },
                        ],
                        memberIds: ['u100','u101','u102','u103','u104'],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        byMember: {
                            _id: 'u102',
                            username: 'guy',
                            fullname: 'Guy Elizarov',
                            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                        },
                        style: {
                            background: '#26de81',
                        },
                    },
                ],
                style: {},
            },
        ],
        activities: [
            {
                id: 'a101',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u101',
                    fullname: 'Barak Braun',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                task: {
                    id: 't107',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        id: 'b101',
        title: 'First Board',
        archivedAt: null,
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Barak Braun',
            imgUrl: 'srcassetsimgguest.jpg',
        },
        style: {
            backgroundImg: null,
            backgroundColor: '',
        },
        labels: [
            {
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'Progress',
                color: '#61bd33',
            },
        ],
        members: [
            {
                id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            {
                id: 'u103',
                fullname: 'Itai Rotstein',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
            },
            {
                id: 'u104',
                fullname: 'Tommy Irmia',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
            },
        ],
        groups: [
            {
                id: 'g101',
                title: 'In Progress',
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: 'c101',
                        title: 'Replace logo',
                    },
                    {
                        id: 'c102',
                        title: 'Add Samples',
                    },
                    {
                        id: 'c103',
                        title: 'Make JSON Look Pretty',
                    },
                ],
                style: {},
            },
            {
                id: 'g102',
                title: 'QA',
                tasks: [
                    {
                        id: 'c103',
                        title: 'Test Filter Component',
                        archivedAt: 1589983468418,
                    },
                    {
                        id: 'c104',
                        title: 'Test headers new button',
                        status: 'in-progress',
                        description: 'description',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'I started testing it, will finish by tomorrow noon...',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Barak Braun',
                                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                },
                            },
                        ],
                        checklists: [
                            {
                                id: 'YEhmF',
                                title: 'Checklist',
                                todos: [
                                    {
                                        id: 'td101',
                                        title: 'First take a deep breath',
                                        isDone: false,
                                    },
                                    {
                                        id: 'td102',
                                        title: 'Grab a beer',
                                        isDone: true,
                                    }
                                ],
                            },
                        ],
                        memberIds: ['u100','u101','u102','u103','u104'],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        byMember: {
                            _id: 'u102',
                            username: 'guy',
                            fullname: 'Guy Elizarov',
                            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                        },
                        style: {
                            bgColor: '#26de81',
                        },
                    },
                ],
                style: {},
            },
        ],
        activities: [
            {
                id: 'a101',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u101',
                    fullname: 'Barak Braun',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                task: {
                    id: 't107',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        id: 'b101',
        title: 'First Board',
        archivedAt: null,
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Barak Braun',
            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
        },
        style: {
            backgroundImg: null,
            backgroundColor: '',
        },
        labels: [
            {
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'Progress',
                color: '#61bd33',
            },
        ],
        members: [
            {
                id: 'u101',
                fullname: 'Barak Braun',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            {
                id: 'u103',
                fullname: 'Itai Rotstein',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
            },
            {
                id: 'u104',
                fullname: 'Tommy Irmia',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
            },
        ],
        groups: [
            {
                id: 'g101',
                title: 'In Progress',
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: 'c101',
                        title: 'Replace logo',
                    },
                    {
                        id: 'c102',
                        title: 'Add Samples',
                    },
                    {
                        id: 'c103',
                        title: 'Make JSON Look Pretty',
                    },
                ],
                style: {},
            },
            {
                id: 'g102',
                title: 'QA',
                tasks: [
                    {
                        id: 'c103',
                        title: 'Test Filter Component',
                        archivedAt: 1589983468418,
                    },
                    {
                        id: 'c104',
                        title: 'Test headers new button',
                        status: 'in-progress',
                        description: 'description',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'I started testing it, will finish by tomorrow noon...',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Barak Braun',
                                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                                },
                            },
                        ],
                        checklists: [
                            {
                                id: 'YEhmF',
                                title: 'Checklist',
                                todos: [
                                    {
                                        id: 'td101',
                                        title: 'First take a deep breath',
                                        isDone: false,
                                    },
                                    {
                                        id: 'td102',
                                        title: 'Grab a beer',
                                        isDone: true,
                                    }
                                ],
                            },
                        ],
                        memberIds: ['u100','u101','u102','u103','u104'],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        byMember: {
                            _id: 'u102',
                            username: 'guy',
                            fullname: 'Guy Elizarov',
                            imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
                        },
                        style: {
                            bgColor: '#26de81',
                        },
                    },
                ],
                style: {},
            },
        ],
        activities: [
            {
                id: 'a101',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u101',
                    fullname: 'Barak Braun',
                    imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
                },
                task: {
                    id: 't107',
                    title: 'Replace Logo',
                },
            },
        ],
    }
]
}

// post('user', gUsers)
// post('board', gBoards)