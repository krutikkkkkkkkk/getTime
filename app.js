const express = require('express')
const path = require('path')
const app = express()


app.get('/', (req, res)=> {
    var path = require('path');
    res.sendFile(path.resolve('./index.html'));
})


app.get('/api/timezone=:tz(*)', (req, res)=> {
    const tz = capitalizeFirstLetter(req.params.tz)

    try{
        let d = new Date().toLocaleString('en-US', {timeZone: tz});
        d = d.split(', ')
        let object = {
            result: true,
            date : d[0],
            time : d[1]
        }
        res.send(object);
    }
    
    catch(error){
        let object = {
            result: false,
            message: error.message
        }
        res.send(object)
    }
  
    
})

app.get('/api', (req, res)=> {
    try{
        let d = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
        d = d.split(', ')
        let object = {
            result: true,
            date : d[0],
            time : d[1]
        }
        res.send(object);
    }
    
    catch(error){
        let object = {
            result: false,
            message: error.message
        }
        res.send(object)
    }
  
    
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

function  capitalizeFirstLetter(input){
    input = input.toLowerCase()
    let words = input.split('/')
    let capitalize =[]
    words.forEach(element => {
        capitalize.push(element[0].toUpperCase() + element.slice(1, element.length))
    });
    let output =capitalize.join('/')
    return output
   
}
