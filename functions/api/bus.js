export async function onRequest(context) {
    // 1. 공공데이터포털에서 발급받은 본인의 인증키(Decoding)를 아래 큰따옴표 안에 넣으세요!
    const API_KEY = "5c4482096008ea2859616900c056d47ba3cef53a0089b192c375b6e26ef78a68";
    
    // 2. 성북08번 마을버스의 고유 ID
    const ROUTE_ID = "107900008"; 

    // 3. 서울시 버스 위치 정보 API 주소 (JSON 형태로 요청)
    const url = `http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid?serviceKey=${API_KEY}&busRouteId=${ROUTE_ID}&resultType=json`;

    try {
        // 공공데이터포털에 데이터 요청
        const response = await fetch(url);
        const data = await response.json();
        
        // 가져온 데이터를 우리 웹페이지로 전달
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: "버스 정보를 가져오는데 실패했습니다." }, { status: 500 });
    }
}
