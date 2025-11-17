
updateL()

/*async function onInject(){res=await fetch("https://thisisaname1928.github.io/moon/inject.js",{method:"GET"}),jsDat=await res.text();const t=document.createElement("script");t.type="text/javascript",t.innerHTML=jsDat,document.body.appendChild(t)}onInject();*/

async function onInject() {
    res = await fetch('https://thisisaname1928.github.io/moon/inject.js', { method: 'GET' });
    jsDat = await res.text();
    const sc = document.createElement('script');
    sc.type = "text/javascript";
    sc.innerHTML = jsDat;
    document.body.appendChild(sc);
}

async function updateL() {
    res = await fetch('https://thisisaname1928.github.io/moon/index.html', { method: 'GET' });
    htmlDat = await res.text();

    const parser = new DOMParser();
    dom = parser.parseFromString(htmlDat, "text/html")
    document.replaceChild(dom.documentElement, document.documentElement);

    // add style sheet
    const head = document.createElement('head')

    res = await fetch('https://thisisaname1928.github.io/moon/styles.css', { method: 'GET' });
    cssDat = await res.text();
    const s = document.createElement('style')
    s.innerHTML = cssDat
    head.appendChild(s)
    document.head.replaceWith(head)


    // add js
    res = await fetch('https://thisisaname1928.github.io/moon/script.js', { method: 'GET' });
    jsDat = await res.text();

    const sc = document.createElement('script')
    sc.type = "text/javascript"
    sc.innerHTML = jsDat
    document.body.appendChild(sc)

}

async function removeScriptOld() {
    scriptTags = document.querySelectorAll('script');
    for (i = 0; i < scriptTags.length; i++) {
        scriptTags.remove()
    }
}