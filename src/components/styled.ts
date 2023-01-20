import styled from 'styled-components';

export const MainTableWrapper = styled.div`
    max-width:1200px;
    width: 100%;
    margin-top:30px;
    .search-title{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
`

export const TotalWrapper = styled.div`
    display:flex;
    justify-content:flex-start;
    flex-direction:row;
    align-items:center;
    div:nth-child(2) {
        margin-left:5px;
    }
`
export const ButtonWrapper = styled.div`
    display:flex;
    justify-content:flex-start;
    flex-direction:row;
    align-items:center;
    button:nth-child(2) {
        margin-left:5px;
    }
`