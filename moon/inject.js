
updateL()

async function updateL() {
    res = await fetch('https://thisisaname1928.github.io/moon/index.html', { method: 'GET' });
    htmlDat = await res.text();

    const parser = new DOMParser();
    dom = parser.parseFromString(htmlDat, "text/html")
    document.replaceChild(dom.documentElement, document.documentElement);

    // add style sheet
    const head = document.createElement('head')
    document.appendChild(head)
    const s = document.createElement('link')
    s.href = "https://thisisaname1928.github.io/moon/styles.css"
    s.rel = "stylesheet"

    head.appendChild(s)

}

async function removeScriptOld() {
    scriptTags = document.querySelectorAll('script');
    for (i = 0; i < scriptTags.length; i++) {
        scriptTags.remove()
    }
}