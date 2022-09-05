import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BRANDS } from '../../shared/graphql/query/brandQuery';
import { Brands_Insert_Input, Models } from '../../shared/graphql/__generate__/generated';
import * as styled from './styled'


const ViewCreateCar = () => {
    const { data, loading, error } = useQuery(ALL_BRANDS);
    const [brands, setBrands] = useState<Brands_Insert_Input[]>()
    const [models, setModels] = useState<Models[]>()

    useEffect(() => {
        if (data) {
            setBrands(data.brands);
            setModels(data.brands.models)
        }
    }, [data])

    //console.log(data)
    console.log(brands)
    return (
        <styled.Container>
            <styled.RegisterContainer>
                <styled.Title>Create Car</styled.Title>

            </styled.RegisterContainer>
        </styled.Container>
    )
}

export default ViewCreateCar