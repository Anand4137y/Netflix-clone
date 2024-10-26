const fetchFromTMDB = require("../services/tmdb.service")
const User = require('../mongoDb/models/userModel')

//      person search api
const searchPerson = async (req,res) => {
    try {
        const {query} = req.params
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,res)
        
        if(response.results.length === 0){
            res.status(400).json(null)
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchhistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({success:true,content:response.results})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({success:false,message:"Internal searchPerson error"})
    }
}

//      Movie search api

const searchMovie = async (req,res) => {
    const {query} = req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,res)

        if(response.results.length === 0){
            res.status(400).json(null)
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({success:true,content:response.results})


    } catch (error) {
        res.status(500).json({success:false,message:"Internal searchMovie error"})

    }
}

//      Tv search api

const searchTv = async (req,res) => {
    const {query} = req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,res)

        if(response.results.length === 0){
            res.status(400).json(null)
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({success:true,content:response.results})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal searchTv error"})

    }
}

//   Api for search history

const getSearchHistory = async (req,res) => {
    try {
        res.status(200).json({success:true,content:req.user.searchHistory})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Searchhistory Error"})
    }
}

const removeItemFromSearchHistory = async (req,res) => {
    const {id} = req.params
    try {
        await User.findByIdAndDelete(req.user._id,{
            $pull:{
                searchHistory: {id: id}
            }
        })
        res.status(200).json({success:true,message:"Item removed from the dearch history"})
    } catch (error) {
        
    }
}
 
module.exports = {searchPerson,searchMovie,searchTv,getSearchHistory,removeItemFromSearchHistory}