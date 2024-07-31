import{ Router} from 'express'

export default ({ config ,db}) => {
    let router =Router()
    router.get('/' ,(req,res) =>{
        res.render('index',{title:'holaa', message:'holla'})
    })


    router.get('/email' , (req,res) => {
        res.render('promotion_email', {name:'AHLEM' , couponCode:'CODE1'})
    })
    return router 
}