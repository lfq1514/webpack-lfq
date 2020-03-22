let express=require('express')
let app=express()
app.get('/api/user',(req,res)=>{
    res.json({name:'测试'})

})
app.listen(9999)