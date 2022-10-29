import { useState } from 'react';
import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';
import SiteHead from '../components/SiteHead';
import StatInputForm from '../components/statInputForm';
import { OutputStats } from '../data/formtype';
import StatOutput from '../components/statOutput';

function StatCalculator() {
  const [result, setResult] = useState<OutputStats | undefined>(undefined);
  return (
    <>
      <SiteHead />
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
