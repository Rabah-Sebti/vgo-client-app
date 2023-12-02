//pour ajouter les produits a la base de données
const express=require('express')
require('dotenv').config()
const connectDB=require('./db/connect')
const Driver=require('./models/driver')
const jsonDriver=require('./country.json')
const start=async()=>{
try {
    await connectDB(process.env.MONGO_URI)
    await Driver.deleteMany()//supprimer les données a la bd
    await Driver.create(jsonDriver)
    console.log('success data ajouter a BD !!!!!!!');
    process.exit(0)
} catch (error) {
    console.log(error);
    process.exit(1)
}
}
start()