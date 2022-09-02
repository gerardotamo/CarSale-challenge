import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { CardItem } from '../../components/CardItem/CardItem';
import { ALL_CARS } from '../../shared/graphql/query/carQuery';
import { Cars } from '../../shared/graphql/__generate__/generated';
import * as styled from './styled'

export const ViewCars = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  const { data, loading, error } = useQuery(ALL_CARS)

  useEffect(() => {
    if (data) {
      console.log(data.cars)
      setCars(data.cars)
    }
  }, [loading])

  return (
    <styled.Container>

      <styled.TableContainer>
        <styled.Title color='white'>Image</styled.Title>
        <styled.Title color='white'>Lot Info</styled.Title>
        <styled.Title color='white'>Vehicle info</styled.Title>
        <styled.Title color='white'>Condition</styled.Title>
        <styled.Title color='white'>Sale Info</styled.Title>
      </styled.TableContainer>
      {!loading ?
        cars.map((item, index) => {
          return (
            <CardItem loading={loading} data={item} key={index} />
          )
        })
        :
        ['', '', ''].map((item, index) => {
          return (
            <CardItem loading={true} data={undefined} key={index} />
          )
        })

      }
    </styled.Container>
  )
}
