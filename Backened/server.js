require('dotenv').config()
const app = require('./src/app')

app.listen(3001,()=>{
    console.log('server is running on port 3001');
    
})