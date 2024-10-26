const fetchFromTMDB = require('../services/tmdb.service')



const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US", res)
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.json({ success: true, content: randomMovie })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Movie Controller Error" })
    }
}

const getTvTrailers = async (req, res) => {
    const { id } = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, res)
        res.json({ success: true, trailers: data.results })
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
        res.status(404).json({ success: true, message: "Internal getMvieTrailer Error" })
    }
}

const getTvDetails = async (req,res) => {
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`,res)
        res.status(200).json({success:true,content:data})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({succes:false,message:"Internal getMovieDetails Error"})
    }
}

const getSimilarTvs = async (req,res) => {
    const {id}  =req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,res)
        res.status(200).json({success:true,similar:data.results})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({succes:false,message:"Internal getSimilarMovies Error"})
    }
}

const getTvsByCategory = async (req,res) => {
    const {category} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,res)
        res.status(200).json({success:true,content:data.results})
    } catch (error) {
        res.status(500).json({sucess:false,meddage:"Internal getMovieByCategory error "})
    }
}



module.exports = { getTrendingTv, getTvTrailers,getTvDetails,getSimilarTvs,getTvsByCategory }