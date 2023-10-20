const { User, List, Role, sequelize } = require('../models')
const { Op } = require('sequelize')

const createList = async (req, res, next) => {
    const user = req.session.user
    const newList = null

    if (!user) {
        console.log('no user')
        return res.sendStatus(401);
    }

    if (!req.body?.title) {
        console.log('no title')
        return res.sendStatus(400)
    }

    const t = await sequelize.transaction();

    try {
        newList = await List.create({
            title: req.body.title
        }, { transaction: t })

        await Role.create({
            role: 'OWNER',
            UserId: user.id,
            ListId: newList.id
        }, { transaction: t })

        await t.commit();
       
    } catch (error) {
        await t.rollback();
        console.log('Create Failed', error)
        res.sendStatus(500)
    }
    res.json(newList)
}

const getLists = async (req, res, next) => {
    const user = req.session.user
    if (!user) {
        console.log('no user')
        return res.sendStatus(401);
    }

    const lists = await List.findAll({
        attributes: ['id', 'title'],
        order: [['createdAt', 'desc']],
        include: {
            model: User,
            required: true,
            attributes: [],
            where: {
                id: user.id
            },
            through: {
                attributes: [],
                where: {
                    role: { [Op.or]: ['OWNER', 'EDITOR'] }
                }
            }
        },

    })
    return res.json(lists)

}
module.exports = { createList, getLists }