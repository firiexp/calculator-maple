import { Select, Text } from '@chakra-ui/react';
import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';
import SiteHead from '../components/SiteHead';
import jobData from '../data/jobdata';

function StatCalculator() {
    return (
        <>
            <SiteHead />
            <Container>
                <Header />
                <Main>
                    <Text fontSize='xl'>Not Yet</Text>
                    <Select placeholder='職業を選択してください'>
                        {Object.entries(jobData).map((job) => (
                            <option key={job[0]} value={job[0]}>
                                {job[1].JMSName}
                            </option>
                        ))}
                    </Select>
                </Main>
            </Container>
        </>
    );
}

export default StatCalculator;
