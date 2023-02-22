const { User, List, Role, sequelize } = require('../models')

const createList = async (req, res, next) => {
    const user = req.session.user
    if (!user) {
        console.log('no user')
        return res.sendStatus(401);
    }

    const t = await sequelize.transaction();

    try {
        const newList = await List.create({
            title: 'List Title'
        }, { transaction: t })

        const newRole = await Role.create({
            role: 'OWNER',
            UserId: user.id,
            ListId: newList.id
        }, { transaction: t })

        await t.commit();

        res.sendStatus(200)

    } catch (error) {
        await t.rollback();
        console.log('Create Failed')
    }
}

const getLists = async (req, res, next) => {
    const user = req.session.user
    if (!user) {
        console.log('no user')
        return res.sendStatus(401);
    }

    const lists = await List.findAll({
        attributes: ['title'],
        required: true,
        include: {
            model: User,
            attributes: ['username'],
            where: {
                id: user.id
            },
            through: {
                attributes: [],
                where: {
                    role: 'OWNER'
                }
            }
        },

    })
    return res.json(lists)

}
module.exports = { createList, getLists }