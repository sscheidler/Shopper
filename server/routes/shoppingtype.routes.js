import express from 'express'
import shopperTypeCtrl from '../controllers/shoppingtype.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/newshoppertype')
    .post(shopperTypeCtrl.create)



router.route('/api/shoppertypesbyuser/:userId/:shoppertypeId')
    .delete(shopperTypeCtrl.deleteshoppingtype)


router.route('/api/shoppertypesbyuser/:userId')
    .get(shopperTypeCtrl.listbyuser)

router.route('/api/shoppertype/:shoppertypeId')
    .get(shopperTypeCtrl.read)
    .put(shopperTypeCtrl.newlistitem)
    .delete(shopperTypeCtrl.deletelistitem)

router.param('shoppertypeId', shopperTypeCtrl.getshoppingTypebyId)
router.param('userId', userCtrl.userByID)

export default router