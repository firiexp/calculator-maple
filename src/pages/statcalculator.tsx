import { useState } from 'react';
import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';
import SiteHead from '../components/SiteHead';
import StatInputForm from '../components/StatInputForm';
import { OutputStats } from '../data/statstype';
import StatOutput from '../components/StatOutput';

function StatCalculator() {
  const [result, setResult] = useState<OutputStats | undefined>(undefined);
  return (
    <>
      <SiteHead title='ステータス効率計算機' />
      <Container>
        <Header />
        <Main>
          <StatInputForm
            updateResult={(stats: OutputStats) => {
              setResult(stats);
            }}
          />
          {result && <StatOutput result={result} />}
        </Main>
      </Container>
    </>
  );
}

export default StatCalculator;
