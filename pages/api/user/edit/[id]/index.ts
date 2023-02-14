import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method == "PATCH") {
    const id = req.query.id;

    const { data } = await axios.patch(`https://api.docuclimb.com/api/collections/users/records/${id}`, req, {
      headers: {
        "Content-Type": req.headers["content-type"], // Multipart/form-data with boundary included
      },
    });
    return res.send(200);
    
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};