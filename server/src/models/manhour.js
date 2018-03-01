const { ODM, sqlz } = require('../utils/store')
const { data } = require('./manhourData')

const Manhour = sqlz.define('manhour', 
    {	
		hourlyWage: {
            type: ODM.DECIMAL
        },
        itemName: {
            type: ODM.STRING
        },
        price: {
            type: ODM.INTEGER
        }
    },
    {
		initialAutoIncrement: 1000,
		timestamps: false
    }
)

Manhour.sync({force: true})
    .then(() => {
        return Manhour.bulkCreate(data)
    })