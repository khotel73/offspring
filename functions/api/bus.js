export async function onRequest(context) {
    const API_KEY = "여기에_실제_인증키_입력";
    
    // ⭐ 길음역 정류장 ARS ID를 넣으세요!
    // (정류장 기둥 또는 네이버맵/카카오맵에서 확인)
    const ARS_ID = "여기에_길음역_ARS번호_입력";

    const url = `http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid?serviceKey=5c4482096008ea2859616900c056d47ba3cef53a0089b192c375b6e26ef78a68&arsId=08-560&resultType=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: "도착 정보 조회 실패", details: error.message }, { status: 500 });
    }
}
