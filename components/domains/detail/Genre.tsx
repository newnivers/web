import styled from "styled-components";
import Typography from "@/components/common/text/Typography";

export default function Genre({ genre }: { genre: string }) {
  return (
    <Wrapper>
      <Typography typo="body01">#{genre}&nbsp;</Typography>
      {/* {genres.map((genre, index) => ( */}
      {/*  <span key={index}>#{genre}&nbsp;</span> */}
      {/* ))} */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 0.5rem;
`;
