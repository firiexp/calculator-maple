import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';
import SiteHead from '../components/SiteHead';
import StatForm from '../components/statForm';

function StatCalculator() {
  return (
    <>
      <SiteHead />
      <Container>
        <Header />
        <Main>
          <StatForm />
        </Main>
      </Container>
    </>
  );
}

export default StatCalculator;
