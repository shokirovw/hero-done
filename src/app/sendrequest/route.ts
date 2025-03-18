import { NextResponse, type NextRequest } from 'next/server'

const tokens = {
    "0": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTA1LCJpYXQiOjE3NDIyNzQ0MDYsImV4cCI6MTc1MDA1MDQwNn0.OUKP-ddQbrPx5KTEhkbJsL0aekYPVevV4pUWKhLNmpg", // Ruslan expire: 1750050406
    "1": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTYyLCJpYXQiOjE3NDIyNzQ0NjgsImV4cCI6MTc1MDA1MDQ2OH0.FoYA-QNJuaa6D3zHBSL4zFbSqCx6ig9Wf3H5dRRYC5w", // Shohjahon expire: 1750050468
    "2": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNTYzLCJpYXQiOjE3NDIyNzQ1MjIsImV4cCI6MTc1MDA1MDUyMn0.EYMhpDSrTrPKAc-InIR1-jylzY4Id75rTJ3J2PDT1E8", // Doniyor expire: 1750050522
    "3": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMjQ2LCJpYXQiOjE3NDIyNzQ1NzUsImV4cCI6MTc1MDA1MDU3NX0.mGce2wNXiX9OhuXy7g06gcABNRDFPz6gs1eHYbblj2A", // Umar expire: 1750050575
    "4": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDI0LCJpYXQiOjE3NDIyNzQ2MTcsImV4cCI6MTc1MDA1MDYxN30.fThQpm1KI_rUS7bQE2JpG66oWil9dAkVj9iSGgLyA20", // Muhammadiyor expire: 1750050617
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const person_id = searchParams.get('person_id');
    const url = searchParams.get('url');

    if (tokens[person_id]) { 
        if (url?.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
            let headers = new Headers();
            headers.append("Accept", "application/json, text/plain, */*");
            headers.append("Accept-Encoding", "gzip");
            headers.append("authorization", `Bearer ${tokens[person_id]}`);
            headers.append("Connection", "Keep-Alive");
            headers.append("Host", "api.newuzbekistan.hero.study");
            headers.append("User-Agent", "okhttp/4.9.2");

            let req = await fetch(url, {
                method: "GET",
                headers: headers
            });

            let data = await req.json();

            console.log(data);

            return NextResponse.json(data);
        } else {

        }
    } 
}