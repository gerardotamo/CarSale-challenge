import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { ALL_CARS } from '../../shared/graphql/query/carQuery';
import { Cars } from '../../shared/graphql/__generate__/generated';
import * as styled from './styled'

export const ViewCars = () => {
  const [cars, setCars] = useState<Cars>();
  const { data, loading, error } = useQuery(ALL_CARS)

  useEffect(() => {
    if (data) {
      console.log(data)
      setCars(data)
    }
  },[loading])

  return (
    <styled.Container>
      CARS
    </styled.Container>
  )
}
