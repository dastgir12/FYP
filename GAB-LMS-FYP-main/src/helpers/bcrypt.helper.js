const bcrypt= require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const hashedPassword = plainPassword => {
return new Promise(resolve=>{
resolve(bcrypt.hashSync(plainPassword , salt))
})
}

const compPassword=(plainPass,passFromDb)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(plainPass,passFromDb,function(err,result){
                if(err){
                    reject(err)
                }
                resolve(result)
        })
    })
}

module.exports={
    hashedPassword,
    compPassword
}