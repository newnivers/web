import styled from 'styled-components';

export default function ReservationNotice() {
  return <Notice>예매자는 본 안내페이지의 모든 내용을 숙지 및 동의한 것으로 간주합니다.{" "}
    <br />
    <br />- 관람 연령/티켓수령/공연관람 안내 미숙지로 인한 책임은 관람자
    본인에게 있으며,
    <br /> 관련 사유로 예매 티켓의 취소/변경/환불은 일체 불가하오니 각별히
    유의하시기 바랍니다.
    <br />
    <br /> - 모든 할인은 실 관람자 기준으로 적용되며, 관람회차의 티켓 수령
    시 반드시 할인 대상 본인이 <br /> 매표소에 방문하여 증빙자료를 제시해 주셔야
    합니다.
    <br />
    <br /> *Play NEWniverse는 작품 유통 외의 작품 제작과 관련에는 책임이
    없음을 알립니다.</Notice>
}

const Notice = styled.p`
  text-align: left;
`
