const create = async (shoppertype) => {
    try {
        let response = await fetch('/api/newshoppertype/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shoppertype)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const apinewlistitem = async (req, params, itemname) => {
    //console.log(reg)
    //console.log(params)
    try {
        let res = await fetch('/api/shoppertype/' + req._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shoppertypeId: req._id, items: params })
        })
        //if (res.status === 200) {
        // let response = await fetch('/api/shoppertype/' + reg._id, {
        //     method: 'GET',
        //     signal: signal,
        // })
        return await res.json()
        // }
    } catch (err) {
        console.log(err)
    }
}

const apideletelistitem = async (req, params) => {
    //console.log(id)
    //console.log(params)
    //console.log(req.shoppertypeId);
    let shoppertypeId = req.shoppertypeId;
    let checkedItemId = req.itemId;


    try {
        let res = await fetch('/api/shoppertype/' + checkedItemId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shoppertypeId: shoppertypeId, itemId: checkedItemId })
        })
        //if (res.status === 200) {
        // let response = await fetch('/api/shoppertype/' + reg._id, {
        //     method: 'GET',
        //     signal: signal,
        // })
        return await res.json()
        // }
    } catch (err) {
        console.log(err)
    }
}


const listbyuser = async (params, signal) => {
    try {
        //console.log("ListbyUser")
        //console.log(params);
        let response = await fetch('/api/shoppertypesbyuser/' + params.userId, {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, credentials, signal) => {
    try {

        //console.log("Read");
        //console.log(params);
        let response = await fetch('/api/shoppertype/' + params.shoppertypeId, {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const apideleteshoppingtype = async (params) => {
    try {
        let response = await fetch('/api/shoppertypesbyuser/' + params.userId + '/' + params.shoppingTypeId, {
            method: 'DELETE',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


export {
    create,
    listbyuser,
    read,
    apinewlistitem,
    apideletelistitem,
    apideleteshoppingtype
}