function includeHeader() {
  let str = `
<header id="header" class="header">
  <div class="inner">
    <h1 id="logo"><a href="../html/main.html" aria-label="조블 컴퍼니">JOBLE COMPANY</a></h1>
    <nav id="gnb">
      <button type="button" class="btn-gnb">
        <span class="gnb-current">모바일 메뉴 펼치기</span>
      </button>
      <ul>
        <li><a href="../html/joblePay.html" aria-label="JOBLEPAY">JOBLEPAY</a></li>
        <li><a href="../html/joblePin.html" aria-label="JOBLEPIN">JOBLEPIN</a></li>
        <li><a href="../html/jobleTicket.html" aria-label="JOBLEPIN">JOBLETICKET</a></li>
        <li><a href="../html/jobleEnter_intro.html" aria-label="ENTERTAINMENT">ENTERTAINMENT</a></li>
        <li><a href="../html/service_address.html" aria-label="SERVICE">SERVICE</a></li>
      </ul>
    </nav>
  </div>
</header>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeHeader();
