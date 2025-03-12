import { NextResponse, type NextRequest } from 'next/server'

const tokens = {
    "Shohjahon": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTYyLCJpYXQiOjE3Mzg5NTIyNTcsImV4cCI6MTc0NjcyODI1N30.YhpklnsoIQ5bFi83gUqNJxiY_5gngtk-NFOo0M9OEdM",
    "Muhammadiyor": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDI0LCJpYXQiOjE3Mzg5NTAzNTMsImV4cCI6MTc0NjcyNjM1M30.JOnH1vVNkmBIScefl_JB1CIiBdn6tB13ee1Wh6Tj2ak",
    "Umar": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMjQ2LCJpYXQiOjE3NDE3NzI0ODQsImV4cCI6MTc0OTU0ODQ4NH0.udQZIu6SETofNcR8bwE36hWQNL7AOT-bUi03Kb4fp94"
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const person = searchParams.get('person');
    const url = searchParams.get('url');

    if (person == "Shohjahon" || person == "Muhammadiyor") { 
        if (url?.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
            let headers = new Headers();
            headers.append("Accept", "application/json, text/plain, */*");
            headers.append("Accept-Encoding", "gzip");
            headers.append("authorization", `Bearer ${tokens[person]}`);
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