import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {shortenedURL} = req.body;
        console.log(shortenedURL)
        if (!shortenedURL) {
            return res.status(409).json('Shortened URL was not passed')
        }
        const {data} = await axios.post('http://localhost:8080/send-answer', {shortenedURL})
        console.log(data)
        return res.status(200).json({data : 'ok'})
    }
}
