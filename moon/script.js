const TLN = 1;
const TN = 0;
const TNDS = 2;
const inp = document.getElementById("inpform")
const IDInput = document.getElementById("ID")
inp.addEventListener("submit", function (event) {
    event.preventDefault()
    getID()
})

window.onload = function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const idValue = params.get('id');

    if (idValue != null) { IDInput.value = idValue }
}

function nextQuestion() {
    n = parseInt(IDInput.value)
    n++
    IDInput.value = n.toString()

    getQuestion(n.toString())
}

function renderAns(res) {
    if (res.typeID == TLN || res.typeID == TNDS) {
        document.getElementById("ans").innerHTML = res.titleEnglish + "<br>" + res.questionText + `<br><br>${res.answer}<br>`;
    } else {
        if (!res.listTikTokVideoModel[0].urlVideo)
            document.getElementById("ans").innerHTML = res.titleEnglish + "<br>" + res.questionText + `<br>A. ${res.a}<br>B.${res.b}<br>C. ${res.c}<br>D. ${res.d}<br>Đáp Án: ${res.key}<br><br>${res.answer}<br><br>`;
        else
            document.getElementById("ans").innerHTML = res.titleEnglish + "<br>" + res.questionText + `<br>A. ${res.a}<br>B.${res.b}<br>C. ${res.c}<br>D. ${res.d}<br>Đáp Án: ${res.key}<br><br>${res.answer}<br><br><a target="_blank" href="${res.listTikTokVideoModel[0].urlVideo}">video huong dan</a>`;
    }
}

function delay(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

async function getQuestion(ID) {
    document.getElementById("ans").innerHTML = "dang tai..."

    await fetch(` https://courseapi.moon.vn/api/Course/ItemQuestion/${ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    }).then((r) => r.json().then((res) => {
        renderAns(res)
    }))
}

function getID() {
    ID = document.getElementById("ID").value

    try {
        fetch(`https://courseapi.moon.vn/api/Course/SearchID/${ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjcxMjQ1MzY3Njg0NDUxNTYzNjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNzEyNDUzNjc2ODQ0NTE1NjM2NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Im1lbWJlciIsInVzZXJuYW1lIjoiNzEyNDUzNjc2ODQ0NTE1NjM2NCIsImF2YXRhciI6IjIwMjQvOS9kNTZjM2YyYS1mMDI3LTQxN2QtODgxZS03MWUwZTViYzY5NjQuanBnIiwiZnVsbG5hbWUi…pbnRva2VuIjoiWEZXUDY0WDdaSVFCNVNYNkRURFA0M0ZaWDZYV0s1MzQiLCJuYmYiOjE3Nzc3MjY4OTMsImV4cCI6MTgwOTI2Mjg5MywiaXNzIjoiaHR0cHM6Ly9tb29uLnZuIiwiYXVkIjoiaHR0cHM6Ly9tb29uLnZuIn0.XCoCk3_fx3SWJSO5nFDGYLFsJS6fZymXzu2zjrZtd3DQbzoCjJIVztHDaZstOw_QH1W2Vuebedz5az4TVbZU4MZqI5ipoAnrsAp8-2rgVLT22dwiRzg-cmF8nrV3H2cSJK97Vm2SRweQ1Cm6Br1RY9fJi49CN7BNymHmgRYDWsGYZ8MsDHlZIrv2wF2c6vjPGKNBb2vESmh74pqZ5255Fb55bdi82_NfK0owOaxL5b0cLOKaOnfEJWcfscg4PaculKlGyCxB7EDhQndKLEUsI_ikvjygbieXyfLhkg3XILWU17wHThXSMQWuQ3YKBhSJ8UbMzRdbDGIx2P3my329sQ'
            }
        }).then((Response) => { Response.json().then((r) => { getQuestion(r.id) }) })
    } catch {
        alert("get ID failed!")
    }

}