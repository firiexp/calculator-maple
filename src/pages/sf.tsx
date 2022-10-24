import { Button, Text, VStack, Checkbox, HStack, Heading, NumberInput, NumberInputField } from '@chakra-ui/react';
import { useState } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/Main';

function Sf() {
    const [sfData, setSfData] = useState({
        stars: 0,
        usedCost: 0,
        consecutiveFail: 0,
        equippedLevel: 200,
        initialStar: 0,
        retrivedItemValue: 0,
        discounted: false,
        allSuccessEvent: false,
        avoidDestroy: false,
    });

    const successRate: number[] = [
        0.95, 0.9, 0.85, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
        0.3, 0.03, 0.02, 0.01,
    ];

    const destroyRate: number[] = [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.02, 0.02, 0.03, 0.03, 0.03, 0.04, 0.04, 0.1,
        0.1, 0.2, 0.3, 0.4,
    ];

    const starforceCost = (stars: number, level: number): number => {
        if (stars < 10) return 100 * Math.round((level * level * level * (stars + 1)) / 2500 + 10);
        if (stars < 15) return 100 * Math.round((level * level * level * (stars + 1) ** 2.7) / 40000 + 10);
        return 100 * Math.round((level * level * level * (stars + 1) ** 2.7) / 20000 + 10);
    };

    type StarforceResult = 'up' | 'keep' | 'down' | 'destroy' | 'no_enhance' | 'error';
    const starforceEnhance = (stars: number): StarforceResult => {
        if (stars > 25 || stars < 0) {
            // throw error
            return 'error';
        }
        if (stars === 25) {
            // cannot enhance!
            return 'no_enhance';
        }
        if (sfData.allSuccessEvent) {
            if (stars === 5 || stars === 10 || stars === 15) {
                setSfData({ ...sfData, consecutiveFail: 0 });
                return 'up';
            }
        }

        if (sfData.consecutiveFail === 2 || successRate[stars] >= Math.random()) {
            setSfData({ ...sfData, consecutiveFail: 0 });
            return 'up';
        }
        if (destroyRate[stars] >= Math.random()) {
            setSfData({ ...sfData, consecutiveFail: 0 });
            return 'destroy';
        }
        if (stars <= 10 || stars === 15 || stars === 20) {
            setSfData((prevState) => ({ ...prevState, consecutiveFail: prevState.consecutiveFail + 1 }));
            return 'keep';
        }

        setSfData((prevState) => ({ ...prevState, consecutiveFail: prevState.consecutiveFail + 1 }));
        return 'down';
    };
    const enhancebuttonClick = () => {
        const result: StarforceResult = starforceEnhance(sfData.stars);
        const costRatio =
            (sfData.discounted ? 0.7 : 1) *
            (sfData.avoidDestroy && sfData.stars >= 12 && sfData.stars <= 16 ? 2.0 : 1.0);
        setSfData((prevState) => ({
            ...prevState,
            usedCost:
                prevState.usedCost +
                Math.round(starforceCost(sfData.stars, sfData.equippedLevel) * costRatio) +
                (result === 'destroy' ? sfData.retrivedItemValue : 0),
        }));

        if (result === 'up') setSfData((prevState) => ({ ...prevState, stars: prevState.stars + 1 }));
        else if (result === 'down') setSfData((prevState) => ({ ...prevState, stars: prevState.stars - 1 }));
        else if (result === 'destroy') setSfData((prevState) => ({ ...prevState, stars: 12 }));
    };
    const getCount = (): string => {
        let res = '';
        for (let i = 1; i <= 25; i++) {
            if (i <= sfData.stars) res += '★';
            else res += '☆';
            if (i % 5 === 0) res += ' ';
        }
        return res;
    };

    const resetbuttonClick = () => {
        setSfData((prevState) => ({ ...prevState, stars: prevState.initialStar, usedCost: 0 }));
    };

    const numberFormatter = new Intl.NumberFormat();
    return (
        <Container>
            <Header />
            <Main>
                <VStack>
                    <Text mt='30px' mb='10px' p='5px' border='2px' borderColor='purple.100'>
                        {getCount()}
                    </Text>
                    <HStack>
                        <Button colorScheme='blue' onClick={enhancebuttonClick}>
                            強化
                        </Button>
                        <Button colorScheme='red'>復元</Button>
                    </HStack>
                    <Text fontSize='xl'>これまでの強化費用 : {numberFormatter.format(sfData.usedCost)}</Text>
                </VStack>
                <Heading mt='30px' mb='10px' p='5px' colorScheme='cyan'>
                    設定
                </Heading>
                <VStack alignItems='start' p='10px' border='1px' borderColor='gray.400' borderRadius='md'>
                    <Checkbox
                        onChange={(e) => setSfData((prevState) => ({ ...prevState, discounted: e.target.checked }))}>
                        30%割引
                    </Checkbox>
                    <Checkbox
                        onChange={(e) =>
                            setSfData((prevState) => ({ ...prevState, allSuccessEvent: e.target.checked }))
                        }>
                        5/10/15星強化時100%成功
                    </Checkbox>
                    <Checkbox
                        onChange={(e) => setSfData((prevState) => ({ ...prevState, avoidDestroy: e.target.checked }))}>
                        破壊防止
                    </Checkbox>
                    <HStack>
                        <Text>装備のレベル</Text>
                        <NumberInput
                            defaultValue={150}
                            min={1}
                            max={1000}
                            onChange={(e) =>
                                setSfData((prevState) => ({ ...prevState, equippedLevel: parseInt(e, 10) }))
                            }>
                            <NumberInputField />
                        </NumberInput>
                    </HStack>
                    <HStack>
                        <Text>開始時の星</Text>
                        <NumberInput
                            defaultValue={0}
                            min={0}
                            max={24}
                            onChange={(e) =>
                                setSfData((prevState) => ({ ...prevState, initialStar: parseInt(e, 10) }))
                            }>
                            <NumberInputField />
                        </NumberInput>
                    </HStack>
                    <HStack>
                        <Text>装備復元費用</Text>
                        <NumberInput
                            defaultValue={0}
                            min={0}
                            onChange={(e) =>
                                setSfData((prevState) => ({ ...prevState, retrivedItemValue: parseInt(e, 10) }))
                            }>
                            <NumberInputField />
                        </NumberInput>
                    </HStack>
                    <Button colorScheme='blue' size='sm' onClick={resetbuttonClick}>
                        リセット
                    </Button>
                </VStack>
            </Main>
        </Container>
    );
}

export default Sf;
