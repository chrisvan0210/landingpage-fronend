import type { NextApiRequest, NextApiResponse } from "next";
import nookies from 'nookies'
type Data = {
  name: string;
};

const getData = async (body: any) => {
    console.log(body);
 let result =  await fetch("http://localhost:5000/api/login", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: body,
  })
    .then((res) => res.json())
    .then((data) => data);
   
    return result
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  try {
    const response = await getData(req.body);
    res.status(200).json(response);

    // nookies.set(null, "session",response.user , {
    //     maxAge: 10, // 30 days
    //     path: "/",
    //   });
  } catch (err) {
    console.log(err);
    res.status(405).end();
  }
}
