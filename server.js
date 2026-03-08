const express=require("express")
const {exec}=require("child_process")

const app=express()

app.use(express.static(__dirname))

app.get("/health",(req,res)=>{
res.json({status:"running"})
})

app.get("/version",(req,res)=>{
res.json({version:"1.0"})
})

app.post("/chaos/cpu",(req,res)=>{

exec("yes > /dev/null &")

res.json({
message:"CPU stress started"
})

})

app.post("/chaos/memory",(req,res)=>{

let arr=[]

for(let i=0;i<10000000;i++){
arr.push("CHAOS")
}

res.json({
message:"Memory stress triggered"
})

})

app.post("/chaos/slow",(req,res)=>{

setTimeout(()=>{
res.json({
message:"Slow response simulated"
})
},5000)

})

app.post("/chaos/crash",(req,res)=>{

res.json({
message:"App crashing..."
})

setTimeout(()=>{
process.exit(1)
},1000)

})

app.listen(3000,()=>{
console.log("Chaos server running on port 3000")
})
