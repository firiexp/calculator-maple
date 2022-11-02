import { QuestionIcon } from '@chakra-ui/icons';
import { BackgroundProps, GridItem, HStack, Input, Text, Tooltip } from '@chakra-ui/react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { InputStats } from '../data/statstype';

type RhfStatInputProps = {
  stat: keyof InputStats;
  label: string | boolean;
  type?: string;
  placeholder: string;
  register: UseFormRegister<InputStats>;
  formState: FormState<InputStats>;
  bg: BackgroundProps['bg'];
  tooltipMessage?: string;
};

export default function RhfStatInput({
  stat,
  label,
  type,
  placeholder,
  register,
  formState,
  bg,
  tooltipMessage,
}: RhfStatInputProps) {
  return (
    <>
      <GridItem bg={bg}>
        <HStack>
          <Text p='1'>{label}</Text>
          {tooltipMessage && (
            <Tooltip label={tooltipMessage} fontSize='sm'>
              <QuestionIcon />
            </Tooltip>
          )}
        </HStack>
      </GridItem>
      <GridItem>
        <Input
          type={type}
          placeholder={placeholder}
          size='sm'
          isInvalid={formState.errors?.[stat]?.message !== undefined}
          {...register(stat)}
        />
        <Text color='red.500'>{formState.errors?.[stat]?.message}</Text>
      </GridItem>
    </>
  );
}
