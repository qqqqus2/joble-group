function includeFooter() {
  let str = `
<footer id="footer" class="footer">
  <div class="inner">
    <div class="logo" role="img" aria-label="JOBLE COMPANY">JOBLE COMPANY</div>
    <div>
      <ul class="policy-list">
        <li><a href="../html/service_solution.html" aria-label="JOBLEPAY">JOBLEPAY</a></li>
        <li><a href="../html/reference.html" aria-label="JOBLEPIN">JOBLEPIN</a></li>
        <li><a href="../html/esg_environment.html" aria-label="ENTERTAINMENT">ENTERTAINMENT</a></li>
        <li class="m-line"></li>
        <li><a href="../html/cs_center_info.html" aria-label="SERVICE">SERVICE</a></li>
      </ul>
      <div class="footer-address">
        <p>15352 경기도 안산시 단원구 고잔로 57-9 (고잔동) 아이즈빌II오피스텔</p>
        <p>06098 서울특별시 강남구 논현동 248-2 (논현동) 6층</p>
        <p>
          <span>TEL 1544-3890</span> 
        </p>     
      </div>
      <div class="copyright">
          <small class="txt_copyright">Copyright 2024 (주)조블컴퍼니</small>
        </div>
    </div>
  </div>
</footer>
<div class="scroll-top"><button type="button" class="btn-scroll-top" aria-label="페이지 상단으로 이동"></button></div>
<article id="popPrivacy" class="pop-common">
  <i class="pop-bg popPrivacyClose"></i>
  <div class="pop-cont">
    <button type="button" class="pop-close popPrivacyClose">팝업닫기</button>
    <h5 class="pop-tit">개인정보처리방침</h5>
      <div class="pre-line-wrap">1. 수집하는 개인정보 항목 및 이용 목적
가. 필수 항목 : 성명, 이메일 주소, 문의확인용 정보- 민원처리를 위한 이용자 식별, 고지사항 전달- 본인 의사확인, 불만처리 등 의사소통 경로 확보
나. 선택 항목 : 전화번호- 고지사항 전달, 본인 의사확인, 불만처리 등 의사소통 경로의 확보
* 민원처리 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.- 서비스이용기록, 접속로그, 접속IP정보

2. 회사가 수집하는 개인정보의 보유 및 이용기간3개월 단, 다음의 정보에 대해서는 관계법령의 규정 상 명시한 기간 동안 보존합니다.
가. 소비자의 불만 또는 분쟁 처리에 관한 기록 : 3년 (전자상거래법 시행령)
나. 기타 개별적으로 이용자의 동의를 받은 경우 : 동의를 득한 기간까지

3. 회사가 수집하는 개인정보 수집방법- 회사는 이용자들에게 서비스를 제공하기 위한 필수정보들을 온라인상에서 입력 받고 있습니다.

4. 귀하는 개인정보 수집·이용에 동의하지 않으실 수 있습니다. 그러나 동의하지 않을 경우 고객문의 등록이 불가합니다.
    </div>
  </div>
</article>
`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeFooter();
