import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCoins } from "../api";
import { useQuery } from 'react-query';
import { isDarkAtom } from "../atom";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    font-weight:600;
    color: ${(props) => props.theme.textColor};
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Loader = styled.span`
  text-align: center;
  display: block;
`;

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev)
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   }
  //   )();
  // }, [])
  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : <CoinsList>
        {data?.slice(0, 20).map(coin => <Coin key={coin.id}>
          <Link to={{
            pathname: `/${coin.id}`,
            state: { what: coin.name },
          }}>
            <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
            {coin.name} &rarr;
          </Link>
        </Coin>)}
      </CoinsList>}
    </Container>
  );
}

export default Coins;