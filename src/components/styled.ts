import styled from "styled-components";

export const PageContainer = styled.div`
  width:100%;
  min-height:100vh;
`

export const MainTableWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-top: 30px;
  .search-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table-header {
    display: flex;
    justify-content: space-between;
  }
  .table-title {
    backgroundcolor: "yellow";
    fontweight: "bold";
    margin-bottom:5px;
  }
`;

export const TotalWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  div:nth-child(2) {
    margin-left: 5px;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  button:nth-child(2) {
    margin-left: 5px;
  }
`;
export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  position: sticky;
  top: 0;
  left: 0;
  background-color: yellow;
  .user-name {
    font-weight: bold;
  }
`;
