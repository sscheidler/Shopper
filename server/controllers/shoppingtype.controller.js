import ShoppingType from '../models/shopper.model'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
    const shoppingType = new ShoppingType(req.body)
    try {
        await shoppingType.save(
            function (err, data) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!data) {
                    return res.status(404).end();
                }
                console.log(data._id);
                res.json(data._id)
            }
        )

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const newlistitem = async (req, res) => {
    let item = {
        itemname: req.body.items
    }
    let shoppertypeId = req.body.shoppertypeId
    let updated = false
    //console.log(shoppertypeId)
    // console.log(item)


    try {
        await ShoppingType.findOneAndUpdate(
            { '_id': shoppertypeId },
            { $addToSet: { items: item } },
            //{ $push: { items: item } }, 
            {
                new: true
                //upsert: true
            },
            //{ returnDocument: 'after' },
            function (err, data) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!data) {
                    //return res.status(404).end();
                    console.log("Data Was Empty")
                    updated = true;
                }
                console.log(data);
                res.json(data)
                //updated = true;

            });

        if (updated) {
            let shoppingType = await ShoppingType.findById(shoppertypeId);
            res.json(shoppingType)
        } else {
            return res.status(405).end();
        }


    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listbyuser = async (req, res) => {
    try {

        let id = req.profile._id
        let shoppingType = await ShoppingType.find({ user_id: id })
        res.json(shoppingType)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getshoppingTypebyId = async (req, res, next, id) => {
    try {
        let shoppingType = await ShoppingType.findById(id);
        req.reqshoppingtype = shoppingType
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const deletelistitem = async (req, res, id) => {
    // console.log(req.body.itemId)
    // console.log(req.body.shoppertypeId)
    let itemId = req.body.itemId
    let shoppertypeId = req.body.shoppertypeId

    try {
        await ShoppingType.findOneAndUpdate(
            { '_id': shoppertypeId },
            {
                $pull: { items: { '_id': itemId } }
            },
            { new: true }

            , function (err, docs) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        message: "Error deleting item!"
                    })
                }
                else {
                    console.log("Deleted: ", docs)
                    res.json(docs)

                }

            })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const deleteshoppingtype = async (req, res) => {
    // console.log(req.reqshoppingtype);
    //let updated = false
    // let id = req.profile._id
    // console.log(id)

    try {
        let shoppingType = req.reqshoppingtype
        await shoppingType.remove(
            function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                console.log("Deleted Shopping List");
                res.json(req.reqshoppingtype)

            });

        // if (updated) {

        //     //let updatedshoppingType = await ShoppingType.find({ user_id: id })
        //     console.log("Running Find")
        //     //console.log(updatedshoppingType);
        //     res.json()
        // } else {
        //     return res.status(404).end();
        // }

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}




const read = (req, res) => {
    //console.log(req.reqshoppingtype);
    return res.json(req.reqshoppingtype)
}

export default {
    create,
    listbyuser,
    getshoppingTypebyId,
    read,
    newlistitem,
    deletelistitem,
    deleteshoppingtype

}