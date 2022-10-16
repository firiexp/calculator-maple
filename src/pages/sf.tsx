import { Button, Text, VStack, Checkbox, HStack, Heading, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useState } from "react";
import Container from "../components/Container";

function Sf() {
    const [count, setCount] = useState(0);
    const [usedCost, setUsedCost] = useState(0);
    const [consecutiveFail, setConsecutiveFail] = useState(0);
    const [equippedLevel, setEquippedLevel] = useState(200);
    const [initialStar, setInitialStar] = useState(0);
    const [retrivedItemValue, setRetrivedItemValue] = useState(0);
    const [discounted, setDiscounted] = useState(false);
    const [allSuccessEvent, setAllSuccessEvent] = useState(false);
    const [avoidDestroy, setAvoidDestroy] = useState(false);
    
    const successRate : number[] = [
        0.95, 0.90, 0.85, 0.85, 0.80, 0.75, 0.70, 0.65, 0.60, 0.55, 
        0.50, 0.45, 0.40, 0.35, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30,
        0.30, 0.30, 0.03, 0.02, 0.01
    ]

    const destroyRate : number[] = [
        0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
        0.00, 0.00, 0.01, 0.02, 0.02, 0.03, 0.03, 0.03, 0.04, 0.04,
        0.10, 0.10, 0.20, 0.30, 0.40
    ]

    const starforceCost = (stars : number, level : number) : number => {
        if(stars < 10) return 100 * Math.round( level * level * level * (stars + 1) / 2500 + 10);
        if(stars < 15) return 100 * Math.round( level * level * level * (stars + 1) ** 2.7 / 40000 + 10);
        return 100 * Math.round( level * level * level * (stars + 1) ** 2.7 / 20000 + 10);
    }
    

    type StarforceResult = 'up' | 'keep' | 'down' | 'destroy' | 'no_enhance' | 'error';
    const starforceEnhance = (stars : number) : StarforceResult => {
        if(stars > 25 || stars < 0){
             // throw error
            return 'error';
        }
        if(stars === 25){
            // cannot enhance!
            return 'no_enhance';
        }
        if(allSuccessEvent){
            if(stars === 5 || stars === 10 || stars === 15){
                setConsecutiveFail(0);
                return 'up';
            }
        }
        
        if(consecutiveFail === 2 || successRate[stars] >= Math.random()){
            setConsecutiveFail(0);
            return 'up';
        }
        if(destroyRate[stars] >= Math.random()){
            setConsecutiveFail(0);
            return 'destroy'; 
        }
        if(stars <= 10 || stars === 15 || stars === 20){
            setConsecutiveFail(consecutiveFail+1);
            return 'keep';
        }
        
        setConsecutiveFail(consecutiveFail+1);
        return 'down';
    }
    const enhancebuttonClick = () => {
        const result : StarforceResult = starforceEnhance(count);
        const costRatio = (discounted ? 0.7 : 1)*(avoidDestroy && count >= 12 && count <= 16 ? 2.0 : 1.0);
        setUsedCost( 
            usedCost 
            + Math.round(starforceCost(count, equippedLevel)*costRatio)
            + (result === 'destroy' ? retrivedItemValue : 0)
        );
        if(result === 'up') setCount(count + 1);
        else if(result === 'down') setCount(count - 1);
        else if(result === 'destroy') setCount(12);
    }
    const getCount = () : string => {
        let res = "";
        for (let i = 1; i <= 25; i++) {
            if(i <= count) res += "★";
            else res += "☆";
            if(i%5 === 0) res += " ";
        }
        return res;
    }

    const resetbuttonClick = () => {
        setCount(initialStar);
        setUsedCost(0);

    }

    const numberFormatter = new Intl.NumberFormat();
    return (
        <Container display='flex'>
            <VStack alignItems='center'>
            <Text mt='30px' mb='10px' p='5px' border='2px' borderColor='purple.100'>{getCount()}</Text>
            <HStack> 
                <Button colorScheme='blue' onClick={enhancebuttonClick}>強化</Button>
                <Button colorScheme='red'>復元</Button>
            </HStack>
            <Text fontSize='xl'>これまでの強化費用 : {numberFormatter.format(usedCost)}</Text>
            </VStack>
            <Heading mt='30px' mb='10px' p='5px' colorScheme='cyan'>設定</Heading>
            <VStack alignItems='start' mt='10px' mb='10px' p='10px' border='1px' borderColor='gray.400' borderRadius='md'>
                <Checkbox onChange={(e) => setDiscounted(e.target.checked)}>30%割引</Checkbox>
                <Checkbox onChange={(e) => setAllSuccessEvent(e.target.checked)}>5/10/15星強化時100%成功</Checkbox>
                <Checkbox onChange={(e) => setAvoidDestroy(e.target.checked)}>破壊防止</Checkbox>
                <HStack>
                    <Text>装備のレベル</Text>
                <NumberInput defaultValue={150} min={1} max={1000} onChange={(e) => setEquippedLevel(parseInt(e, 10))}>
                    <NumberInputField />
                </NumberInput>
                </HStack>
                <HStack>
                    <Text>開始時の星</Text>
                <NumberInput defaultValue={0} min={0} max={24} onChange={(e) => setInitialStar(parseInt(e, 10))}>
                    <NumberInputField />
                </NumberInput>
                </HStack>
                <HStack>
                    <Text>装備復元費用</Text>
                <NumberInput defaultValue={0} min={0} onChange={(e) => setRetrivedItemValue(parseInt(e, 10))}>
                    <NumberInputField />
                </NumberInput>
                </HStack>
                <Button colorScheme='blue' size='sm' onClick={resetbuttonClick}>リセット</Button>
            </VStack>
        </Container>

    );
}

export default Sf