// POST 요청을 처리하는 API (아이디/암호 심사관)
export async function onRequestPost(context) {
    try {
        // 1. 사용자가 웹페이지에서 보낸 아이디와 비밀번호를 받습니다.
        const input = await context.request.json();
        const inputId = input.id;
        const inputPassword = input.password;

        // 2. 아까 만든 KV 금고(AUTH_KV)에서 해당 아이디(Key)에 저장된 '진짜 비밀번호(Value)'를 꺼내옵니다.
        const realPassword = await context.env.AUTH_KV.get(inputId);

        // 3. 아이디가 존재하고, 비밀번호가 일치하는지 확인합니다.
        if (realPassword !== null && realPassword === inputPassword) {
            // 심사 통과! (성공)
            return Response.json({ success: true });
        } else {
            // 심사 탈락! (아이디가 없거나 암호가 틀림)
            return Response.json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." }, { status: 401 });
        }
    } catch (e) {
        // 서버 자체 에러가 났을 때 (예: KV 바인딩 이름이 틀렸을 때 등)
        return Response.json({ success: false, message: "서버 에러가 발생했습니다. (" + e.message + ")" }, { status: 500 });
    }
}
