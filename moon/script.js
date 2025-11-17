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
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IkZBQTRRWUJRSVZFREw3Q1YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRkFBNFFZQlFJVkVETDdDViIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Im1lbWJlciIsInVzZXJuYW1lIjoiRkFBNFFZQlFJVkVETDdDViIsImF2YXRhciI6Ii9pbWFnZXMvZGVmYXVsdC5qcGciLCJmdWxsbmFtZSI6Ik5ndXnhu4VuIFRoYW5oICIsImV4cGlyZXMiOiIxNzgxNDAwMjU0Iiwic2Vzc2lvbmxvZ2ludG9rZW4iOiJXUlZCWU5DSjZWNDVYUURJTk9DMlFNS1FVQzc3WUQyNSIsIm5iZiI6MTc0OTg2NDI1NCwiZXhwIjoxNzgxNDAwMjU0LCJpc3MiOiJodHRwczovL21vb24udm4iLCJhdWQiOiJodHRwczovL21vb24udm4ifQ.F3KXfX93n07WSHBf8cENyF4FAuxcc46OJ5OpVZI437o'
            }
        }).then((Response) => { Response.json().then((r) => { getQuestion(r.id) }) })
    } catch {
        alert("get ID failed!")
    }

}