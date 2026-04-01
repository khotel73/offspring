export async function onRequest(context) {
    try {
        // 1. DB 바인딩이 제대로 되었는지 먼저 확인합니다.
        if (!context.env.DB) {
            return Response.json({ error: "Cloudflare 설정에서 D1(DB) 바인딩이 누락되었습니다." }, { status: 500 });
        }

        // 2. DB에서 데이터를 가져옵니다.
        const { results } = await context.env.DB.prepare("SELECT * FROM items ORDER BY id ASC").all();
        
        return Response.json(results);
    } catch (e) {
        // 3. 에러가 나면 어떤 에러인지 문자로 보여줍니다.
        return Response.json({ 
            error: "데이터베이스 실행 중 오류 발생", 
            details: e.message 
        }, { status: 500 });
    }
}
