const express = require('express');
const connectdb= require('./config/db')
const cors = require('cors')
const app= express();
connectdb();

app.use(cors())
app.use(express.json({extended:false}));
const PORT= process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('Api Running');
})
app.use('/api/reg',  require('./routes/reg'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/forget',  require('./routes/forget-password'));
app.use('/api/reset-password',  require('./routes/reset-password'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/posts' , require('./routes/posts'))
app.listen(PORT,()=>{
    console.log(`Server Started At Port ${PORT}`);
});