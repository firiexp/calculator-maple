import { Text } from '@chakra-ui/react';
import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';
import SiteHead from '../components/SiteHead';

function StatCalculator() {
    return (
        <>
            <SiteHead />
            <Container>
                <Header />
                <Main>
                    <Text fontSize='xl'>Not Yet</Text>
                </Main>
            </Container>
        </>
    );
}

export default StatCalculator;
