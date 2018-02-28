const { ODM, sqlz } = require('./sqlz')

const Car = sqlz.define('car', {
    carBrand: {
        type: ODM.STRING
    },
    carType: {
        type: ODM.STRING
    },
    carModel: {
        type: ODM.STRING
    }
})

Car.sync().then(() => {
   return Car.create({
       carBrand: '奥迪',
       carType: '奥迪',
       carModel: '奥迪'
   })
})