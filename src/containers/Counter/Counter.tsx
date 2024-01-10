import React, { useEffect, useState } from 'react';
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';

const CounterContainer = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='h-full flex w-1/2 justify-center items-center'>
        <div className='flex-col text-center'>
          <p>Count: {count}</p>
          <div className='mt-4'>
            <input
              type='number'
              value={count}
              min={0}
              onChange={(e) => setCount(+e.target.value)}
              className='w-20 p-1 border border-gray-300'
            />
          </div>
        </div>
      </div>
      <div className='h-6 ring-2 ring-red-500 flex items-center justify-center space-x-3'>
        <Counter
          place={100}
          value={count}
        />
        <Counter
          place={10}
          value={count}
        />
        <Counter
          place={1}
          value={count}
        />
      </div>
    </div>
  );
};

export default CounterContainer;

interface Props {
  value: number;
  place: number;
}

const Counter = ({ value, place }: Props) => {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className='flex h-6 '>
      <div className='relative w-6'>
        {[...Array(10).keys()].map((i) => (
          <Number
            key={i}
            number={i}
            mv={animatedValue}
          />
        ))}
      </div>
    </div>
  );
};

const Number = ({ number, mv }: { number: number; mv: MotionValue<number> }) => {
  const y = useTransform(mv, (latest) => {
    const height = 24;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = height * offset;
    if (Math.round(offset) > 5) {
      memo -= 10 * height;
    }
    return memo; // Floor the entire result
  });

  return (
    <motion.span
      style={{ y }}
      className='absolute inset-0 flex justify-center'
    >
      {number}
    </motion.span>
  );
};
