import styled, {css} from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: ${props => props.theme.containerMaxWidths.sm};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: ${props => props.theme.containerMaxWidths.md};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    max-width: ${props => props.theme.containerMaxWidths.lg};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    max-width: ${props => props.theme.containerMaxWidths.xl};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const GridItem = styled.div`
  border: 1px solid #000;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const GridImage = styled.div`
  height: 350px;

  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    height: 250px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const GridDescription = styled.div`
  padding: 1rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

export const Button = styled.button<{isDisabled?: boolean}>`
  appearance: none;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};
  padding: 15px 30px;
  ${props =>
    props.isDisabled
      ? css`
          cursor: not-allowed;
          opacity: 0.7;
        `
      : null};
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 0.5rem;
  height: 40px;
`;

export const Form = styled.form`
  border: 1px solid ${props => props.theme.colors.text};
  margin: 1rem 0;
  border-radius: 0.5rem;
  padding: 1.25rem;
`;
