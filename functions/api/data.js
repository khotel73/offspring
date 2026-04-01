export async function onRequest(context) {
    try {
        // D1 데이터베이스에서 items 표의 모든 데이터를 번호(id) 순서대로 가져옵니다.
        const { results } = await context.env.DB.prepare("SELECT * FROM items ORDER BY id ASC").all();
        
        // 가져온 데이터를 웹페이지가 알아들을 수 있게 JSON 형태로 보내줍니다.
        return Response.json(results);
    } catch (e) {
        return Response.json({ error: "데이터를 불러오지 못했습니다." }, { status: 500 });
    }
}
